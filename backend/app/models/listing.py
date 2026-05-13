"""
Listing ORM Model
==================
SQLAlchemy ORM model for the `listing_master` table.
Represents a scraped business listing with all required fields.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Index
from app.database.connection import Base


class ListingMaster(Base):
    """ORM model for business listings stored in the database."""

    __tablename__ = "listing_master"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    business_name = Column(String(255), nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)
    city = Column(String(100), nullable=False, index=True)
    address = Column(String(500), nullable=False)
    phone = Column(String(20), nullable=True)
    source = Column(String(50), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # ── Composite Indexes for Analytics Queries ──────────────────
    __table_args__ = (
        Index("idx_city_category", "city", "category"),
        Index("idx_source_city", "source", "city"),
        Index("idx_created_at", "created_at"),
    )

    def __repr__(self) -> str:
        return (
            f"<ListingMaster(id={self.id}, "
            f"name='{self.business_name}', "
            f"city='{self.city}')>"
        )
