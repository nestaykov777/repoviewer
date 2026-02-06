import { useQuery } from '@tanstack/react-query';

import { getRepository } from '../../../shared/api/github';

// Fetches and caches a single repo by owner/name
export function useRepoDetails(owner: string, repo: string) {
  return useQuery({
    queryKey: ['repoDetails', owner, repo],
    queryFn: () => getRepository(owner, repo),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
