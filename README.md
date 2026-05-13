# 📊 Business Listings Dashboard

A **production-quality full-stack dashboard** that scrapes, stores, and visualizes 500+ business listings across Indian cities using FastAPI, React, and MySQL/SQLite.

![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

---

# 🎯 Project Overview

This project demonstrates a complete data pipeline:

1. Scrape 500+ business listings from multiple sources
2. Store structured business data in MySQL / SQLite
3. Expose analytics using FastAPI REST APIs
4. Visualize business insights in a React dashboard

---

# 🌐 Live Demo

## Frontend
https://business-dashboard-frontend-airu.onrender.com

## Backend API
https://business-listings-dashboard-scraper-demo-7wpk.onrender.com

## Swagger Documentation
https://business-listings-dashboard-scraper-demo-7wpk.onrender.com/docs

---

# ✨ Features

## Backend Features

- ✅ FastAPI backend with Swagger documentation
- ✅ SQLAlchemy ORM integration
- ✅ MySQL + SQLite support
- ✅ Pydantic v2 validation
- ✅ Pagination, filtering, search & sorting
- ✅ Analytics APIs
- ✅ CSV export endpoint
- ✅ Scraper API support
- ✅ Mock data generator for 500+ listings
- ✅ Logging and error handling
- ✅ Auto database seeding
- ✅ CORS support for frontend integration

---

## Frontend Features

- ✅ React 18 + Vite
- ✅ Tailwind CSS UI
- ✅ Responsive dashboard layout
- ✅ Sidebar navigation
- ✅ Recharts analytics charts
- ✅ Pie charts & bar charts
- ✅ Search and filtering
- ✅ Paginated listings table
- ✅ Toast notifications
- ✅ CSV export button
- ✅ Scraper control panel
- ✅ API caching
- ✅ Loading skeletons
- ✅ Error handling UI

---

# 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Recharts, Axios |
| Backend | FastAPI, Python 3.13, SQLAlchemy, Pydantic |
| Database | MySQL 8 / SQLite |
| Scraping | BeautifulSoup4, Requests, Fake-UserAgent |
| Deployment | Render |
| DevOps | Docker, Docker Compose |

---

# 📁 Folder Structure

```bash
business-listings-dashboard/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── scraper/
│   │   ├── utils/
│   │   ├── config.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── .env.example
│   ├── seed_data.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── charts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   └── Dockerfile
│
├── database/
│   └── listing_master.sql
│
├── docker-compose.yml
└── README.md
```

---

# 🚀 Setup Instructions

# Prerequisites

- Python 3.10+
- Node.js 18+
- MySQL 8 (optional)
- Git

---

# 1. Clone Repository

```bash
git clone https://github.com/horridnick08/Business-listings-dashboard---Scraper-demo.git

cd Business-listings-dashboard---Scraper-demo
```

---

# 2. Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```

Backend runs at:

```bash
http://localhost:8000
```

Swagger docs:

```bash
http://localhost:8000/docs
```

---

# 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

# 4. Docker Setup

```bash
docker-compose up --build
```

---

# 🔐 Environment Variables

## Backend (.env)

```env
APP_NAME=Business Listings Dashboard
APP_VERSION=1.0.0
DEBUG=True

USE_SQLITE=True
SQLITE_URL=sqlite:///./business_listings.db

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=business_listings

CORS_ORIGINS=["https://business-dashboard-frontend-airu.onrender.com"]

SCRAPER_MODE=mock
SCRAPER_LISTING_COUNT=500
SCRAPER_REQUEST_DELAY=1.0
```

---

## Frontend (.env)

```env
VITE_API_URL=https://business-listings-dashboard-scraper-demo-7wpk.onrender.com
```

---

# 🗄️ Database Setup

## SQLite (Default)

No setup required.

Database auto-creates on startup.

---

## MySQL Setup

```sql
CREATE DATABASE business_listings;
```

Run schema:

```bash
mysql -u root -p < database/listing_master.sql
```

---

# 📡 API Documentation

Swagger Docs:

https://business-listings-dashboard-scraper-demo-7wpk.onrender.com/docs

---

# Key API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /health | Health check |
| GET | /listings | Fetch listings |
| POST | /listings | Create listing |
| POST | /listings/bulk | Bulk insert |
| GET | /analytics/city-wise | City analytics |
| GET | /analytics/category-wise | Category analytics |
| GET | /analytics/source-wise | Source analytics |
| GET | /analytics/summary | Dashboard summary |
| GET | /export/csv | Export CSV |
| POST | /scraper/run | Run scraper |

---

# 📊 Dashboard Analytics

The dashboard visualizes:

- City-wise business count
- Category-wise business count
- Source-wise business count
- Total listings summary
- Top cities by listings
- Category distribution

---

# 🚀 Deployment

Both frontend and backend are deployed on Render.

## Frontend Deployment

- Platform: Render Static Site
- Framework: React + Vite

Frontend URL:

https://business-dashboard-frontend-airu.onrender.com

---

## Backend Deployment

- Platform: Render Web Service
- Framework: FastAPI + Uvicorn

Backend URL:

https://business-listings-dashboard-scraper-demo-7wpk.onrender.com

Swagger Docs:

https://business-listings-dashboard-scraper-demo-7wpk.onrender.com/docs

---

# 🧗 Challenges Faced

## 1. Web Scraping Restrictions

Many business directory websites use anti-bot protection and dynamic rendering, making direct scraping difficult.

To solve this, a realistic mock-data generator was implemented alongside structured scraping logic to simulate 500+ business listings while preserving the overall scraping workflow.

---

## 2. Frontend-Backend Integration

Handling CORS issues during production deployment required proper FastAPI middleware configuration and environment-based API handling.

---

## 3. Cross Database Compatibility

Supporting both SQLite (development) and MySQL (production) required careful ORM configuration.

---

## 4. Dashboard Performance

Rendering large datasets required pagination, caching, filtering, and optimized API responses.

---

# 🔮 Future Improvements

- JWT Authentication
- Real-time scraper progress
- Live scraping using Selenium
- Excel export support
- Interactive map analytics
- Scheduled scraping jobs
- WebSocket integration
- Unit testing
- CI/CD pipeline
- API rate limiting

---

# 📬 Internship Assignment Submission

This project was developed as part of the Python Development Intern technical assignment for Honeybee Digital.

## Assignment Requirements Covered

- ✅ 500+ business listings
- ✅ FastAPI backend APIs
- ✅ React dashboard frontend
- ✅ MySQL/SQLite integration
- ✅ Data analytics visualization
- ✅ CSV export functionality
- ✅ Swagger API documentation
- ✅ Render deployment

---

# 📄 License

This project is built for educational and internship showcase purposes.

---

<p align="center">
Built with ❤️ using FastAPI + React + Tailwind CSS
</p>
