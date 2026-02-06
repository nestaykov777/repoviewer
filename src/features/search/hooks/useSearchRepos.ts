import { useInfiniteQuery } from '@tanstack/react-query';

import { searchRepositories } from '../../../shared/api/github';

export function useSearchRepos(query: string) {
  return useInfiniteQuery({
    queryKey: ['searchRepos', query],
    queryFn: ({ pageParam }) => searchRepositories(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.items.length,
        0,
      );
      if (totalFetched >= lastPage.total_count) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // Cache results for 5 min
    gcTime: 30 * 60 * 1000, // Keep unused cache for 30 min
    refetchOnWindowFocus: false,
  });
}
