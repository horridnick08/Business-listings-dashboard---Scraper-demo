"""
Listing Service Layer
=====================
Contains all business logic for CRUD operations, analytics,
and data export. Keeps route handlers thin and testable.
"""

import csv
import io
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.models.listing import ListingMaster
from app.schemas.listing import (
    ListingCreate,
    ListingResponse,
    PaginatedListingResponse,
    AnalyticsItem,
    AnalyticsResponse,
    SummaryResponse,
)
from app.utils.logger import get_logger

logger = get_logger("listing_service")


class ListingService:
    """Service class encapsulating all listing-related business logic."""

    def __init__(self, db: Session):
        self.db = db

    # ── CRUD Operations ──────────────────────────────────────────

    def create_listing(self, listing_data: ListingCreate) -> ListingMaster:
        """
        Create a single business listing.

        Args:
            listing_data: Validated listing data from the request.

        Returns:
            The newly created ListingMaster instance.
        """
        db_listing = ListingMaster(**listing_data.model_dump())
        self.db.add(db_listing)
        self.db.commit()
        self.db.refresh(db_listing)
        logger.info(f"Created listing: {db_listing.business_name} ({db_listing.city})")
        return db_listing

    def bulk_create_listings(
        self, listings: list[ListingCreate]
    ) -> tuple[int, int]:
        """
        Bulk insert multiple listings with duplicate detection.

        Args:
            listings: List of validated listing data.

        Returns:
            Tuple of (inserted_count, duplicate_count).
        """
        inserted = 0
        duplicates = 0

        for listing_data in listings:
            # Check for duplicates by name + city + phone
            existing = (
                self.db.query(ListingMaster)
                .filter(
                    ListingMaster.business_name == listing_data.business_name,
                    ListingMaster.city == listing_data.city,
                )
                .first()
            )

            if existing:
                duplicates += 1
                continue

            db_listing = ListingMaster(**listing_data.model_dump())
            self.db.add(db_listing)
            inserted += 1

        self.db.commit()
        logger.info(
            f"Bulk insert complete: {inserted} inserted, {duplicates} duplicates"
        )
        return inserted, duplicates

    def get_listings(
        self,
        page: int = 1,
        page_size: int = 20,
        search: Optional[str] = None,
        city: Optional[str] = None,
        category: Optional[str] = None,
        source: Optional[str] = None,
        sort_by: str = "id",
        sort_order: str = "desc",
    ) -> PaginatedListingResponse:
        """
        Retrieve paginated listings with optional filtering and search.

        Args:
            page: Page number (1-indexed).
            page_size: Items per page.
            search: Search term for business name.
            city: Filter by city.
            category: Filter by category.
            source: Filter by source.
            sort_by: Field to sort by.
            sort_order: 'asc' or 'desc'.

        Returns:
            Paginated response with listings and metadata.
        """
        query = self.db.query(ListingMaster)

        # ── Apply Filters ────────────────────────────────────────
        if search:
            query = query.filter(
                ListingMaster.business_name.ilike(f"%{search}%")
            )
        if city:
            query = query.filter(ListingMaster.city == city)
        if category:
            query = query.filter(ListingMaster.category == category)
        if source:
            query = query.filter(ListingMaster.source == source)

        # ── Total Count ──────────────────────────────────────────
        total = query.count()

        # ── Sorting ──────────────────────────────────────────────
        sort_column = getattr(ListingMaster, sort_by, ListingMaster.id)
        if sort_order == "desc":
            query = query.order_by(desc(sort_column))
        else:
            query = query.order_by(sort_column)

        # ── Pagination ───────────────────────────────────────────
        offset = (page - 1) * page_size
        items = query.offset(offset).limit(page_size).all()
        total_pages = (total + page_size - 1) // page_size

        return PaginatedListingResponse(
            items=[ListingResponse.model_validate(item) for item in items],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    # ── Analytics ────────────────────────────────────────────────

    def get_city_analytics(self) -> AnalyticsResponse:
        """Get listing count grouped by city."""
        results = (
            self.db.query(
                ListingMaster.city,
                func.count(ListingMaster.id).label("count"),
            )
            .group_by(ListingMaster.city)
            .order_by(desc("count"))
            .all()
        )

        data = [AnalyticsItem(name=row[0], count=row[1]) for row in results]
        total = sum(item.count for item in data)
        return AnalyticsResponse(data=data, total=total)

    def get_category_analytics(self) -> AnalyticsResponse:
        """Get listing count grouped by category."""
        results = (
            self.db.query(
                ListingMaster.category,
                func.count(ListingMaster.id).label("count"),
            )
            .group_by(ListingMaster.category)
            .order_by(desc("count"))
            .all()
        )

        data = [AnalyticsItem(name=row[0], count=row[1]) for row in results]
        total = sum(item.count for item in data)
        return AnalyticsResponse(data=data, total=total)

    def get_source_analytics(self) -> AnalyticsResponse:
        """Get listing count grouped by source."""
        results = (
            self.db.query(
                ListingMaster.source,
                func.count(ListingMaster.id).label("count"),
            )
            .group_by(ListingMaster.source)
            .order_by(desc("count"))
            .all()
        )

        data = [AnalyticsItem(name=row[0], count=row[1]) for row in results]
        total = sum(item.count for item in data)
        return AnalyticsResponse(data=data, total=total)

    def get_summary(self) -> SummaryResponse:
        """Get dashboard summary statistics."""
        total_listings = self.db.query(func.count(ListingMaster.id)).scalar() or 0
        total_cities = (
            self.db.query(func.count(func.distinct(ListingMaster.city))).scalar()
            or 0
        )
        total_categories = (
            self.db.query(
                func.count(func.distinct(ListingMaster.category))
            ).scalar()
            or 0
        )
        total_sources = (
            self.db.query(
                func.count(func.distinct(ListingMaster.source))
            ).scalar()
            or 0
        )

        return SummaryResponse(
            total_listings=total_listings,
            total_cities=total_cities,
            total_categories=total_categories,
            total_sources=total_sources,
        )

    # ── Export ────────────────────────────────────────────────────

    def export_csv(self) -> str:
        """
        Export all listings as CSV string.

        Returns:
            CSV formatted string of all listings.
        """
        listings = (
            self.db.query(ListingMaster)
            .order_by(ListingMaster.id)
            .all()
        )

        output = io.StringIO()
        writer = csv.writer(output)

        # Header row
        writer.writerow([
            "ID", "Business Name", "Category", "City",
            "Address", "Phone", "Source", "Created At",
        ])

        # Data rows
        for listing in listings:
            writer.writerow([
                listing.id,
                listing.business_name,
                listing.category,
                listing.city,
                listing.address,
                listing.phone or "",
                listing.source,
                listing.created_at.isoformat() if listing.created_at else "",
            ])

        return output.getvalue()
