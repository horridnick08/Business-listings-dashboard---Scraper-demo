import { Database, MapPin, Tag, Globe } from 'lucide-react';
import Card from '../components/Card';
import { SkeletonCard, SkeletonChart } from '../components/Loader';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import DoughnutChartComponent from '../charts/DoughnutChartComponent';
import { useFetch } from '../hooks/useFetch';
import {
  getSummary,
  getCityAnalytics,
  getCategoryAnalytics,
  getSourceAnalytics,
} from '../api/listings';

/**
 * Dashboard Page
 * ==============
 * Main dashboard with KPI cards and overview charts.
 */
export default function Dashboard() {
  const { data: summary, loading: summaryLoading } = useFetch(getSummary);
  const { data: cityData, loading: cityLoading } = useFetch(getCityAnalytics);
  const { data: categoryData, loading: catLoading } = useFetch(getCategoryAnalytics);
  const { data: sourceData, loading: srcLoading } = useFetch(getSourceAnalytics);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-800 tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your business listings analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {summaryLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <Card
              title="Total Listings"
              value={summary?.total_listings || 0}
              icon={Database}
              color="brand"
              trend="+12% this month"
            />
            <Card
              title="Total Cities"
              value={summary?.total_cities || 0}
              icon={MapPin}
              color="emerald"
            />
            <Card
              title="Total Categories"
              value={summary?.total_categories || 0}
              icon={Tag}
              color="amber"
            />
            <Card
              title="Total Sources"
              value={summary?.total_sources || 0}
              icon={Globe}
              color="rose"
            />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cityLoading ? (
          <SkeletonChart />
        ) : (
          <BarChartComponent
            data={cityData?.data || []}
            title="City-wise Business Count"
          />
        )}

        {catLoading ? (
          <SkeletonChart />
        ) : (
          <PieChartComponent
            data={categoryData?.data || []}
            title="Category-wise Distribution"
          />
        )}
      </div>

      {/* Source Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {srcLoading ? (
          <SkeletonChart />
        ) : (
          <DoughnutChartComponent
            data={sourceData?.data || []}
            title="Source-wise Distribution"
          />
        )}

        {/* Quick Stats */}
        <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
          <h3 className="text-base font-semibold text-surface-800 mb-6">
            Top Cities by Listings
          </h3>
          <div className="space-y-3">
            {(cityData?.data || []).slice(0, 8).map((city, idx) => (
              <div key={city.name} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-600">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-surface-700">
                      {city.name}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {city.count}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
                      style={{
                        width: `${(city.count / (cityData?.data?.[0]?.count || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
