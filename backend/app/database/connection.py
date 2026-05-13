"""
Database Connection Module
==========================
Sets up SQLAlchemy engine, session factory, and dependency injection
for FastAPI route handlers.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from typing import Generator

from app.config import get_settings

settings = get_settings()

# ── Engine Configuration ─────────────────────────────────────────
# Use connect_args for SQLite thread safety; omit for MySQL
connect_args = {}
if settings.USE_SQLITE:
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
    echo=settings.DEBUG,
)

# ── Session Factory ──────────────────────────────────────────────
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# ── Declarative Base ─────────────────────────────────────────────
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that provides a database session.

    Yields a SQLAlchemy session and ensures it is closed
    after the request completes, even if an exception occurs.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
