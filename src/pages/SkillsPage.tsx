import { motion } from 'framer-motion';
import { Code2, Sparkles, Trophy, Users } from 'lucide-react';
import { COLORS } from '../constants';
import skillsData from '../data/skills.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon: React.ReactNode;
  color: string;
}

function SkillCategory({ title, skills, icon, color }: SkillCategoryProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-black/40 border-2 p-6"
      style={{ borderColor: `${color}40` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="p-2 border-2"
          style={{ borderColor: color, backgroundColor: `${color}10` }}
        >
          {icon}
        </div>
        <h3 
          className="text-xl font-bold font-mono"
          style={{ color }}
        >
          {title}
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="px-3 py-1.5 font-mono text-sm border-2 hover:scale-105 transition-transform cursor-default"
            style={{ 
              borderColor: `${color}60`,
              color: '#fff',
              backgroundColor: `${color}15`
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

interface AchievementProps {
  icon: string;
  description: string;
  index: number;
}

function Achievement({ icon, description, index }: AchievementProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-black/40 border-2 p-4 hover:scale-105 transition-transform"
      style={{ borderColor: `${COLORS.accent}40` }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <p className="text-sm text-gray-300 font-mono flex-1">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function SkillsPage() {
  const { technicalSkills, softSkills, achievements } = skillsData;

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full p-6 md:p-8 lg:p-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Sparkles 
              size={48} 
              style={{ color: COLORS.primary }}
              className="animate-pulse"
            />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black y2k-chrome-text mb-4">
            SKILLS & EXPERTISE
          </h1>
          <p className="text-gray-400 font-mono text-sm md:text-base">
            ✩｡⋆ Technologies, Tools & Achievements ⋆｡✩
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Technical Skills */}
          <SkillCategory
            title="Technical Skills"
            skills={technicalSkills}
            icon={<Code2 size={24} style={{ color: COLORS.primary }} />}
            color={COLORS.primary}
          />

          {/* Soft Skills */}
          <SkillCategory
            title="Soft Skills"
            skills={softSkills}
            icon={<Users size={24} style={{ color: COLORS.secondary }} />}
            color={COLORS.secondary}
          />

          {/* Achievements Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="p-2 border-2"
                style={{ 
                  borderColor: COLORS.accent, 
                  backgroundColor: `${COLORS.accent}10` 
                }}
              >
                <Trophy size={24} style={{ color: COLORS.accent }} />
              </div>
              <h3 
                className="text-xl font-bold font-mono"
                style={{ color: COLORS.accent }}
              >
                Achievements & Highlights
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Achievement
                  key={index}
                  icon={achievement.icon}
                  description={achievement.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats Footer */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
          >
            <div 
              className="text-center p-4 border-2"
              style={{ 
                borderColor: `${COLORS.primary}40`,
                backgroundColor: 'black'
              }}
            >
              <div 
                className="text-3xl font-black font-mono mb-1"
                style={{ color: COLORS.primary }}
              >
                {technicalSkills.length}
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Technical Skills
              </div>
            </div>

            <div 
              className="text-center p-4 border-2"
              style={{ 
                borderColor: `${COLORS.secondary}40`,
                backgroundColor: 'black'
              }}
            >
              <div 
                className="text-3xl font-black font-mono mb-1"
                style={{ color: COLORS.secondary }}
              >
                {softSkills.length}
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Soft Skills
              </div>
            </div>

            <div 
              className="text-center p-4 border-2"
              style={{ 
                borderColor: `${COLORS.accent}40`,
                backgroundColor: 'black'
              }}
            >
              <div 
                className="text-3xl font-black font-mono mb-1"
                style={{ color: COLORS.accent }}
              >
                {achievements.length}
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Achievements
              </div>
            </div>

            <div 
              className="text-center p-4 border-2"
              style={{ 
                borderColor: `${COLORS.primary}40`,
                backgroundColor: 'black'
              }}
            >
              <div 
                className="text-3xl font-black font-mono mb-1"
                style={{ color: COLORS.primary }}
              >
                100%
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Y2K Vibes
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
