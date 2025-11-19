import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Rocket, Users, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { COLORS } from '../constants';
import skillsData from '../data/skills.json';
import profileData from '../data/profile.json';

export default function AboutPage() {
  const { technicalSkills, softSkills, achievements } = skillsData;
  const { about } = profileData;
  const [openSection, setOpenSection] = useState<string | null>('story');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-12 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black y2k-chrome-text mb-3">
            ABOUT ME
          </h1>
          <div 
            className="h-1 w-24 mx-auto rounded-full"
            style={{ backgroundColor: COLORS.primary }}
          />
        </motion.div>

        {/* My Story - Clickable Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4"
        >
          <button
            onClick={() => toggleSection('story')}
            className="w-full bg-black/40 border-2 rounded-xl p-4 transition-all hover:bg-black/60"
            style={{ borderColor: openSection === 'story' ? COLORS.primary : `${COLORS.primary}30` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={24} style={{ color: COLORS.primary }} />
                <h2 className="text-xl md:text-2xl font-bold text-white">My Story</h2>
              </div>
              <motion.div
                animate={{ rotate: openSection === 'story' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={24} style={{ color: COLORS.primary }} />
              </motion.div>
            </div>
          </button>
          
          <AnimatePresence>
            {openSection === 'story' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-4 text-gray-300 leading-relaxed">
                  {about.story.map((paragraph, index) => (
                    <p 
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace('West Midlands', `<span style="color: ${COLORS.primary}">West Midlands</span>`)
                          .replace('continuous learning', `<span style="color: ${COLORS.secondary}">continuous learning</span>`)
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Beyond Code - Clickable Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-4"
        >
          <button
            onClick={() => toggleSection('hobbies')}
            className="w-full bg-black/40 border-2 rounded-xl p-4 transition-all hover:bg-black/60"
            style={{ borderColor: openSection === 'hobbies' ? COLORS.secondary : `${COLORS.secondary}30` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.secondary }}>Beyond Code</h2>
              </div>
              <motion.div
                animate={{ rotate: openSection === 'hobbies' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={24} style={{ color: COLORS.secondary }} />
              </motion.div>
            </div>
          </button>
          
          <AnimatePresence>
            {openSection === 'hobbies' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-3 text-gray-300">
                  {about.hobbies.map((hobby, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg" 
                      style={{ backgroundColor: `${COLORS.secondary}10` }}
                    >
                      <span className="text-2xl">{hobby.icon}</span>
                      <p>{hobby.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Current Interests - Clickable Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-4"
        >
          <button
            onClick={() => toggleSection('interests')}
            className="w-full bg-black/40 border-2 rounded-xl p-4 transition-all hover:bg-black/60"
            style={{ borderColor: openSection === 'interests' ? COLORS.accent : `${COLORS.accent}30` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.accent }}>Current Interests</h2>
              </div>
              <motion.div
                animate={{ rotate: openSection === 'interests' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={24} style={{ color: COLORS.accent }} />
              </motion.div>
            </div>
          </button>
          
          <AnimatePresence>
            {openSection === 'interests' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-3 text-gray-300">
                  {about.interests.map((interest, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg" 
                      style={{ backgroundColor: `${COLORS.accent}10` }}
                    >
                      <span className="text-2xl">{interest.icon}</span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: interest.description.replace(
                            interest.title,
                            `<span style="color: ${COLORS.accent}">${interest.title}</span>`
                          )
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <motion.button
            onClick={() => toggleSection('technical')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="bg-black/40 border-2 rounded-xl p-6 text-center transition-all"
            style={{ borderColor: openSection === 'technical' ? COLORS.primary : `${COLORS.primary}30` }}
          >
            <Code2 size={32} className="mx-auto mb-2" style={{ color: COLORS.primary }} />
            <div className="text-3xl font-black mb-1" style={{ color: COLORS.primary }}>
              {technicalSkills.length}+
            </div>
            <div className="text-sm text-gray-400 font-mono">Technical Skills</div>
          </motion.button>

          <motion.button
            onClick={() => toggleSection('soft')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="bg-black/40 border-2 rounded-xl p-6 text-center transition-all"
            style={{ borderColor: openSection === 'soft' ? COLORS.secondary : `${COLORS.secondary}30` }}
          >
            <Users size={32} className="mx-auto mb-2" style={{ color: COLORS.secondary }} />
            <div className="text-3xl font-black mb-1" style={{ color: COLORS.secondary }}>
              {softSkills.length}+
            </div>
            <div className="text-sm text-gray-400 font-mono">Soft Skills</div>
          </motion.button>

          <motion.button
            onClick={() => toggleSection('achievements')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="bg-black/40 border-2 rounded-xl p-6 text-center transition-all"
            style={{ borderColor: openSection === 'achievements' ? COLORS.accent : `${COLORS.accent}30` }}
          >
            <Rocket size={32} className="mx-auto mb-2" style={{ color: COLORS.accent }} />
            <div className="text-3xl font-black mb-1" style={{ color: COLORS.accent }}>
              {achievements.length}+
            </div>
            <div className="text-sm text-gray-400 font-mono">Key Achievements</div>
          </motion.button>
        </div>

        {/* Expandable Skills Sections */}
        <AnimatePresence>
          {openSection === 'technical' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-black/40 border-2 rounded-xl p-6" style={{ borderColor: `${COLORS.primary}30` }}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                  <span>💻</span> Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 rounded-lg text-sm font-mono border-2 transition-all cursor-default"
                      style={{ 
                        borderColor: `${COLORS.primary}50`,
                        color: COLORS.primary,
                        backgroundColor: `${COLORS.primary}10`
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {openSection === 'soft' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-black/40 border-2 rounded-xl p-6" style={{ borderColor: `${COLORS.secondary}30` }}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.secondary }}>
                  <span>🤝</span> Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 rounded-lg text-sm font-mono border-2 transition-all cursor-default"
                      style={{ 
                        borderColor: `${COLORS.secondary}50`,
                        color: COLORS.secondary,
                        backgroundColor: `${COLORS.secondary}10`
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {openSection === 'achievements' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-black/40 border-2 rounded-xl p-6" style={{ borderColor: `${COLORS.accent}30` }}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.accent }}>
                  <span>🏆</span> Key Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 p-3 rounded-lg transition-all"
                      style={{ backgroundColor: `${COLORS.accent}10` }}
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <p className="text-gray-300 text-sm flex-1">
                        {achievement.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
