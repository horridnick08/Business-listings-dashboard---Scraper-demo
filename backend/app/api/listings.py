"""
Listings API
============
CRUD endpoints for business listings with pagination,
filtering, search, and sorting capabilities.
"""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import (
    ListingCreate,
    ListingResponse,
    ListingBulkCreate,
    PaginatedListingResponse,
    BulkInsertResponse,
)
from app.services import ListingService
from app.utils.logger import get_logger

router = APIRouter(prefix="/listings", tags=["Listings"])
logger = get_logger("listings_api")


@router.post(
    "",
    response_model=ListingResponse,
    status_code=201,
    summary="Create a Listing",
    description="Insert a single business listing into the database.",
)
def create_listing(
    listing: ListingCreate,
    db: Session = Depends(get_db),
):
    """Create a new business listing."""
    try:
        service = ListingService(db)
        return service.create_listing(listing)
    except Exception as e:
        logger.error(f"Error creating listing: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/bulk",
    response_model=BulkInsertResponse,
    status_code=201,
    summary="Bulk Insert Listings",
    description="Insert multiple business listings at once with duplicate detection.",
)
def bulk_create_listings(
    payload: ListingBulkCreate,
    db: Session = Depends(get_db),
):
    """Bulk insert multiple listings."""
    try:
        service = ListingService(db)
        inserted, duplicates = service.bulk_create_listings(payload.listings)
        return BulkInsertResponse(
            message=f"Successfully processed {len(payload.listings)} listings",
            inserted_count=inserted,
            duplicate_count=duplicates,
        )
    except Exception as e:
        logger.error(f"Error in bulk insert: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get(
    "",
    response_model=PaginatedListingResponse,
    summary="Get All Listings",
    description="Retrieve paginated business listings with optional filters.",
)
def get_listings(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search by business name"),
    city: Optional[str] = Query(None, description="Filter by city"),
    category: Optional[str] = Query(None, description="Filter by category"),
    source: Optional[str] = Query(None, description="Filter by source"),
    sort_by: str = Query("id", description="Sort field"),
    sort_order: str = Query("desc", description="Sort order: asc or desc"),
    db: Session = Depends(get_db),
):
    """Get paginated listings with filtering and search."""
    service = ListingService(db)
    return service.get_listings(
        page=page,
        page_size=page_size,
        search=search,
        city=city,
        category=category,
        source=source,
        sort_by=sort_by,
        sort_order=sort_order,
    )
