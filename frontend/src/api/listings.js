/**
 * Listings API Functions
 * ======================
 * All API calls for listings, analytics, export, and scraper.
 */

import client, { cachedGet, clearCache } from './client';

// ── Listings ────────────────────────────────────────────────────

export async function getListings(params = {}) {
  return cachedGet('/listings', params, 10_000);
}

export async function createListing(data) {
  clearCache();
  const response = await client.post('/listings', data);
  return response.data;
}

export async function bulkCreateListings(listings) {
  clearCache();
  const response = await client.post('/listings/bulk', { listings });
  return response.data;
}

// ── Analytics ───────────────────────────────────────────────────

export async function getCityAnalytics() {
  return cachedGet('/analytics/city-wise');
}

export async function getCategoryAnalytics() {
  return cachedGet('/analytics/category-wise');
}

export async function getSourceAnalytics() {
  return cachedGet('/analytics/source-wise');
}

export async function getSummary() {
  return cachedGet('/analytics/summary');
}

// ── Export ───────────────────────────────────────────────────────

export async function exportCsv() {
  const response = await client.get('/export/csv', {
    responseType: 'blob',
  });

  // Trigger browser download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'business_listings.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

// ── Scraper ─────────────────────────────────────────────────────

export async function runScraper(count = 500, mode = 'mock') {
  clearCache();
  const response = await client.post('/scraper/run', { count, mode });
  return response.data;
}

// ── Health ──────────────────────────────────────────────────────

export async function getHealth() {
  const response = await client.get('/health');
  return response.data;
}

// ── Cache Control ───────────────────────────────────────────────

export { clearCache };
