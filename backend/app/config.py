"""
Application Configuration Module
================================
Loads environment variables and provides centralized configuration
for the entire backend application using Pydantic Settings.
"""

import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # ── Application ──────────────────────────────────────────────
    APP_NAME: str = "Business Listings Dashboard"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # ── Database ─────────────────────────────────────────────────
    # MySQL connection (primary)
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = ""
    DB_NAME: str = "business_listings"

    # Use SQLite fallback when MySQL is unavailable
    USE_SQLITE: bool = True
    SQLITE_URL: str = "sqlite:///./business_listings.db"

    # ── CORS ─────────────────────────────────────────────────────
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

    # ── Scraper ──────────────────────────────────────────────────
    SCRAPER_MODE: str = "mock"  # "mock" or "live"
    SCRAPER_LISTING_COUNT: int = 500
    SCRAPER_REQUEST_DELAY: float = 1.0

    # ── Server ───────────────────────────────────────────────────
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    @property
    def DATABASE_URL(self) -> str:
        """Construct the database URL based on configuration."""
        if self.USE_SQLITE:
            return self.SQLITE_URL
        return (
            f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Return cached application settings (singleton pattern)."""
    return Settings()
