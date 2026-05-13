import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import { SkeletonTable } from '../components/Loader';
import { useDebounce } from '../hooks/useDebounce';
import { getListings, getCityAnalytics, getCategoryAnalytics, getSourceAnalytics } from '../api/listings';

/**
 * Listings Page
 * =============
 * Searchable, filterable, sortable, paginated listing table.
 */
export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── State ─────────────────────────────────────────────────────
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [city, setCity] = useState(null);
  const [category, setCategory] = useState(null);
  const [source, setSource] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter options
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

  const debouncedSearch = useDebounce(search, 300);

  // ── Load Filter Options ───────────────────────────────────────
  useEffect(() => {
    async function loadFilters() {
      try {
        const [cityRes, catRes, srcRes] = await Promise.all([
          getCityAnalytics(),
          getCategoryAnalytics(),
          getSourceAnalytics(),
        ]);
        setCities(cityRes.data.map((d) => d.name));
        setCategories(catRes.data.map((d) => d.name));
        setSources(srcRes.data.map((d) => d.name));
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    }
    loadFilters();
  }, []);

  // ── Fetch Listings ────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        page_size: 20,
        sort_by: sortBy,
        sort_order: sortOrder,
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (city) params.city = city;
      if (category) params.category = category;
      if (source) params.source = source;

      const result = await getListings(params);
      setData(result);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, city, category, source, sortBy, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, city, category, source]);

  // ── Table Columns ─────────────────────────────────────────────
  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (val) => (
        <span className="text-xs font-mono text-gray-400">#{val}</span>
      ),
    },
    {
      key: 'business_name',
      label: 'Business Name',
      render: (val) => (
        <span className="font-medium text-surface-800">{val}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (val) => (
        <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
          {val}
        </span>
      ),
    },
    {
      key: 'city',
      label: 'City',
      render: (val) => (
        <span className="inline-flex items-center gap-1 text-sm">
          <MapPin className="h-3 w-3 text-gray-400" />
          {val}
        </span>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (val) =>
        val ? (
          <span className="inline-flex items-center gap-1 text-sm text-gray-600">
            <Phone className="h-3 w-3" />
            {val}
          </span>
        ) : (
          <span className="text-xs text-gray-300">N/A</span>
        ),
    },
    {
      key: 'source',
      label: 'Source',
      render: (val) => (
        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          {val}
        </span>
      ),
    },
  ];

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-800 tracking-tight">
          Business Listings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse and filter all scraped business listings
        </p>
      </div>

      {/* Filters Bar */}
      <div className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Search
            </label>
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by business name..."
            />
          </div>
          <FilterDropdown
            label="City"
            value={city}
            options={cities}
            onChange={setCity}
            id="filter-city"
          />
          <FilterDropdown
            label="Category"
            value={category}
            options={categories}
            onChange={setCategory}
            id="filter-category"
          />
          <FilterDropdown
            label="Source"
            value={source}
            options={sources}
            onChange={setSource}
            id="filter-source"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
          <DataTable
            data={data?.items || []}
            columns={columns}
            totalPages={data?.total_pages || 1}
            currentPage={data?.page || 1}
            total={data?.total || 0}
            pageSize={data?.page_size || 20}
            onPageChange={setPage}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>
      )}
    </div>
  );
}
