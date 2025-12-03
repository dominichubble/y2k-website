import { motion } from 'framer-motion';
import { Briefcase, Calendar, ExternalLink, MapPin } from 'lucide-react';
import { useState } from 'react';
import DetailWindow from '../components/ui/DetailWindow';
import { COLORS } from '../constants';
import experienceData from '../data/experience.json';

interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location: string;
  workType: string;
  description: string;
  skills: string[];
  color: string;
  isLeadership?: boolean;
}

export default function ExperiencePage() {
  const { experiences } = experienceData;
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Extract years from experiences
  const getYear = (dateStr: string) => {
    const match = dateStr.match(/\d{4}/);
    return match ? match[0] : '';
  };

  // Parse date for sorting (handle "Present" as current date)
  const parseDate = (dateStr: string) => {
    if (dateStr === 'Present') return new Date();
    const [month, year] = dateStr.split(' ');
    const monthMap: { [key: string]: number } = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    return new Date(parseInt(year), monthMap[month] || 0);
  };

  // Sort experiences by start date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => 
    parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime()
  );

  // Track year changes and add milestones
  let lastYear: string | null = null;
  const milestones: { [key: string]: string } = {
    '2026': 'Graduating from Loughborough University',
    '2023': 'Started Computer Science Degree'
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black y2k-chrome-text mb-3 px-2">
            EXPERIENCE TIMELINE
          </h1>
          <div 
            className="h-1 w-24 mx-auto"
            style={{ backgroundColor: COLORS.primary }}
          />
          <p className="text-gray-400 text-xs sm:text-sm mt-4 font-mono px-2">
            {sortedExperiences.length} Professional Experiences • 2020 - Present
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div 
            className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: `${COLORS.primary}30` }}
          />

          {/* Experience cards */}
          <div className="space-y-8 sm:space-y-12">
            {sortedExperiences.map((exp, index) => {
              const startYear = getYear(exp.startDate);
              const yearChanged = lastYear !== startYear;
              lastYear = startYear;
              
              return (
                <div key={exp.id}>
                  {/* Year divider and milestone */}
                  {yearChanged && index > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative mb-12"
                    >
                      <div className="flex items-center justify-center">
                        <div 
                          className="relative px-3 sm:px-6 py-2 sm:py-3 border sm:border-2 bg-black/80 backdrop-blur-sm"
                          style={{ 
                            borderColor: milestones[startYear] ? COLORS.accent : COLORS.secondary,
                            boxShadow: milestones[startYear] 
                              ? `0 0 20px ${COLORS.accent}40`
                              : `0 0 20px ${COLORS.secondary}40`
                          }}
                        >
                          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                            <span 
                              className="text-xl sm:text-2xl font-black font-mono"
                              style={{ color: milestones[startYear] ? COLORS.accent : COLORS.secondary }}
                            >
                              {startYear}
                            </span>
                            {milestones[startYear] && (
                              <span className="text-gray-300 text-xs sm:text-sm font-medium text-center">
                                {milestones[startYear]}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`relative flex items-start gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >


                    {/* Timeline dot */}
                    <div 
                      className="absolute left-3 sm:left-4 md:left-1/2 w-2.5 sm:w-3 h-2.5 sm:h-3 -ml-1.5 border sm:border-2 animate-pulse"
                      style={{ 
                        backgroundColor: COLORS.primary,
                        borderColor: COLORS.primary,
                        boxShadow: `0 0 10px ${COLORS.primary}`
                      }}
                    />

                    {/* Spacer for desktop */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Content card */}
                    <div className="ml-12 md:ml-0 md:w-1/2">
                      <button
                        onClick={() => setSelectedExperience(exp as Experience)}
                        className="w-full text-left bg-black/40 border-2 p-6 transition-all hover:bg-black/60 hover:border-opacity-60 cursor-pointer group"
                        style={{ borderColor: `${COLORS.primary}30` }}
                      >
                        {/* Current badge for present roles */}
                        {exp.endDate === 'Present' && (
                          <div className="mb-3">
                            <span 
                              className="px-2 py-1 text-xs font-mono font-bold border animate-pulse"
                              style={{ 
                                borderColor: COLORS.accent,
                                color: COLORS.accent,
                                backgroundColor: `${COLORS.accent}10`
                              }}
                            >
                              CURRENT
                            </span>
                          </div>
                        )}

                        {/* Header */}
                        <div className="mb-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 
                              className="text-lg font-bold group-hover:underline"
                              style={{ color: COLORS.primary }}
                            >
                              {exp.title}
                            </h3>
                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 border transition-all hover:scale-110"
                            style={{ 
                              borderColor: COLORS.primary,
                              color: COLORS.primary 
                            }}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <p className="text-white font-semibold mb-1">{exp.company}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Briefcase size={12} />
                          {exp.employmentType}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {exp.startDate} - {exp.endDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {exp.workType}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {/* Skills */}
                    {exp.skills.length > 0 && (
                      <div>
                        <h4 className="text-xs font-mono text-gray-400 mb-2">SKILLS</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs font-mono border"
                              style={{ 
                                borderColor: `${COLORS.secondary}40`,
                                color: COLORS.secondary,
                                backgroundColor: `${COLORS.secondary}10`
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Leadership Badge */}
                    {exp.isLeadership && (
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: `${COLORS.primary}20` }}>
                        <span 
                          className="px-3 py-1 text-xs font-mono border inline-block"
                          style={{ 
                            borderColor: COLORS.accent,
                            color: COLORS.accent,
                            backgroundColor: `${COLORS.accent}10`
                          }}
                        >
                          LEADERSHIP ROLE
                        </span>
                      </div>
                    )}
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            })}


          </div>
        </div>

        {/* Draggable Detail Window */}
        {selectedExperience && (
          <DetailWindow
            title={selectedExperience.title}
            subtitle={selectedExperience.company}
            link={selectedExperience.companyUrl}
            onClose={() => setSelectedExperience(null)}
            initialX={200}
            initialY={150}
            width={600}
            height={500}
            sections={[
              {
                title: 'EMPLOYMENT DETAILS',
                items: [
                  { label: 'Employment Type', value: selectedExperience.employmentType },
                  { label: 'Duration', value: `${selectedExperience.startDate} - ${selectedExperience.endDate}` },
                  { label: 'Location', value: selectedExperience.location },
                  { label: 'Work Type', value: selectedExperience.workType }
                ]
              },
              ...(selectedExperience.description 
                ? [{
                    title: 'DESCRIPTION',
                    content: selectedExperience.description
                  }]
                : []
              ),
              ...(selectedExperience.skills.length > 0 
                ? [{
                    title: 'SKILLS & TECHNOLOGIES',
                    tags: selectedExperience.skills
                  }]
                : []
              ),
              ...(selectedExperience.isLeadership 
                ? [{
                    title: 'LEADERSHIP ROLE',
                    content: 'Managed team and project deliverables'
                  }]
                : []
              )
            ]}
          />
        )}
      </div>
    </div>
  );
}
