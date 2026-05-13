"""
FastAPI Application Entry Point
================================
Configures and launches the Business Listings Dashboard API
with CORS, routing, Swagger docs, and database initialization.
"""

import json
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database.connection import engine, Base, SessionLocal
from app.models.listing import ListingMaster
from app.api import (
    health_router,
    listings_router,
    analytics_router,
    export_router,
    scraper_router,
)
from app.utils.logger import get_logger

settings = get_settings()
logger = get_logger("main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler — runs on startup and shutdown."""
    # ── Startup ──────────────────────────────────────────────────
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info(f"Database: {settings.DATABASE_URL}")

    # Create tables
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created/verified")

    # Auto-seed if database is empty
    db = SessionLocal()
    try:
        count = db.query(ListingMaster).count()
        if count == 0:
            seed_path = os.path.join(
                os.path.dirname(os.path.dirname(__file__)), "seed_data.json"
            )
            if os.path.exists(seed_path):
                logger.info("Database empty — seeding from seed_data.json...")
                with open(seed_path, "r", encoding="utf-8") as f:
                    seed_data = json.load(f)
                for item in seed_data:
                    listing = ListingMaster(
                        business_name=item["business_name"],
                        category=item["category"],
                        city=item["city"],
                        address=item["address"],
                        phone=item.get("phone"),
                        source=item["source"],
                    )
                    db.add(listing)
                db.commit()
                logger.info(f"Seeded {len(seed_data)} listings from JSON")
            else:
                logger.info("No seed_data.json found. Use /scraper/run to generate data.")
        else:
            logger.info(f"Database already has {count} listings")
    finally:
        db.close()

    yield

    # ── Shutdown ─────────────────────────────────────────────────
    logger.info("Application shutting down...")


# ── FastAPI Application ──────────────────────────────────────────

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "A production-quality API for managing and analyzing "
        "500+ scraped business listings across Indian cities."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── CORS Middleware ──────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register Routers ────────────────────────────────────────────

app.include_router(health_router)
app.include_router(listings_router)
app.include_router(analytics_router)
app.include_router(export_router)
app.include_router(scraper_router)


@app.get("/", tags=["Root"])
def root():
    """API root — redirects to documentation."""
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }
