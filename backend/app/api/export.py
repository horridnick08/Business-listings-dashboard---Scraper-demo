"""
Export API
==========
Endpoint for exporting listing data as a downloadable CSV file.
"""

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import io

from app.database import get_db
from app.services import ListingService

router = APIRouter(prefix="/export", tags=["Export"])


@router.get(
    "/csv",
    summary="Export Listings as CSV",
    description="Download all business listings as a CSV file.",
)
def export_csv(db: Session = Depends(get_db)):
    """Export all listings to CSV format."""
    service = ListingService(db)
    csv_content = service.export_csv()

    return StreamingResponse(
        io.StringIO(csv_content),
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=business_listings.csv"
        },
    )
