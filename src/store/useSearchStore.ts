import { create } from 'zustand';

interface SearchState {
  query: string;
  debouncedQuery: string;
  setQuery: (query: string) => void;
  setDebouncedQuery: (debouncedQuery: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  debouncedQuery: '',
  setQuery: (query: string) => set({ query }),
  setDebouncedQuery: (debouncedQuery: string) => set({ debouncedQuery }),
  clearSearch: () => set({ query: '', debouncedQuery: '' }),
}));
