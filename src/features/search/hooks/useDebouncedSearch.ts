import { useEffect, useMemo } from 'react';

import { debounce } from 'lodash';

import { useSearchStore } from '../store/useSearchStore';

export function useDebouncedSearch() {
  const { query, debouncedQuery, setQuery, setDebouncedQuery, clearSearch } =
    useSearchStore();

  // Waits 400ms after last keystroke before triggering search
  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value);
      }, 400),
    [setDebouncedQuery],
  );

  useEffect(() => {
    debouncedSetQuery(query);
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [query, debouncedSetQuery]);

  return {
    query,
    debouncedQuery,
    setQuery,
    clearSearch,
  };
}
