
import axios from 'axios';

// Base URL — uses Vite proxy in dev, direct URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Simple In-Memory Cache ──────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 30_000; // 30 seconds

/**
 * GET request with optional caching.
 */
export async function cachedGet(url, params = {}, ttl = CACHE_TTL) {
  const cacheKey = `${url}?${JSON.stringify(params)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const response = await client.get(url, { params });
  cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
  return response.data;
}

/**
 * Clear all cached responses.
 */
export function clearCache() {
  cache.clear();
}

// ── Response Interceptor ────────────────────────────────────────
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.message ||
      'An unexpected error occurred';
    console.error(`API Error: ${message}`);
    return Promise.reject(error);
  }
);

export default client;
