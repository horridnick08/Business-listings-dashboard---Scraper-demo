import { useState, useCallback } from 'react';
import { Search, Menu, RefreshCw, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { exportCsv, clearCache } from '../api/listings';
import toast from 'react-hot-toast';

/**
 * Navbar Component
 * ================
 * Top navigation bar with global search, refresh, and export actions.
 */
export default function Navbar({ onMenuClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    clearCache();
    // Trigger a small delay to show the animation
    await new Promise((r) => setTimeout(r, 600));
    window.location.reload();
    setRefreshing(false);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      await exportCsv();
      toast.success('CSV exported successfully');
    } catch {
      toast.error('Failed to export CSV');
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) {
      navigate(`/listings?search=${encodeURIComponent(value)}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-surface-200 bg-white/80 backdrop-blur-md px-4 md:px-6">
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-surface-100 transition md:hidden"
          id="menu-toggle"
        >
          <Menu className="h-5 w-5 text-surface-700" />
        </button>

        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-200" />
          <input
            id="global-search"
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-xl border border-surface-200 bg-surface-50 py-2.5 pl-10 pr-4 text-sm text-surface-700 placeholder:text-surface-200 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleRefresh}
          className="rounded-xl p-2.5 text-surface-700 hover:bg-surface-100 transition-colors"
          title="Refresh data"
          id="refresh-btn"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
          />
        </button>
        <button
          onClick={handleExport}
          className="hidden sm:flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors shadow-sm"
          id="export-btn"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>
    </header>
  );
}
