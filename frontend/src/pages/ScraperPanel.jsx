import { useState } from 'react';
import { Bot, Play, Loader2, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { runScraper } from '../api/listings';
import toast from 'react-hot-toast';

/**
 * ScraperPanel Page
 * =================
 * Control panel to trigger the web scraper and view results.
 */
export default function ScraperPanel() {
  const [count, setCount] = useState(500);
  const [mode, setMode] = useState('mock');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRun = async () => {
    setRunning(true);
    setResult(null);
    setError(null);

    try {
      const res = await runScraper(count, mode);
      setResult(res);
      toast.success(`Successfully inserted ${res.listings_inserted} listings!`);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setError(msg);
      toast.error('Scraper failed: ' + msg);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-800 tracking-tight">
          Scraper Control Panel
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Generate and import business listings into the database
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Card */}
        <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-brand-50 p-2.5">
              <Settings className="h-5 w-5 text-brand-500" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-surface-800">
                Configuration
              </h3>
              <p className="text-xs text-gray-500">
                Set scraper parameters before running
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Listing Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Listings
              </label>
              <input
                type="number"
                min={1}
                max={5000}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 500)}
                className="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                id="scraper-count"
              />
              <p className="mt-1 text-xs text-gray-400">
                Recommended: 500 — 2000 listings
              </p>
            </div>

            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scraper Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('mock')}
                  className={`rounded-xl border p-3 text-sm font-medium transition ${
                    mode === 'mock'
                      ? 'border-brand-300 bg-brand-50 text-brand-700'
                      : 'border-surface-200 text-gray-500 hover:bg-surface-50'
                  }`}
                  id="mode-mock"
                >
                  <Bot className="h-5 w-5 mx-auto mb-1" />
                  Mock Data
                </button>
                <button
                  onClick={() => setMode('live')}
                  className={`rounded-xl border p-3 text-sm font-medium transition ${
                    mode === 'live'
                      ? 'border-brand-300 bg-brand-50 text-brand-700'
                      : 'border-surface-200 text-gray-500 hover:bg-surface-50'
                  }`}
                  id="mode-live"
                >
                  <Play className="h-5 w-5 mx-auto mb-1" />
                  Live Scrape
                </button>
              </div>
              {mode === 'live' && (
                <p className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                  ⚠️ Live scraping requires website permission. Will fall back to mock.
                </p>
              )}
            </div>

            {/* Run Button */}
            <button
              onClick={handleRun}
              disabled={running}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              id="run-scraper-btn"
            >
              {running ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running Scraper...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run Scraper
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-emerald-50 p-2.5">
              <Bot className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-surface-800">
                Results
              </h3>
              <p className="text-xs text-gray-500">
                Scraper execution results
              </p>
            </div>
          </div>

          {!result && !error && !running && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bot className="h-16 w-16 text-surface-200 mb-4" />
              <p className="text-sm text-gray-400">
                Run the scraper to see results here
              </p>
            </div>
          )}

          {running && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-surface-200" />
                <div className="absolute top-0 h-16 w-16 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
              </div>
              <p className="mt-4 text-sm font-medium text-gray-500">
                Generating listings...
              </p>
              <p className="text-xs text-gray-400 mt-1">
                This may take a moment
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-xl">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">{result.message}</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <StatBox label="Generated" value={result.listings_generated} />
                <StatBox label="Inserted" value={result.listings_inserted} />
                <StatBox label="Duplicates" value={result.duplicates_skipped} />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 p-3 rounded-xl animate-fade-in">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="rounded-2xl border border-surface-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-card">
        <h3 className="text-base font-semibold text-surface-800 mb-3">
          About the Scraper
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="space-y-1">
            <p className="font-medium text-surface-700">Mock Mode</p>
            <p>
              Generates realistic Indian business listings with proper names,
              addresses, phone numbers, and categories.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-surface-700">Data Quality</p>
            <p>
              Built-in deduplication, phone validation, and data cleaning
              ensure high-quality listings.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-surface-700">Sources</p>
            <p>
              Simulates data from Justdial, Sulekha, Google Maps, IndiaMART,
              and TradeIndia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl bg-surface-50 p-3 text-center">
      <p className="text-2xl font-bold text-surface-800">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
