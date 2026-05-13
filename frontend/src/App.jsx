import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import Analytics from './pages/Analytics';
import ScraperPanel from './pages/ScraperPanel';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * App Component
 * =============
 * Root application component with routing and layout.
 */
function App() {
  return (
    <ErrorBoundary>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/scraper" element={<ScraperPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </ErrorBoundary>
  );
}

export default App;
