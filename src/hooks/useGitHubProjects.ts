import { useEffect, useState } from 'react';
import projectsData from '../data/projects.json';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  type: string;
  highlights: string[];
  link?: string;
  githubRepo?: string;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/dominichubble/repos?sort=updated&per_page=100&type=owner'
        );
        
        if (!response.ok) {
          // Rate limit or other error - fall back to static data
          console.warn('GitHub API unavailable, using static data');
          setProjects(projectsData.projects as Project[]);
          setLoading(false);
          return;
        }

        const repos: GitHubRepo[] = await response.json();
        
        console.log('Fetched repos:', repos.map(r => ({ name: r.name, topics: r.topics, stars: r.stargazers_count })));
        
        // Filter repos with 'portfolio' topic or starred repos
        const portfolioRepos = repos.filter(repo => 
          repo.topics.includes('portfolio') || 
          repo.topics.includes('featured') ||
          repo.topics.includes('academic') ||
          repo.topics.includes('university') ||
          repo.topics.includes('coursework-project') ||
          repo.stargazers_count > 0
        );
        
        console.log('Filtered portfolio repos:', portfolioRepos.map(r => r.name));

        // Transform GitHub repos to project format
        const transformedProjects: Project[] = portfolioRepos.map(repo => {
          // Determine project type based on topics
          const isAcademic = repo.topics.includes('academic') || 
                           repo.topics.includes('university') ||
                           repo.topics.includes('coursework-project');
          const type = isAcademic ? 'Academic' : 'Professional';

          // Determine status based on recent activity
          const daysSinceUpdate = Math.floor(
            (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24)
          );
          const status = daysSinceUpdate < 30 ? 'In Progress' : 'Completed';

          // Extract technologies from language and topics
          const technologies = [
            repo.language,
            ...repo.topics.filter(t => !['portfolio', 'featured', 'academic', 'university', 'coursework-project'].includes(t))
          ].filter(Boolean) as string[];

          // Create highlights
          const highlights = [];
          if (repo.stargazers_count > 0) {
            highlights.push(`⭐ ${repo.stargazers_count} GitHub stars`);
          }
          if (repo.forks_count > 0) {
            highlights.push(`🔱 ${repo.forks_count} forks`);
          }
          if (repo.description) {
            highlights.push(`📝 ${repo.description}`);
          }

          return {
            id: repo.name,
            title: repo.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: repo.description || 'No description provided',
            technologies,
            status,
            type,
            highlights,
            link: repo.html_url,
            githubRepo: `dominichubble/${repo.name}`,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            lastUpdated: repo.updated_at
          };
        });

        setProjects(transformedProjects);
      } catch (err) {
        // Fall back to static data on any error
        console.warn('Error fetching from GitHub, using static data:', err);
        setProjects(projectsData.projects as Project[]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}
