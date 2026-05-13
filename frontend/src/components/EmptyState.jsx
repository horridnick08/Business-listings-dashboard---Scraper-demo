import { Inbox } from 'lucide-react';

/**
 * EmptyState Component
 * ====================
 * Displayed when no data is available.
 */
export default function EmptyState({
  title = 'No data found',
  message = 'Try adjusting your filters or run the scraper to populate data.',
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-2xl bg-surface-100 p-5 mb-4">
        <Icon className="h-10 w-10 text-surface-200" />
      </div>
      <h3 className="text-lg font-semibold text-surface-700">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-400">{message}</p>
    </div>
  );
}
