import { useEffect, useRef, useState } from 'react';
import { COLORS } from '../../constants';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const idCounter = useRef(0);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter.current++,
        timestamp: Date.now()
      };

      setTrail(prev => {
        const updated = [...prev, newPoint];
        // Keep only last 15 points
        return updated.slice(-15);
      });
    };

    // Clean up old points
    const cleanupInterval = setInterval(() => {
      setTrail(prev => {
        const now = Date.now();
        return prev.filter(point => now - point.timestamp < 1000);
      });
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, [isEnabled]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsEnabled(window.innerWidth >= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp;
        const opacity = Math.max(0, 1 - age / 1000);
        const progress = index / trail.length;
        const size = 12 - progress * 8;
        
        // Cycle through Y2K colors
        const colors = [COLORS.primary, COLORS.secondary, COLORS.accent];
        const color = colors[index % colors.length];

        return (
          <div
            key={point.id}
            className="absolute font-bold"
            style={{
              left: point.x,
              top: point.y,
              transform: `translate(-50%, -50%) scale(${1 - progress * 0.3}) rotate(${progress * 180}deg)`,
              opacity: opacity * 0.9,
              color: color,
              fontSize: `${size}px`,
              textShadow: `
                0 0 10px ${color},
                0 0 20px ${color},
                0 0 30px ${color}
              `,
              pointerEvents: 'none',
              fontFamily: 'monospace',
              filter: 'blur(0.3px)'
            }}
          >
            ✦
          </div>
        );
      })}
    </div>
  );
}
