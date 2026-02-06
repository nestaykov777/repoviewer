import { GitHubRepository, GitHubSearchResponse } from '../types/github';

const BASE_URL = 'https://api.github.com';
const PER_PAGE = 30;

export async function searchRepositories(
  query: string,
  page: number = 1,
): Promise<GitHubSearchResponse> {
  if (!query.trim()) {
    return { total_count: 0, incomplete_results: false, items: [] };
  }

  const url = `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (response.status === 422) {
      throw new Error('Invalid search query. Please refine your search.');
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json() as Promise<GitHubSearchResponse>;
}

export async function getRepository(
  owner: string,
  repo: string,
): Promise<GitHubRepository> {
  const url = `${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Repository not found.');
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json() as Promise<GitHubRepository>;
}
