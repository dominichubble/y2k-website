import { motion } from 'framer-motion';
import { BookOpen, Briefcase, FolderGit2, Home, User, Zap } from 'lucide-react';
import type { Section } from '../../constants';
import { COLORS, NAV_ITEMS } from '../../constants';

interface WindowNavProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

const iconMap: Record<Section, React.ComponentType<{ size?: number; className?: string }>> = {
  home: Home,
  about: User,
  projects: FolderGit2,
  experience: Briefcase,
  skills: Zap,
  blog: BookOpen,
};

export default function WindowNav({ currentSection, onSectionChange }: WindowNavProps) {
  return (
    <nav
      className="border-b px-4 py-4 relative font-y2k-mono"
      style={{
        borderBottomWidth: '2px',
        borderBottomColor: `${COLORS.primary}55`,
        background: `linear-gradient(180deg, #252030 0%, #1e1c28 100%)`,
        boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
      }}
    >
      {/* Subtle pattern background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.primary}40 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.primary}40 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="flex gap-1 justify-center items-center flex-wrap relative z-10">
        {NAV_ITEMS.map((item, index) => {
          const isActive = currentSection === item.id;
          const Icon = iconMap[item.id];
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, type: "spring" }}
              whileTap={{ scale: 0.96 }}
              className="relative group"
            >
              <div
                className={`relative px-2 sm:px-4 md:px-7 py-2 sm:py-2.5 md:py-3 font-mono text-xs md:text-sm transition-all duration-200 flex items-center gap-1.5 sm:gap-2.5 ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                }}
              >
                {/* Background layer */}
                <div
                  className="absolute inset-0 transition-all duration-200"
                  style={{
                    clipPath:
                      'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                    background: isActive
                      ? `linear-gradient(180deg, rgba(250,248,255,0.9) 0%, rgba(232,236,240,0.75) 100%)`
                      : 'transparent',
                    border: `1px solid ${
                      isActive ? `${COLORS.primary}50` : `${COLORS.primary}35`
                    }`,
                    boxShadow: isActive
                      ? `0 2px 14px rgba(23, 21, 31, 0.12), inset 0 1px 0 rgba(255,255,255,0.65)`
                      : undefined,
                  }}
                />

                {/* Hover effect */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-200 ${
                    isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                    backgroundColor: `${COLORS.primary}12`,
                    border: `1px solid ${COLORS.primary}45`,
                  }}
                />

                {/* Content */}
                <span
                  style={{
                    color: isActive ? '#2d323c' : COLORS.primary,
                  }}
                >
                  <Icon 
                    size={16} 
                    className="relative z-10 transition-all duration-200"
                  />
                </span>
                <span
                  className={`relative z-10 hidden sm:inline uppercase tracking-wider transition-all duration-200`}
                  style={{ color: isActive ? '#2d323c' : COLORS.primary }}
                >
                  {item.label}
                </span>

                {/* Active corner accent */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute top-0 left-0 w-1.5 h-1.5 opacity-70"
                      style={{ backgroundColor: COLORS.accent }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15 }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-1.5 h-1.5 opacity-70"
                      style={{ backgroundColor: COLORS.accent }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15 }}
                    />
                  </>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
