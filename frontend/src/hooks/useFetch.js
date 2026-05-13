import { useState, useEffect, useCallback } from 'react';

/**
 * useFetch Hook
 * =============
 * Generic data fetching hook with loading, error, and refetch support.
 *
 * @param {Function} fetchFn - Async function that returns data.
 * @param {Array} deps - Dependencies array for re-fetching.
 * @returns {{ data, loading, error, refetch }}
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export default useFetch;
