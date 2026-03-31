import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Section } from '../../constants';
import { COLORS, COLORS_RGB } from '../../constants';
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
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(${COLORS_RGB.primary}, 0.28),
    0 16px 44px rgba(0, 0, 0, 0.38),
    0 0 52px rgba(${COLORS_RGB.accent}, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.14)
  `;

  return (
    <div
      id="app-root"
      className={`h-[100dvh] min-h-0 w-full overflow-hidden relative flex p-1.5 sm:p-3 md:p-4 lg:p-6 xl:p-8 y2k-vignette [padding-bottom:max(0.375rem,env(safe-area-inset-bottom))] [padding-left:max(0.375rem,env(safe-area-inset-left))] [padding-right:max(0.375rem,env(safe-area-inset-right))] ${
        isMaximized
          ? 'items-stretch justify-stretch'
          : 'items-center justify-center'
      }`}
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% -18%, rgba(${COLORS_RGB.primary}, 0.13) 0%, transparent 52%),
            radial-gradient(ellipse 80% 58% at 100% 42%, rgba(${COLORS_RGB.accent}, 0.1) 0%, transparent 48%),
            radial-gradient(ellipse 70% 50% at 0% 78%, rgba(${COLORS_RGB.primary}, 0.06) 0%, transparent 42%),
            linear-gradient(165deg, #141517 0%, #1a1c22 34%, #111214 68%, #0d0e11 100%)
          `,
        }}
      />

      {/* Perspective-style grid */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.primary}28 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.primary}18 1px, transparent 1px)
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
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none opacity-30"
        style={{
          background: `linear-gradient(to top, rgba(${COLORS_RGB.primary}, 0.09) 0%, transparent 72%)`,
        }}
      />

      {/* Starfield */}
      <div className="absolute inset-0 opacity-[0.26] pointer-events-none">
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
                boxShadow: `0 0 ${Math.min(star.size + 2, 6)}px ${glow}`,
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
        className="absolute top-[12%] left-[8%] w-72 h-72 rounded-full opacity-[0.11] blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 72%)`,
        }}
      />
      <div
        className="absolute bottom-[15%] right-[6%] w-96 h-96 rounded-full opacity-[0.08] blur-3xl animate-pulse pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${COLORS.accent} 0%, transparent 72%)`,
          animationDuration: '14s',
        }}
      />

      {/* Main window */}
      <div
        className={`relative flex flex-col overflow-hidden transition-all duration-300 min-h-0 ${
          isMaximized
            ? 'h-full min-h-0 w-full max-w-none flex-1 rounded-none sm:rounded-md md:rounded-lg'
            : 'y2k-window-shell rounded-md sm:rounded-lg'
        }`}
        style={{
          background: `linear-gradient(180deg, #1f2126 0%, #191b20 48%, #15161b 100%)`,
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
