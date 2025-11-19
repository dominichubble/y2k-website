import { useEffect, useState } from 'react';

interface GitHubRepoData {
  stargazers_count: number;
  updated_at: string;
  language: string;
  forks_count: number;
}

interface EnrichedProject {
  stars?: number;
  lastUpdated?: string;
  primaryLanguage?: string;
  forks?: number;
}

export function useGitHubEnrich(githubRepo?: string) {
  const [enrichData, setEnrichData] = useState<EnrichedProject | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!githubRepo) return;

    const fetchGitHubData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/repos/${githubRepo}`);
        if (response.ok) {
          const data: GitHubRepoData = await response.json();
          setEnrichData({
            stars: data.stargazers_count,
            lastUpdated: data.updated_at,
            primaryLanguage: data.language,
            forks: data.forks_count
          });
        }
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [githubRepo]);

  return { enrichData, loading };
}
