# Backend — Business Listings Dashboard

FastAPI-powered REST API for managing and analyzing business listings.

## Tech Stack

- Python 3.13 + FastAPI
- SQLAlchemy ORM
- Pydantic v2 (validation)
- Uvicorn (ASGI server)
- SQLite (dev) / MySQL (production)

## Setup

```bash
# Create virtual environment (optional)
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run the server
uvicorn app.main:app --reload --port 8000
```

## Generate Seed Data

```bash
cd backend
python -m app.scraper.scraper
```

This generates `seed_data.json` (500+ listings) which is auto-loaded on startup.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/listings` | Paginated listings |
| POST | `/listings` | Create single listing |
| POST | `/listings/bulk` | Bulk insert listings |
| GET | `/analytics/city-wise` | City breakdown |
| GET | `/analytics/category-wise` | Category breakdown |
| GET | `/analytics/source-wise` | Source breakdown |
| GET | `/analytics/summary` | Dashboard summary |
| GET | `/export/csv` | Download CSV |
| POST | `/scraper/run` | Trigger scraper |

## Swagger Docs

Visit `https://business-listings-dashboard-scraper-demo-7wpk.onrender.com` for interactive API documentation.
