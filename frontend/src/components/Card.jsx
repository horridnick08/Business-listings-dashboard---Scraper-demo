import { TrendingUp } from 'lucide-react';

/**
 * Card Component
 * ==============
 * Reusable metric card for dashboard KPIs.
 *
 * @param {string} title - Metric label
 * @param {string|number} value - Metric value
 * @param {React.ComponentType} icon - Lucide icon component
 * @param {string} color - Color theme (brand, emerald, amber, rose)
 * @param {string} trend - Optional trend percentage
 */

const colorMap = {
  brand: {
    bg: 'bg-brand-50',
    icon: 'text-brand-500',
    border: 'border-brand-100',
    gradient: 'from-brand-500 to-brand-600',
  },
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-500',
    border: 'border-emerald-100',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-500',
    border: 'border-amber-100',
    gradient: 'from-amber-500 to-amber-600',
  },
  rose: {
    bg: 'bg-rose-50',
    icon: 'text-rose-500',
    border: 'border-rose-100',
    gradient: 'from-rose-500 to-rose-600',
  },
};

export default function Card({ title, value, icon: Icon, color = 'brand', trend }) {
  const theme = colorMap[color] || colorMap.brand;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${theme.border} bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5`}
    >
      {/* Background gradient accent */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-[0.03] transition-opacity group-hover:opacity-[0.06]`}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-500 tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-surface-800 tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </div>
          )}
        </div>
        <div className={`rounded-xl ${theme.bg} p-3`}>
          <Icon className={`h-6 w-6 ${theme.icon}`} />
        </div>
      </div>
    </div>
  );
}
