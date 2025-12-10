import { AnimatePresence, motion } from 'framer-motion';
import { Award, CheckCircle, ChevronDown, Github, Play, TrendingUp, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { COLORS } from '../../constants';
import DraggableWindow from './DraggableWindow';

export interface CaseStudy {
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

interface CaseStudyWindowProps {
  title: string;
  caseStudy: CaseStudy;
  onClose: () => void;
}

export default function CaseStudyWindow({ title, caseStudy, onClose }: CaseStudyWindowProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  return (
    <DraggableWindow
      title={`Case Study: ${title}`}
      onClose={onClose}
      initialX={100}
      initialY={50}
      width={900}
      height={700}
      titleColor={COLORS.primary}
    >
      <div className="h-full overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Hero Section */}
        <div className="relative p-8 border-b-2" style={{ borderColor: COLORS.primary }}>
          <h2 className="text-3xl font-black mb-2" style={{ color: COLORS.primary }}>
            {caseStudy.hero.tagline}
          </h2>
          <div className="flex gap-3 mt-4">
            {caseStudy.githubLink && (
              <a
                href={caseStudy.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border-2 text-sm font-mono transition-all hover:scale-105"
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
              >
                <Github size={16} />
                View Code
              </a>
            )}
            {caseStudy.demoVideo && (
              <a
                href={caseStudy.demoVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border-2 text-sm font-mono transition-all hover:scale-105"
                style={{ borderColor: COLORS.accent, color: COLORS.accent }}
              >
                <Play size={16} />
                Watch Demo
              </a>
            )}
          </div>
        </div>

        {/* Overview Section */}
        <CollapsibleSection
          title="Overview"
          icon={<TrendingUp size={20} />}
          isExpanded={expandedSections.has('overview')}
          onToggle={() => toggleSection('overview')}
          color={COLORS.primary}
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-2">THE PROBLEM</h4>
              <p className="text-gray-300 leading-relaxed">{caseStudy.overview.problem}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-2">THE IMPACT</h4>
              <p className="text-gray-300 leading-relaxed">{caseStudy.overview.impact}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-2">TIMELINE</h4>
                <p className="text-gray-300">{caseStudy.overview.timeline}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-2">TEAM</h4>
                <p className="text-gray-300">{caseStudy.overview.team}</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* My Role Section */}
        <CollapsibleSection
          title="My Role & Responsibilities"
          icon={<Users size={20} />}
          isExpanded={expandedSections.has('role')}
          onToggle={() => toggleSection('role')}
          color={COLORS.secondary}
        >
          <div>
            <h4 className="text-lg font-bold mb-3" style={{ color: COLORS.secondary }}>
              {caseStudy.myRole.title}
            </h4>
            <ul className="space-y-2">
              {caseStudy.myRole.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: COLORS.secondary }} />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleSection>

        {/* Technical Deep Dive */}
        <CollapsibleSection
          title="Technical Architecture"
          icon={<Zap size={20} />}
          isExpanded={expandedSections.has('technical')}
          onToggle={() => toggleSection('technical')}
          color={COLORS.primary}
        >
          <div className="space-y-6">
            <div>
              <p className="text-gray-300 mb-4">{caseStudy.technicalDeep.architecture.description}</p>
              {caseStudy.technicalDeep.architecture.diagram && (
                <div className="border-2 p-4 rounded" style={{ borderColor: `${COLORS.primary}30` }}>
                  <img
                    src={caseStudy.technicalDeep.architecture.diagram}
                    alt="Architecture diagram"
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-3">SYSTEM COMPONENTS</h4>
              <div className="space-y-3">
                {caseStudy.technicalDeep.architecture.components.map((comp, i) => (
                  <div key={i} className="border-l-2 pl-4" style={{ borderColor: COLORS.primary }}>
                    <h5 className="font-bold text-white">{comp.name}</h5>
                    <p className="text-sm text-gray-400">{comp.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-3">KEY FEATURES</h4>
              <div className="grid gap-4">
                {caseStudy.technicalDeep.keyFeatures.map((feature, i) => (
                  <div key={i} className="border-2 p-4 rounded" style={{ borderColor: `${COLORS.primary}30` }}>
                    <h5 className="font-bold text-white mb-2">{feature.title}</h5>
                    <p className="text-sm text-gray-300 mb-3">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.tech.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono border"
                          style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Challenges & Solutions */}
        <CollapsibleSection
          title="Challenges & Solutions"
          icon={<Zap size={20} />}
          isExpanded={expandedSections.has('challenges')}
          onToggle={() => toggleSection('challenges')}
          color={COLORS.accent}
        >
          <div className="space-y-6">
            {caseStudy.challenges.map((item, i) => (
              <div key={i} className="border-2 p-4 rounded" style={{ borderColor: `${COLORS.accent}30` }}>
                <h4 className="font-bold text-lg mb-2" style={{ color: COLORS.accent }}>
                  {item.challenge}
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-gray-400">SITUATION:</span>
                    <p className="text-gray-300 mt-1">{item.description}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400">SOLUTION:</span>
                    <p className="text-gray-300 mt-1">{item.solution}</p>
                  </div>
                  <div className="pt-2 border-t" style={{ borderColor: `${COLORS.accent}20` }}>
                    <span className="text-xs font-bold" style={{ color: COLORS.accent }}>💡 KEY LEARNING:</span>
                    <p className="text-gray-300 mt-1 italic">{item.learned}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Outcomes & Metrics */}
        <CollapsibleSection
          title="Outcomes & Impact"
          icon={<Award size={20} />}
          isExpanded={expandedSections.has('outcomes')}
          onToggle={() => toggleSection('outcomes')}
          color={COLORS.primary}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {caseStudy.outcomes.metrics.map((metric, i) => (
                <div key={i} className="border-2 p-4 text-center" style={{ borderColor: `${COLORS.primary}30` }}>
                  <div className="text-3xl font-black mb-1" style={{ color: COLORS.primary }}>
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-white mb-1">{metric.label}</div>
                  <div className="text-xs text-gray-400">{metric.description}</div>
                </div>
              ))}
            </div>

            {caseStudy.outcomes.awards && caseStudy.outcomes.awards.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-3">AWARDS & RECOGNITION</h4>
                <div className="grid gap-2">
                  {caseStudy.outcomes.awards.map((award, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 border-2"
                      style={{ borderColor: `${COLORS.accent}30` }}
                    >
                      <Award size={20} style={{ color: COLORS.accent }} />
                      <span className="text-gray-300">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {caseStudy.outcomes.testimonials && caseStudy.outcomes.testimonials.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-3">TESTIMONIALS</h4>
                <div className="space-y-4">
                  {caseStudy.outcomes.testimonials.map((testimonial, i) => (
                    <div
                      key={i}
                      className="border-l-4 pl-4 py-2"
                      style={{ borderColor: COLORS.secondary }}
                    >
                      <p className="text-gray-300 italic mb-2">"{testimonial.quote}"</p>
                      <p className="text-sm text-gray-400">— {testimonial.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Reflections */}
        <CollapsibleSection
          title="Reflections & Learnings"
          icon={<CheckCircle size={20} />}
          isExpanded={expandedSections.has('reflections')}
          onToggle={() => toggleSection('reflections')}
          color={COLORS.secondary}
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold mb-3" style={{ color: COLORS.primary }}>✅ WHAT WENT WELL</h4>
              <ul className="space-y-2">
                {caseStudy.reflections.whatWentWell.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-3" style={{ color: COLORS.accent }}>🔄 AREAS FOR IMPROVEMENT</h4>
              <ul className="space-y-2">
                {caseStudy.reflections.whatCouldImprove.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-yellow-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-3" style={{ color: COLORS.secondary }}>💡 KEY TAKEAWAYS</h4>
              <ul className="space-y-2">
                {caseStudy.reflections.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span style={{ color: COLORS.secondary }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </DraggableWindow>
  );
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  color: string;
}

function CollapsibleSection({ title, icon, children, isExpanded, onToggle, color }: CollapsibleSectionProps) {
  return (
    <div className="border-b-2" style={{ borderColor: `${color}20` }}>
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span style={{ color }}>{icon}</span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={24} style={{ color }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
