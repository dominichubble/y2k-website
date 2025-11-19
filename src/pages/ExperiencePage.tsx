import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { COLORS } from '../constants';
import experienceData from '../data/experience.json';
import DetailWindow from '../components/ui/DetailWindow';

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

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-12 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black y2k-chrome-text mb-3">
            EXPERIENCE
          </h1>
          <div 
            className="h-1 w-24 mx-auto"
            style={{ backgroundColor: COLORS.primary }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: `${COLORS.primary}30` }}
          />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-4 md:left-1/2 w-3 h-3 -ml-1.5 border-2"
                  style={{ 
                    backgroundColor: COLORS.primary,
                    borderColor: COLORS.primary
                  }}
                />

                {/* Spacer for desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content card */}
                <div className="ml-12 md:ml-0 md:w-1/2">
                  <button
                    onClick={() => setSelectedExperience(exp as Experience)}
                    className="w-full text-left bg-black/40 border-2 p-6 transition-all hover:bg-black/60 cursor-pointer"
                    style={{ borderColor: `${COLORS.primary}30` }}
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 
                          className="text-lg font-bold"
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
                          👑 Leadership Role
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
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
                    title: '👑 LEADERSHIP ROLE',
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
