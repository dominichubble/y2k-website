import { useEffect, useRef, useState } from 'react';
import { COLORS } from '../../constants';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

/** Soft chrome sparkles — only theme steel / pearl / periwinkle */
const TRAIL_PALETTE = [
  COLORS.accent,
  COLORS.primary,
  COLORS.secondary,
  `${COLORS.primary}e6`,
  `${COLORS.accent}cc`,
  `${COLORS.secondary}dd`,
] as const;

const TRAIL_LENGTH = 12;
const TRAIL_MS = 900;

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const idCounter = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setPrefersReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener('change', syncMotion);
    return () => mq.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    if (!isEnabled || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter.current++,
        timestamp: Date.now(),
      };

      setTrail((prev) => [...prev, newPoint].slice(-TRAIL_LENGTH));
    };

    const cleanupInterval = setInterval(() => {
      setTrail((prev) => {
        const now = Date.now();
        return prev.filter((point) => now - point.timestamp < TRAIL_MS);
      });
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, [isEnabled, prefersReducedMotion]);

  useEffect(() => {
    const checkMobile = () => {
      setIsEnabled(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isEnabled || prefersReducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden
    >
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp;
        const opacity = Math.max(0, 1 - age / TRAIL_MS);
        const progress = trail.length > 1 ? index / (trail.length - 1) : 0;
        const headBoost = index === trail.length - 1 ? 1.15 : 1;
        const size = (6 + (1 - progress) * 5) * headBoost;
        const color = TRAIL_PALETTE[index % TRAIL_PALETTE.length];

        return (
          <div
            key={point.id}
            className="absolute select-none"
            style={{
              left: point.x,
              top: point.y,
              transform: `translate(-50%, -50%) scale(${0.85 + (1 - progress) * 0.2}) rotate(${progress * 72}deg)`,
              opacity: opacity * 0.42,
              color,
              fontSize: `${size}px`,
              lineHeight: 1,
              textShadow: `
                0 0 4px ${color}55,
                0 0 12px ${color}33,
                0 0 20px ${COLORS.primary}18
              `,
              pointerEvents: 'none',
              fontFamily: 'Sora, ui-sans-serif, system-ui, sans-serif',
              fontWeight: 600,
            }}
          >
            ✦
          </div>
        );
      })}
    </div>
  );
}
