import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Briefcase } from 'lucide-react';
import { COLORS } from '../constants';
import profileData from '../data/profile.json';

export default function HomePage() {
  const { personalInfo } = profileData;

  return (
    <div className="h-full overflow-hidden">
      {/* Hero Section */}
      <div className="h-full flex items-center justify-center p-6 md:p-12 relative">
        {/* Animated Background Grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${COLORS.primary} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.secondary} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative z-10 text-center max-w-3xl">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-6 inline-block"
          >
            <div className="relative">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="relative w-32 h-32 md:w-40 md:h-40 border-4 object-cover mx-auto"
                style={{ borderColor: COLORS.primary }}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black mb-4 y2k-chrome-text"
          >
            {personalInfo.name.toUpperCase()}
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-6"
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: COLORS.primary }}
            >
              {personalInfo.title}
            </h2>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-400 flex-wrap">
              <span className="flex items-center gap-1">
                <Briefcase size={16} />
                {personalInfo.currentRole}
              </span>
              <span style={{ color: COLORS.secondary }}>•</span>
              <span>{personalInfo.currentCompany}</span>
            </div>
          </motion.div>

          {/* Status Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-8 text-xs md:text-sm"
          >
            <div className="flex items-center gap-2 bg-black/50 px-3 py-2 border-2" style={{ borderColor: COLORS.primary }}>
              <span className="w-2 h-2 animate-pulse" style={{ backgroundColor: COLORS.accent }} />
              <span className="text-gray-300">{personalInfo.availability}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 px-3 py-2 border-2" style={{ borderColor: COLORS.secondary }}>
              <MapPin size={14} style={{ color: COLORS.secondary }} />
              <span className="text-gray-300">{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 px-3 py-2 border-2" style={{ borderColor: COLORS.primary }}>
              <span className="text-gray-300">🎓 {personalInfo.university}</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 font-mono text-sm transition-all duration-300 border-2"
              style={{ 
                borderColor: COLORS.primary,
                color: COLORS.primary 
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: COLORS.primary,
                color: '#000'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 font-mono text-sm transition-all duration-300 border-2"
              style={{ 
                borderColor: COLORS.secondary,
                color: COLORS.secondary 
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: COLORS.secondary,
                color: '#000'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-4 py-2 font-mono text-sm transition-all duration-300 border-2"
              style={{ 
                borderColor: COLORS.accent,
                color: COLORS.accent 
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: COLORS.accent,
                color: '#000'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={18} />
              <span>Email</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
