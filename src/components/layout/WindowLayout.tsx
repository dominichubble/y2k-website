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
    <div id="app-root" className="h-screen w-screen overflow-hidden relative flex items-center justify-center p-2 sm:p-4 lg:p-8" style={{ backgroundColor: '#0f172a' }}>
      {/* Subtle dark gradient background */}
      <div className="absolute inset-0" style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      }}></div>

      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.primary}20 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.primary}20 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridFloat 20s linear infinite'
        }}
      />

      {/* Floating dots pattern */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              backgroundColor: COLORS.primary,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Decorative shapes - soft and matte */}
      <div 
        className="absolute top-20 left-10 w-60 h-60 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: COLORS.primary }}
      />
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
        style={{ backgroundColor: COLORS.primary, animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: COLORS.accent }}
      />

      {/* Main Window Container */}
      <div 
        className={`relative border-2 sm:border-3 shadow-lg transition-all duration-300 flex flex-col rounded-lg ${
          isMaximized ? 'w-full h-full max-w-none' : 'w-full max-w-[95vw] sm:max-w-3xl lg:max-w-4xl h-[95vh] sm:h-[90vh]'
        }`}
        style={{ 
          backgroundColor: '#1e293b',
          borderColor: COLORS.primary,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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
        
        {/* Content Area - flex-1 makes it take remaining space */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        <WindowFooter />
      </div>
    </div>
  );
}
