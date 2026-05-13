# 📊 Business Listings Dashboard

A **production-quality full-stack dashboard** that scrapes, stores, and visualizes 500+ business listings across Indian cities. Built with FastAPI, React, and MySQL.

![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

---

## 🎯 Project Overview

This project demonstrates a complete data pipeline:

1. **Scrape** 500+ business listings from multiple sources
2. **Store** structured data in MySQL (SQLite for local dev)
3. **Expose** analytics via RESTful FastAPI endpoints
4. **Visualize** insights in a stunning React dashboard

---

## ✨ Features

### Backend
- ✅ FastAPI with auto-generated Swagger docs
- ✅ SQLAlchemy ORM with proper indexing
- ✅ Pydantic v2 validation schemas
- ✅ Pagination, filtering, search, and sorting
- ✅ City/Category/Source analytics aggregation
- ✅ CSV export endpoint
- ✅ Scraper with realistic mock data generation
- ✅ CORS, error handling, logging
- ✅ Auto-seeding on startup

### Frontend
- ✅ React 18 + Vite (blazing fast)
- ✅ Tailwind CSS with custom design system
- ✅ Recharts — Bar, Pie, Doughnut charts
- ✅ Responsive sidebar layout
- ✅ Debounced global search
- ✅ Skeleton loaders & loading states
- ✅ Error boundaries
- ✅ Toast notifications
- ✅ CSV export button
- ✅ Scraper control panel
- ✅ Paginated data table with sorting
- ✅ Filter dropdowns (city, category, source)
- ✅ API response caching

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS 3, Recharts, Axios, Lucide Icons |
| **Backend** | Python 3.13, FastAPI, SQLAlchemy, Pydantic v2, Uvicorn |
| **Database** | MySQL 8.0 (production) / SQLite (development) |
| **Scraping** | BeautifulSoup4, Requests, Fake-UserAgent |
| **DevOps** | Docker, Docker Compose |

---

## 📁 Folder Structure

```
business-listings-dashboard/
│
├── backend/
│   ├── app/
│   │   ├── api/            # FastAPI route handlers
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── schemas/        # Pydantic validation schemas
│   │   ├── database/       # DB engine & session setup
│   │   ├── services/       # Business logic layer
│   │   ├── scraper/        # Web scraper / mock generator
│   │   ├── utils/          # Logger, validators
│   │   ├── main.py         # FastAPI app entry point
│   │   └── config.py       # Environment configuration
│   │
│   ├── requirements.txt
│   ├── .env.example
│   ├── seed_data.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios client & API functions
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── charts/         # Recharts components
│   │   ├── layouts/        # Layout components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
│
├── database/
│   └── listing_master.sql
│
├── screenshots/
├── docker-compose.yml
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 18+
- MySQL 8.0 (optional — SQLite works for development)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/business-listings-dashboard.git
cd business-listings-dashboard
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (optional)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Generate seed data (500+ listings)
python -m app.scraper.scraper

# Start the server
uvicorn app.main:app --reload --port 8000
```

The backend auto-seeds the database on first startup if `seed_data.json` exists.

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Docker Setup (Alternative)

```bash
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `https://business-listings-dashboard-scraper-demo-7wpk.onrender.com`
- Swagger: `https://business-listings-dashboard-scraper-demo-7wpk.onrender.com/docs`

---

## 🔐 Environment Variables

### Backend (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `USE_SQLITE` | `True` | Use SQLite for development |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_USER` | `root` | MySQL user |
| `DB_PASSWORD` | `` | MySQL password |
| `DB_NAME` | `business_listings` | Database name |
| `DEBUG` | `True` | Enable debug mode |
| `SCRAPER_MODE` | `mock` | Scraper mode (mock/live) |

### Frontend (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` (proxy) | Backend API URL |

---

## 🗄️ Database Setup

### Using SQLite (Default — No Setup Required)

Set `USE_SQLITE=True` in `.env`. The database is created automatically.

### Using MySQL

```sql
CREATE DATABASE business_listings;
```

Or run the provided schema:

```bash
mysql -u root -p < database/listing_master.sql
```

Then set `USE_SQLITE=False` in `.env` with your MySQL credentials.

---

## 📡 API Documentation

Interactive Swagger UI: `https://business-listings-dashboard-scraper-demo-7wpk.onrender.com/docs`

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/listings?page=1&search=hotel&city=Mumbai` | Paginated listings |
| `POST` | `/listings` | Create listing |
| `POST` | `/listings/bulk` | Bulk insert |
| `GET` | `/analytics/city-wise` | City analytics |
| `GET` | `/analytics/category-wise` | Category analytics |
| `GET` | `/analytics/source-wise` | Source analytics |
| `GET` | `/analytics/summary` | Dashboard summary |
| `GET` | `/export/csv` | Download CSV |
| `POST` | `/scraper/run` | Trigger scraper |

---

## 📸 Screenshots

> Screenshots will be added after running the application.

See the `screenshots/` directory.

---

## 🧗 Challenges Faced

1. **Web Scraping Restrictions**: Real scraping of Justdial/Sulekha is blocked by anti-bot measures. Solved by creating a realistic mock data generator that produces 500+ Indian business listings with proper names, categories, cities, and phone numbers.

2. **Cross-Database Compatibility**: Supporting both SQLite (development) and MySQL (production) required careful ORM configuration to handle dialect differences.

3. **Frontend Performance**: Rendering 500+ rows in a table required pagination, virtual loading, and API-level filtering to keep the UI responsive.

4. **Data Deduplication**: Ensuring unique listings across multiple scraper runs required composite key validation on business name + city.

---

## 🔮 Future Improvements

- [ ] Add user authentication (JWT)
- [ ] Implement real-time scraping with Selenium/Playwright
- [ ] Add data export in Excel format
- [ ] Implement data visualization map view (Mapbox/Leaflet)
- [ ] Add scheduled scraping with Celery
- [ ] Implement WebSocket for live scraper progress
- [ ] Add unit and integration tests (pytest + React Testing Library)
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Rate limiting and API key authentication
- [ ] Advanced analytics (time-series trends, growth metrics)

---

## 📄 License

This project is built for educational and internship-showcase purposes.

---

<p align="center">
  Built with ❤️ using FastAPI + React + Tailwind CSS
</p>
