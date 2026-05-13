import { useState, useMemo } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import EmptyState from './EmptyState';

/**
 * DataTable Component
 * ===================
 * Full-featured table with search, sorting, and pagination controls.
 */
export default function DataTable({
  data = [],
  columns = [],
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  onSort,
  sortBy,
  sortOrder,
  total = 0,
  pageSize = 20,
}) {
  if (!data.length) {
    return <EmptyState title="No listings found" />;
  }

  const handleSort = (field) => {
    if (!onSort) return;
    if (sortBy === field) {
      onSort(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(field, 'asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <ChevronDown className="h-3 w-3 opacity-30" />;
    return sortOrder === 'asc' ? (
      <ChevronUp className="h-3 w-3 text-brand-500" />
    ) : (
      <ChevronDown className="h-3 w-3 text-brand-500" />
    );
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-surface-200">
        <table className="w-full text-left text-sm" id="listings-table">
          <thead>
            <tr className="border-b border-surface-200 bg-surface-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-surface-700 transition select-none"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    <SortIcon field={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="transition-colors hover:bg-brand-50/30"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-surface-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-gray-500">
          Showing <span className="font-medium text-surface-700">{startItem}</span>
          {' '}&ndash;{' '}
          <span className="font-medium text-surface-700">{endItem}</span>
          {' '}of{' '}
          <span className="font-medium text-surface-700">{total.toLocaleString()}</span>
        </p>

        <div className="flex items-center gap-1">
          <PaginationBtn
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationBtn>
          <PaginationBtn
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationBtn>

          {/* Page numbers */}
          {getPageNumbers(currentPage, totalPages).map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                &hellip;
              </span>
            ) : (
              <PaginationBtn
                key={p}
                onClick={() => onPageChange(p)}
                active={p === currentPage}
              >
                {p}
              </PaginationBtn>
            )
          )}

          <PaginationBtn
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationBtn>
          <PaginationBtn
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationBtn>
        </div>
      </div>
    </div>
  );
}

function PaginationBtn({ children, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
        active
          ? 'bg-brand-500 text-white shadow-sm'
          : disabled
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-surface-700 hover:bg-surface-100'
      }`}
    >
      {children}
    </button>
  );
}

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }
  return pages;
}
