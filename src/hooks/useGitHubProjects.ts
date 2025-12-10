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

interface RawStaticProject {
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
  stars: number;
  forks: number;
  lastUpdated?: string;
  source: 'local' | 'github' | 'enriched';
}

/**
 * Centralized project formatter that transforms any source into uniform Project shape
 */
function formatProject(
  source: 'local' | 'github',
  data: RawStaticProject | GitHubRepo,
  githubData?: GitHubRepo
): Project {
  if (source === 'github') {
    const repo = data as GitHubRepo;
    
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

    // Generate consistent highlights
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
      lastUpdated: repo.updated_at,
      source: 'github'
    };
  } else {
    // Local project
    const project = data as RawStaticProject;
    const enriched = githubData ? 'enriched' : 'local';
    
    // Use GitHub data if available, otherwise use static values or defaults
    const stars = githubData?.stargazers_count ?? project.stars ?? 0;
    const forks = githubData?.forks_count ?? project.forks ?? 0;
    const lastUpdated = githubData?.updated_at ?? project.lastUpdated;
    
    // Update status based on GitHub activity if enriched and marked "In Progress"
    let status = project.status;
    if (githubData && project.status === 'In Progress') {
      const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(githubData.pushed_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      status = daysSinceUpdate < 30 ? 'In Progress' : 'Completed';
    }

    // Enhance highlights with GitHub stats if available
    const highlights = [...project.highlights];
    
    // Only add GitHub stats if not already in highlights and values are > 0
    const hasStarHighlight = highlights.some(h => h.includes('star'));
    const hasForkHighlight = highlights.some(h => h.includes('fork'));
    
    if (stars > 0 && !hasStarHighlight) {
      highlights.unshift(`⭐ ${stars} GitHub stars`);
    }
    if (forks > 0 && !hasForkHighlight) {
      highlights.unshift(`🔱 ${forks} forks`);
    }

    return {
      ...project,
      stars,
      forks,
      lastUpdated,
      status,
      highlights,
      source: enriched as 'local' | 'enriched'
    };
  }
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [repoMap, setRepoMap] = useState<Map<string, GitHubRepo>>(new Map());

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/dominichubble/repos?sort=updated&per_page=100&type=owner'
        );
        
        const localProjects = projectsData.projects as RawStaticProject[];
        
        if (!response.ok) {
          // Rate limit or other error - format static data with centralized formatter
          console.warn('GitHub API unavailable, using static data');
          const formattedProjects = localProjects.map(project => 
            formatProject('local', project)
          );
          setProjects(formattedProjects);
          setLoading(false);
          return;
        }

        const repos: GitHubRepo[] = await response.json();
        
        // Create a map of repos by name for easy lookup
        const repoMapData = new Map(repos.map(repo => [repo.name, repo]));
        setRepoMap(repoMapData);

        // Format local projects with GitHub enrichment where available
        const formattedLocalProjects = localProjects.map(project => {
          const repoName = project.githubRepo?.split('/')[1];
          const githubData = repoName ? repoMapData.get(repoName) : undefined;
          return formatProject('local', project, githubData);
        });

        // Find GitHub repos with portfolio tags that aren't in local projects
        const localProjectRepoNames = new Set(
          localProjects
            .map(p => p.githubRepo?.split('/')[1])
            .filter(Boolean)
        );

        const portfolioRepos = repos.filter(repo => 
          !localProjectRepoNames.has(repo.name) && (
            repo.topics.includes('portfolio') || 
            repo.topics.includes('featured') ||
            repo.topics.includes('academic') ||
            repo.topics.includes('university') ||
            repo.topics.includes('coursework-project') ||
            repo.stargazers_count > 0
          )
        );

        // Format additional GitHub projects using centralized formatter
        const formattedGitHubProjects = portfolioRepos.map(repo => 
          formatProject('github', repo)
        );
        
        // Combine all formatted projects
        setProjects([...formattedLocalProjects, ...formattedGitHubProjects]);
      } catch (err) {
        // Fall back to formatted static data on any error
        console.warn('Error fetching from GitHub, using static data:', err);
        const formattedProjects = (projectsData.projects as RawStaticProject[]).map(project => 
          formatProject('local', project)
        );
        setProjects(formattedProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error, repoMap };
}
