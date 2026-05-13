import { ChevronDown } from 'lucide-react';

/**
 * FilterDropdown Component
 * ========================
 * Reusable dropdown filter with label and clear functionality.
 */
export default function FilterDropdown({
  label,
  value,
  options = [],
  onChange,
  placeholder = 'All',
  id,
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value || null)}
          className="w-full appearance-none rounded-xl border border-surface-200 bg-white py-2.5 pl-4 pr-10 text-sm text-surface-700 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100 cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
