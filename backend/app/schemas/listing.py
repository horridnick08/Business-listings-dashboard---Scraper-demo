"""
Pydantic Schemas
================
Request and response models for all API endpoints.
Provides validation, serialization, and automatic Swagger documentation.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator
import re


# ── Request Schemas ──────────────────────────────────────────────

class ListingCreate(BaseModel):
    """Schema for creating a single business listing."""

    business_name: str = Field(
        ..., min_length=1, max_length=255,
        description="Name of the business",
        examples=["Sharma Electronics"],
    )
    category: str = Field(
        ..., min_length=1, max_length=100,
        description="Business category",
        examples=["Electronics"],
    )
    city: str = Field(
        ..., min_length=1, max_length=100,
        description="City where the business is located",
        examples=["Mumbai"],
    )
    address: str = Field(
        ..., min_length=1, max_length=500,
        description="Full address of the business",
        examples=["123, MG Road, Andheri West, Mumbai 400058"],
    )
    phone: Optional[str] = Field(
        None, max_length=20,
        description="Contact phone number",
        examples=["+91-9876543210"],
    )
    source: str = Field(
        ..., min_length=1, max_length=50,
        description="Source from which listing was scraped",
        examples=["Justdial"],
    )

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        """Validate phone number format (Indian numbers)."""
        if v is None:
            return v
        cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
        if not re.match(r"^(\d{10,13})$", cleaned):
            raise ValueError("Invalid phone number format")
        return v

    @field_validator("business_name", "category", "city", "source")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        """Strip leading/trailing whitespace from string fields."""
        return v.strip()


class ListingBulkCreate(BaseModel):
    """Schema for bulk inserting multiple listings."""

    listings: list[ListingCreate] = Field(
        ..., min_length=1,
        description="List of listings to insert",
    )


# ── Response Schemas ─────────────────────────────────────────────

class ListingResponse(BaseModel):
    """Schema for a single listing in API responses."""

    id: int
    business_name: str
    category: str
    city: str
    address: str
    phone: Optional[str]
    source: str
    created_at: datetime

    class Config:
        from_attributes = True


class PaginatedListingResponse(BaseModel):
    """Paginated response for listing queries."""

    items: list[ListingResponse]
    total: int = Field(..., description="Total number of matching records")
    page: int = Field(..., description="Current page number")
    page_size: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")


# ── Analytics Schemas ────────────────────────────────────────────

class AnalyticsItem(BaseModel):
    """Single analytics data point (label + count)."""

    name: str = Field(..., description="Category/City/Source name")
    count: int = Field(..., description="Number of listings")


class AnalyticsResponse(BaseModel):
    """Response schema for analytics endpoints."""

    data: list[AnalyticsItem]
    total: int = Field(..., description="Total count across all items")


class SummaryResponse(BaseModel):
    """Dashboard summary statistics."""

    total_listings: int
    total_cities: int
    total_categories: int
    total_sources: int


# ── Utility Schemas ──────────────────────────────────────────────

class HealthResponse(BaseModel):
    """Health check response."""

    status: str = "healthy"
    version: str
    database: str


class MessageResponse(BaseModel):
    """Generic message response."""

    message: str
    success: bool = True


class BulkInsertResponse(BaseModel):
    """Response for bulk insert operations."""

    message: str
    inserted_count: int
    duplicate_count: int
    success: bool = True


class ScraperRequest(BaseModel):
    """Request to trigger the scraper."""

    count: int = Field(
        default=500, ge=1, le=5000,
        description="Number of listings to generate",
    )
    mode: str = Field(
        default="mock",
        description="Scraper mode: 'mock' or 'live'",
    )


class ScraperResponse(BaseModel):
    """Response after scraper execution."""

    message: str
    listings_generated: int
    listings_inserted: int
    duplicates_skipped: int
    success: bool = True
