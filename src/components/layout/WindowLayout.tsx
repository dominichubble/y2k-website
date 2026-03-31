import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Section } from '../../constants';
import { COLORS } from '../../constants';
import WindowFooter from './WindowFooter';
import WindowHeader from './WindowHeader';
import WindowNav from './WindowNav';

/** Fixed star positions — avoids layout jump on re-render from Math.random(). */
const ATMOSPHERE_STARS = [
  { left: '7%', top: '11%', size: 3, duration: 21, delay: 0 },
  { left: '18%', top: '24%', size: 2, duration: 17, delay: 0.8 },
  { left: '31%', top: '8%', size: 2, duration: 24, delay: 1.5 },
  { left: '44%', top: '19%', size: 3, duration: 19, delay: 0.3 },
  { left: '56%', top: '33%', size: 2, duration: 22, delay: 2.1 },
  { left: '68%', top: '14%', size: 2, duration: 18, delay: 0.9 },
  { left: '79%', top: '27%', size: 3, duration: 20, delay: 1.2 },
  { left: '91%', top: '9%', size: 2, duration: 23, delay: 0.5 },
  { left: '12%', top: '56%', size: 2, duration: 18, delay: 1.8 },
  { left: '25%', top: '71%', size: 3, duration: 21, delay: 0.2 },
  { left: '38%', top: '48%', size: 2, duration: 19, delay: 2.4 },
  { left: '52%', top: '63%', size: 2, duration: 24, delay: 0.7 },
  { left: '63%', top: '78%', size: 3, duration: 17, delay: 1.1 },
  { left: '76%', top: '52%', size: 2, duration: 20, delay: 0.4 },
  { left: '88%', top: '67%', size: 2, duration: 22, delay: 1.9 },
  { left: '15%', top: '88%', size: 2, duration: 19, delay: 0.6 },
  { left: '48%', top: '91%', size: 3, duration: 21, delay: 1.3 },
  { left: '72%', top: '89%', size: 2, duration: 18, delay: 2.0 },
] as const;

interface WindowLayoutProps {
  children: ReactNode;
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function WindowLayout({
  children,
  currentSection,
  onSectionChange,
}: WindowLayoutProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = () => {
    if (
      confirm(
        'Are you sure you want to close this window? This will exit the portfolio.'
      )
    ) {
      window.close();
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 100);
    }
  };

  const windowChromeShadow = `
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 0 0 2px rgba(0, 217, 255, 0.45),
    0 0 48px rgba(0, 217, 255, 0.18),
    0 0 80px rgba(255, 46, 196, 0.08),
    0 24px 64px rgba(0, 0, 0, 0.75),
    inset 0 1px 0 rgba(255, 255, 255, 0.14)
  `;

  return (
    <div
      id="app-root"
      className="h-screen w-screen overflow-hidden relative flex items-center justify-center p-2 sm:p-4 lg:p-8 y2k-vignette"
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% -20%, rgba(0, 217, 255, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 100% 50%, rgba(255, 46, 196, 0.08) 0%, transparent 45%),
            radial-gradient(ellipse 70% 50% at 0% 80%, rgba(0, 217, 255, 0.06) 0%, transparent 40%),
            linear-gradient(165deg, #0a0418 0%, #12081f 35%, #050a12 70%, #020408 100%)
          `,
        }}
      />

      {/* Perspective-style grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.primary}35 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.primary}22 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          animation: 'gridFloat 24s linear infinite',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
        }}
      />

      {/* Horizon glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none opacity-40"
        style={{
          background:
            'linear-gradient(to top, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Starfield */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {ATMOSPHERE_STARS.map((star, i) => {
          const glow = i % 4 === 0 ? COLORS.accent : COLORS.primary;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: star.size,
                height: star.size,
                backgroundColor: glow,
                boxShadow: `0 0 ${star.size + 3}px ${glow}`,
                left: star.left,
                top: star.top,
                animation: `float ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Soft orbs */}
      <div
        className="absolute top-[12%] left-[8%] w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-[15%] right-[6%] w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${COLORS.accent} 0%, transparent 70%)`,
          animationDuration: '10s',
        }}
      />

      {/* Main window */}
      <div
        className={`relative flex flex-col rounded-lg overflow-hidden transition-all duration-300 ${
          isMaximized
            ? 'w-full h-full max-w-none'
            : 'w-full max-w-[95vw] sm:max-w-3xl lg:max-w-4xl h-[95vh] sm:h-[90vh]'
        }`}
        style={{
          background: `linear-gradient(180deg, #161c28 0%, #0e1218 45%, #0a0d12 100%)`,
          borderColor: COLORS.primary,
          borderWidth: 2,
          borderStyle: 'solid',
          boxShadow: windowChromeShadow,
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

        <div className="flex-1 flex flex-col min-h-0 relative">
          <div
            className="y2k-scanlines absolute inset-0 z-20"
            aria-hidden
          />
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
            {children}
          </div>
        </div>

        <WindowFooter />
      </div>
    </div>
  );
}
