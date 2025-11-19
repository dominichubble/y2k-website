import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, Briefcase, GraduationCap, Star, GitFork } from 'lucide-react';
import { useState } from 'react';
import { COLORS } from '../constants';
import { useGitHubProjects } from '../hooks/useGitHubProjects';

type FilterType = 'all' | 'Professional' | 'Academic';

interface ProjectCardProps {
  project: {
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
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusColor = (status: string) => {
    return status === 'In Progress' ? COLORS.accent : COLORS.secondary;
  };

  return (
    <div
      className="bg-black/40 border-2 transition-all"
      style={{ borderColor: isExpanded ? COLORS.primary : `${COLORS.primary}30` }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover:bg-black/60 transition-all"
      >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 
            className="text-xl font-bold mb-2"
            style={{ color: COLORS.primary }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span 
              className="px-2 py-1 text-xs font-mono border"
              style={{ 
                borderColor: getStatusColor(project.status),
                color: getStatusColor(project.status),
                backgroundColor: `${getStatusColor(project.status)}10`
              }}
            >
              {project.status}
            </span>
            <span 
              className="px-2 py-1 text-xs font-mono border"
              style={{ 
                borderColor: `${COLORS.primary}60`,
                color: '#9ca3af',
                backgroundColor: `${COLORS.primary}10`
              }}
            >
              {project.type}
            </span>
            {project.stars !== undefined && project.stars > 0 && (
              <span 
                className="px-2 py-1 text-xs font-mono border flex items-center gap-1"
                style={{ 
                  borderColor: `${COLORS.accent}60`,
                  color: COLORS.accent,
                  backgroundColor: `${COLORS.accent}10`
                }}
              >
                <Star size={12} fill={COLORS.accent} />
                {project.stars}
              </span>
            )}
            {project.forks !== undefined && project.forks > 0 && (
              <span 
                className="px-2 py-1 text-xs font-mono border flex items-center gap-1"
                style={{ 
                  borderColor: `${COLORS.secondary}60`,
                  color: COLORS.secondary,
                  backgroundColor: `${COLORS.secondary}10`
                }}
              >
                <GitFork size={12} />
                {project.forks}
              </span>
            )}
          </div>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border-2 transition-all hover:scale-110"
            style={{ 
              borderColor: COLORS.primary,
              color: COLORS.primary 
            }}
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      {/* Description - Always visible preview */}
      <p className="text-gray-300 text-sm leading-relaxed">
        {isExpanded ? project.description : `${project.description.slice(0, 100)}${project.description.length > 100 ? '...' : ''}`}
      </p>
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4">
              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono text-gray-400 mb-2">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono border"
                      style={{ 
                        borderColor: `${COLORS.secondary}40`,
                        color: COLORS.secondary,
                        backgroundColor: `${COLORS.secondary}10`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-mono text-gray-400 mb-2">KEY HIGHLIGHTS</h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li 
                      key={i}
                      className="text-xs text-gray-300 flex items-start gap-2"
                    >
                      <span style={{ color: COLORS.accent }}>▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* GitHub Stats Footer */}
              {project.lastUpdated && (
                <div className="pt-4 border-t" style={{ borderColor: `${COLORS.primary}20` }}>
                  <p className="text-xs text-gray-500 font-mono">
                    Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectsPage() {
  const { projects, loading, error } = useGitHubProjects();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: COLORS.primary }}></div>
          <p className="mt-4 text-gray-400 font-mono">Loading projects from GitHub...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-mono">Error: {error}</p>
          <p className="mt-2 text-gray-400 text-sm">Failed to load projects from GitHub</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-12 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black y2k-chrome-text mb-3">
            PROJECTS
          </h1>
          <div 
            className="h-1 w-24 mx-auto"
            style={{ backgroundColor: COLORS.primary }}
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <button
            onClick={() => setFilter('all')}
            className="px-4 py-2 font-mono text-sm border-2 transition-all"
            style={{
              borderColor: filter === 'all' ? COLORS.primary : `${COLORS.primary}40`,
              backgroundColor: filter === 'all' ? `${COLORS.primary}20` : 'transparent',
              color: filter === 'all' ? COLORS.primary : '#9ca3af'
            }}
          >
            <span className="flex items-center gap-2">
              <Code2 size={16} />
              All Projects ({projects.length})
            </span>
          </button>

          <button
            onClick={() => setFilter('Professional')}
            className="px-4 py-2 font-mono text-sm border-2 transition-all"
            style={{
              borderColor: filter === 'Professional' ? COLORS.primary : `${COLORS.primary}40`,
              backgroundColor: filter === 'Professional' ? `${COLORS.primary}20` : 'transparent',
              color: filter === 'Professional' ? COLORS.primary : '#9ca3af'
            }}
          >
            <span className="flex items-center gap-2">
              <Briefcase size={16} />
              Professional ({projects.filter(p => p.type === 'Professional').length})
            </span>
          </button>

          <button
            onClick={() => setFilter('Academic')}
            className="px-4 py-2 font-mono text-sm border-2 transition-all"
            style={{
              borderColor: filter === 'Academic' ? COLORS.primary : `${COLORS.primary}40`,
              backgroundColor: filter === 'Academic' ? `${COLORS.primary}20` : 'transparent',
              color: filter === 'Academic' ? COLORS.primary : '#9ca3af'
            }}
          >
            <span className="flex items-center gap-2">
              <GraduationCap size={16} />
              Academic ({projects.filter(p => p.type === 'Academic').length})
            </span>
          </button>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 font-mono">No projects found for this filter.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
