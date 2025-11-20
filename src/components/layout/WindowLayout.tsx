import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Section } from '../../constants';
import { COLORS } from '../../constants';
import WindowFooter from './WindowFooter';
import WindowHeader from './WindowHeader';
import WindowNav from './WindowNav';

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
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = () => {
    if (confirm('Are you sure you want to close this window? This will exit the portfolio.')) {
      window.close();
      // If window.close() doesn't work (blocked by browser), redirect to a blank page
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 100);
    }
  };

  return (
    <div id="app-root" className="h-screen w-screen bg-black overflow-hidden relative y2k-grid flex items-center justify-center p-4 md:p-8">
      {/* Starfield background */}
      <div className="y2k-stars opacity-20"></div>
      
      {/* Decorative shapes - subtle and classy */}
      <div 
        className="absolute top-20 left-10 w-60 h-60 rounded-full opacity-5 animate-pulse blur-3xl"
        style={{ backgroundColor: COLORS.primary }}
      />
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-5 animate-pulse blur-3xl"
        style={{ backgroundColor: COLORS.primary }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: COLORS.accent }}
      />

      {/* Main Window Container */}
      <div 
        className={`relative bg-black/95 border-4 shadow-2xl overflow-hidden transition-all duration-300 ${
          isMaximized ? 'w-full h-full max-w-none' : 'w-full max-w-5xl h-[90vh]'
        }`}
        style={{ 
          borderColor: COLORS.primary,
          boxShadow: 'none'
        }}
      >
        <WindowHeader 
          onMaximize={() => setIsMaximized(!isMaximized)}
          onClose={handleClose}
          isMaximized={isMaximized}
        />
        
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
