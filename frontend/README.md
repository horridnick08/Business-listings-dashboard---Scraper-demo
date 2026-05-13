# Frontend — Business Listings Dashboard

React-based analytics dashboard built with Vite and Tailwind CSS.

## Tech Stack

- React 18 + Vite
- Tailwind CSS 3
- Recharts (charts)
- Lucide React (icons)
- React Router DOM (routing)
- React Hot Toast (notifications)
- Axios (HTTP client)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file (optional):

```env
VITE_API_URL=http://localhost:8000
```

If not set, the Vite dev server proxies `/api` requests to `localhost:8000`.

## Project Structure

```
src/
├── api/          # Axios client and API functions
├── charts/       # Recharts components (Bar, Pie, Doughnut)
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── layouts/      # Page layout components
├── pages/        # Route page components
├── App.jsx       # Root component with routing
├── main.jsx      # Entry point
└── index.css     # Global styles + Tailwind
```
