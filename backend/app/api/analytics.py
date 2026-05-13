"""
Analytics API
=============
Endpoints for aggregated analytics data used by the dashboard.
Provides city-wise, category-wise, source-wise breakdowns and summary stats.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import AnalyticsResponse, SummaryResponse
from app.services import ListingService

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get(
    "/city-wise",
    response_model=AnalyticsResponse,
    summary="City-wise Analytics",
    description="Get business listing count grouped by city.",
)
def get_city_analytics(db: Session = Depends(get_db)):
    """Return listing counts grouped by city."""
    service = ListingService(db)
    return service.get_city_analytics()


@router.get(
    "/category-wise",
    response_model=AnalyticsResponse,
    summary="Category-wise Analytics",
    description="Get business listing count grouped by category.",
)
def get_category_analytics(db: Session = Depends(get_db)):
    """Return listing counts grouped by category."""
    service = ListingService(db)
    return service.get_category_analytics()


@router.get(
    "/source-wise",
    response_model=AnalyticsResponse,
    summary="Source-wise Analytics",
    description="Get business listing count grouped by source.",
)
def get_source_analytics(db: Session = Depends(get_db)):
    """Return listing counts grouped by source."""
    service = ListingService(db)
    return service.get_source_analytics()


@router.get(
    "/summary",
    response_model=SummaryResponse,
    summary="Dashboard Summary",
    description="Get overall dashboard summary statistics.",
)
def get_summary(db: Session = Depends(get_db)):
    """Return total listings, cities, categories, and sources."""
    service = ListingService(db)
    return service.get_summary()
