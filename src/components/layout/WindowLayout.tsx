import type { ReactNode } from 'react';
import WindowHeader from './WindowHeader';
import WindowNav from './WindowNav';
import WindowFooter from './WindowFooter';
import type { Section } from '../../constants';
import { COLORS } from '../../constants';

interface WindowLayoutProps {
  children: ReactNode;
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function WindowLayout({ 
  children, 
  currentSection, 
  onSectionChange 
}: WindowLayoutProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative y2k-grid flex items-center justify-center p-4 md:p-8">
      {/* Starfield background */}
      <div className="y2k-stars opacity-20"></div>
      
      {/* Decorative shapes */}
      <div 
        className="absolute top-20 left-10 w-60 h-60 opacity-5 animate-pulse"
        style={{ backgroundColor: COLORS.primary }}
      />
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 opacity-5 animate-pulse"
        style={{ backgroundColor: COLORS.secondary }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-40 h-40 opacity-5"
        style={{ backgroundColor: COLORS.accent }}
      />

      {/* Main Window Container */}
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-black/95 border-4 shadow-2xl overflow-hidden"
        style={{ 
          borderColor: COLORS.primary,
          boxShadow: 'none'
        }}
      >
        <WindowHeader />
        <WindowNav 
          currentSection={currentSection} 
          onSectionChange={onSectionChange} 
        />
        
        {/* Content Area */}
        <div className="h-[calc(100%-8rem)] overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        <WindowFooter />
      </div>
    </div>
  );
}
