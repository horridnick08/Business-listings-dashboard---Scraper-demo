import { useState, useEffect, useRef } from 'react';

/**
 * useDebounce Hook
 * ================
 * Debounces a value by the specified delay.
 *
 * @param {any} value - The value to debounce.
 * @param {number} delay - Debounce delay in milliseconds.
 * @returns {any} The debounced value.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
