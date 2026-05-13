/**
 * Loader Component
 * ================
 * Skeleton loader for data loading states.
 */

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-8 w-20" />
        </div>
        <div className="skeleton h-12 w-12 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
      <div className="skeleton h-5 w-40 mb-4" />
      <div className="skeleton h-64 w-full" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card space-y-3">
      <div className="skeleton h-5 w-40 mb-4" />
      {[...Array(8)].map((_, i) => (
        <div key={i} className="skeleton h-10 w-full" />
      ))}
    </div>
  );
}

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-surface-200" />
        <div className="absolute top-0 h-12 w-12 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-sm font-medium text-gray-500">{text}</p>
    </div>
  );
}
