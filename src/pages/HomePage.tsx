import { motion } from 'framer-motion';
import { Briefcase, Github, GraduationCap, Linkedin, Mail, MapPin } from 'lucide-react';
import Toast from '../components/ui/Toast';
import { COLORS } from '../constants';
import profileData from '../data/profile.json';
import { useToast } from '../hooks/useToast';

export default function HomePage() {
  const { personalInfo } = profileData;
  const { isVisible, message, showToast, hideToast } = useToast();

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      showToast('Email copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy email');
    }
  };

  return (
    <div className="h-full flex items-center">
      <div className="w-full p-4 sm:p-6 md:p-12 max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="flex items-center justify-center relative">
        <div className="relative z-10 text-center w-full">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-4 sm:mb-6 inline-block"
          >
            <div className="relative">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                loading="eager"
                className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 border-2 sm:border-4 object-cover mx-auto rounded-sm"
                style={{ borderColor: COLORS.primary }}
                onError={(e) => {
                  console.error('Image failed to load:', personalInfo.profileImage);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 y2k-chrome-text leading-tight"
          >
            {personalInfo.name.toUpperCase()}
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <h2 
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 px-2 leading-tight"
              style={{ color: COLORS.primary }}
            >
              {personalInfo.title}
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base text-gray-400 flex-wrap px-2">
              <span className="flex items-center gap-1">
                <Briefcase size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-words">{personalInfo.currentRole}</span>
              </span>
              <span style={{ color: COLORS.secondary }} className="hidden xs:inline">•</span>
              <span className="break-words text-center">{personalInfo.currentCompany}</span>
            </div>
          </motion.div>

          {/* Status Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm px-2"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 px-2 sm:px-3 py-1.5 sm:py-2 border sm:border-2" style={{ borderColor: COLORS.primary }}>
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: COLORS.accent }} />
              <span className="text-gray-300 text-xs sm:text-sm whitespace-nowrap">{personalInfo.availability}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 px-2 sm:px-3 py-1.5 sm:py-2 border sm:border-2" style={{ borderColor: COLORS.secondary }}>
              <MapPin size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" style={{ color: COLORS.secondary }} />
              <span className="text-gray-300 text-xs sm:text-sm whitespace-nowrap">{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 px-2 sm:px-3 py-1.5 sm:py-2 border sm:border-2" style={{ borderColor: COLORS.primary }}>
              <GraduationCap size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" style={{ color: COLORS.primary }} />
              <span className="text-gray-300 text-xs sm:text-sm whitespace-nowrap">{personalInfo.university}</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2 mb-8"
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs sm:text-sm transition-all duration-300 border sm:border-2"
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
              <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs sm:text-sm transition-all duration-300 border sm:border-2"
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
              <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>LinkedIn</span>
            </motion.a>

            <motion.button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs sm:text-sm transition-all duration-300 border sm:border-2 cursor-pointer"
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
              <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Copy Email</span>
            </motion.button>
          </motion.div>
        </div>
        </div>
      </div>

      <Toast 
        message={message}
        isVisible={isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
