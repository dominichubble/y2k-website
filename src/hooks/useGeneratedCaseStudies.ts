import { useEffect, useState } from 'react';

interface GeneratedCaseStudy {
  projectId: string;
  hero: {
    tagline: string;
    coverImage?: string;
  };
  overview: {
    problem: string;
    impact: string;
    timeline: string;
    team: string;
  };
  myRole: {
    title: string;
    responsibilities: string[];
  };
  technicalDeep: {
    architecture: {
      description: string;
      diagram?: string;
      components: Array<{
        name: string;
        details: string;
      }>;
    };
    keyFeatures: Array<{
      title: string;
      description: string;
      tech: string[];
    }>;
  };
  challenges: Array<{
    challenge: string;
    description: string;
    solution: string;
    learned: string;
  }>;
  outcomes: {
    metrics: Array<{
      label: string;
      value: string;
      description: string;
    }>;
    awards?: string[];
    testimonials?: Array<{
      quote: string;
      author: string;
    }>;
  };
  reflections: {
    whatWentWell: string[];
    whatCouldImprove: string[];
    keyTakeaways: string[];
  };
  githubLink?: string;
  demoVideo?: string;
  relatedProjects?: string[];
}

interface GitHubRepo {
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
  homepage?: string | null;
}

/**
 * Generates a case study from GitHub repository metadata and README
 */
function generateCaseStudyFromRepo(repo: GitHubRepo): GeneratedCaseStudy {
  const isAcademic = repo.topics.includes('academic') || 
                    repo.topics.includes('university') ||
                    repo.topics.includes('coursework-project');
  
  // Calculate project duration
  const startDate = new Date(repo.created_at);
  const endDate = new Date(repo.pushed_at);
  const months = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)));
  const timeline = `${months} month${months > 1 ? 's' : ''} (${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})`;
  
  // Extract technologies from topics and language
  const technologies = [
    repo.language,
    ...repo.topics.filter(t => !['portfolio', 'featured', 'academic', 'university', 'coursework-project'].includes(t))
  ].filter(Boolean) as string[];

  // Generate problem statement based on description and type
  const problemContext = isAcademic 
    ? "This academic project addressed the challenge of"
    : "This project was built to solve the problem of";
  
  const problem = repo.description 
    ? `${problemContext} ${repo.description.toLowerCase()}.`
    : `${problemContext} creating an effective solution using ${technologies.slice(0, 2).join(' and ')}.`;

  // Generate impact statement
  const impact = repo.stargazers_count > 5
    ? `Gained traction in the open-source community with ${repo.stargazers_count} stars and ${repo.forks_count} forks.`
    : isAcademic
    ? `Completed as part of academic curriculum, demonstrating proficiency in ${technologies.slice(0, 2).join(' and ')}.`
    : `Successfully delivered a working solution using modern development practices.`;

  // Generate responsibilities based on repo characteristics
  const responsibilities = [
    `Designed and implemented the full ${repo.language || 'application'} codebase`,
    `Integrated ${technologies.slice(0, 3).join(', ')} to build core functionality`,
    `Managed version control and deployment workflows`,
  ];

  if (repo.forks_count > 0) {
    responsibilities.push(`Collaborated with the open-source community on improvements`);
  }

  // Generate architecture description
  const archDescription = `Built using ${repo.language || 'modern technologies'} with a focus on ${isAcademic ? 'learning best practices and' : ''} clean, maintainable code.`;

  // Create components based on tech stack
  const components = technologies.slice(0, 3).map(tech => ({
    name: tech,
    details: `Utilized ${tech} for core functionality and features`
  }));

  // Generate key features
  const keyFeatures = [
    {
      title: repo.description || 'Core Functionality',
      description: `Primary feature set implementing ${repo.description || 'the main objectives'}`,
      tech: technologies.slice(0, 3)
    }
  ];

  // Generate challenges
  const challenges = [
    {
      challenge: `Technical Implementation with ${repo.language || 'chosen stack'}`,
      description: `Implementing complex features while maintaining code quality and performance.`,
      solution: `Adopted modular architecture and followed best practices for ${repo.language || 'the technology stack'}.`,
      learned: `Deepened understanding of ${technologies.slice(0, 2).join(' and ')} and software design patterns.`
    }
  ];

  // Generate metrics
  const metrics = [];
  
  if (repo.stargazers_count > 0) {
    metrics.push({
      label: 'GitHub Stars',
      value: repo.stargazers_count.toString(),
      description: 'Community recognition'
    });
  }
  
  if (repo.forks_count > 0) {
    metrics.push({
      label: 'Forks',
      value: repo.forks_count.toString(),
      description: 'Developer engagement'
    });
  }

  const daysSinceUpdate = Math.floor((Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24));
  metrics.push({
    label: 'Status',
    value: daysSinceUpdate < 30 ? 'Active' : 'Maintained',
    description: daysSinceUpdate < 30 ? 'Recently updated' : 'Stable release'
  });

  // Generate reflections
  const reflections = {
    whatWentWell: [
      `Successfully implemented using ${technologies.slice(0, 2).join(' and ')}`,
      repo.stargazers_count > 0 ? 'Received positive community feedback' : 'Delivered a working solution',
      'Maintained clean, well-documented code'
    ],
    whatCouldImprove: [
      'Could add more comprehensive test coverage',
      'Documentation could be more detailed',
      'Additional features could enhance functionality'
    ],
    keyTakeaways: [
      `Gained hands-on experience with ${technologies[0] || 'modern development'}`,
      'Importance of version control and structured development',
      isAcademic ? 'Applied academic concepts to practical implementation' : 'Balanced feature delivery with code quality'
    ]
  };

  return {
    projectId: repo.name,
    hero: {
      tagline: repo.description || `A ${repo.language || 'software'} project`,
      coverImage: undefined
    },
    overview: {
      problem,
      impact,
      timeline,
      team: isAcademic ? 'Individual academic project' : 'Solo developer'
    },
    myRole: {
      title: isAcademic ? 'Student Developer' : 'Full-Stack Developer',
      responsibilities
    },
    technicalDeep: {
      architecture: {
        description: archDescription,
        diagram: undefined,
        components: components.length > 0 ? components : [
          { name: 'Core Application', details: 'Main application logic and features' }
        ]
      },
      keyFeatures
    },
    challenges,
    outcomes: {
      metrics,
      awards: undefined,
      testimonials: undefined
    },
    reflections,
    githubLink: repo.html_url,
    demoVideo: repo.homepage || undefined,
    relatedProjects: undefined
  };
}

export function useGeneratedCaseStudies(repoMap: Map<string, GitHubRepo>) {
  const [generatedStudies, setGeneratedStudies] = useState<Record<string, GeneratedCaseStudy>>({});

  useEffect(() => {
    if (repoMap.size === 0) return;

    const studies: Record<string, GeneratedCaseStudy> = {};
    
    // Generate case studies for all repos in the map
    repoMap.forEach((repo) => {
      const caseStudy = generateCaseStudyFromRepo(repo);
      studies[repo.name] = caseStudy;
    });

    setGeneratedStudies(studies);
  }, [repoMap]);

  return { generatedStudies };
}
