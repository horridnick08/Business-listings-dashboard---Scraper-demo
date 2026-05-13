"""
Scraper Control API
===================
Endpoint to trigger the scraper and seed the database
from the dashboard UI.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import ScraperRequest, ScraperResponse, ListingCreate
from app.services import ListingService
from app.scraper.scraper import BusinessScraper
from app.utils.logger import get_logger

router = APIRouter(prefix="/scraper", tags=["Scraper"])
logger = get_logger("scraper_api")


@router.post(
    "/run",
    response_model=ScraperResponse,
    summary="Run Scraper",
    description="Trigger the scraper to generate and insert business listings.",
)
def run_scraper(
    request: ScraperRequest,
    db: Session = Depends(get_db),
):
    """Execute the scraper and insert results into the database."""
    try:
        logger.info(f"Scraper triggered: mode={request.mode}, count={request.count}")

        # Run scraper
        scraper = BusinessScraper(mode=request.mode, count=request.count)
        raw_listings = scraper.scrape()

        # Convert to Pydantic models and bulk insert
        listings = []
        for item in raw_listings:
            try:
                listing = ListingCreate(
                    business_name=item["business_name"],
                    category=item["category"],
                    city=item["city"],
                    address=item["address"],
                    phone=item.get("phone"),
                    source=item["source"],
                )
                listings.append(listing)
            except Exception as e:
                logger.warning(f"Skipping invalid listing: {e}")

        service = ListingService(db)
        inserted, duplicates = service.bulk_create_listings(listings)

        return ScraperResponse(
            message="Scraper completed successfully",
            listings_generated=len(raw_listings),
            listings_inserted=inserted,
            duplicates_skipped=duplicates,
        )

    except Exception as e:
        logger.error(f"Scraper error: {e}")
        raise HTTPException(status_code=500, detail=f"Scraper failed: {str(e)}")
