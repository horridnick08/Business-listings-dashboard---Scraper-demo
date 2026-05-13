import { useFetch } from '../hooks/useFetch';
import { SkeletonChart } from '../components/Loader';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import DoughnutChartComponent from '../charts/DoughnutChartComponent';
import {
  getCityAnalytics,
  getCategoryAnalytics,
  getSourceAnalytics,
} from '../api/listings';

/**
 * Analytics Page
 * ==============
 * Full-page analytics with all chart types at larger sizes.
 */
export default function Analytics() {
  const { data: cityData, loading: cityLoading } = useFetch(getCityAnalytics);
  const { data: categoryData, loading: catLoading } = useFetch(getCategoryAnalytics);
  const { data: sourceData, loading: srcLoading } = useFetch(getSourceAnalytics);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-800 tracking-tight">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Detailed breakdown of business listings by city, category, and source
        </p>
      </div>

      {/* City Chart — Full Width */}
      {cityLoading ? (
        <SkeletonChart />
      ) : (
        <BarChartComponent
          data={cityData?.data || []}
          title="City-wise Business Count"
        />
      )}

      {/* Category + Source — Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {catLoading ? (
          <SkeletonChart />
        ) : (
          <PieChartComponent
            data={categoryData?.data || []}
            title="Category-wise Distribution"
          />
        )}

        {srcLoading ? (
          <SkeletonChart />
        ) : (
          <DoughnutChartComponent
            data={sourceData?.data || []}
            title="Source-wise Distribution"
          />
        )}
      </div>

      {/* Data Summary Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsList
          title="Cities"
          data={cityData?.data || []}
          total={cityData?.total || 0}
          color="brand"
        />
        <AnalyticsList
          title="Categories"
          data={categoryData?.data || []}
          total={categoryData?.total || 0}
          color="emerald"
        />
        <AnalyticsList
          title="Sources"
          data={sourceData?.data || []}
          total={sourceData?.total || 0}
          color="amber"
        />
      </div>
    </div>
  );
}

/**
 * AnalyticsList — Compact ranked list for analytics breakdown.
 */
function AnalyticsList({ title, data = [], total, color = 'brand' }) {
  const colorClasses = {
    brand: 'bg-brand-50 text-brand-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  };

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-surface-800">{title}</h3>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colorClasses[color]}`}>
          {data.length} total
        </span>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {data.map((item, idx) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-50 transition"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400 w-5">{idx + 1}.</span>
              <span className="text-sm font-medium text-surface-700">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-surface-800">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
