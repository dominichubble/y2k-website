import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';
import { COLORS } from '../../constants';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] pointer-events-auto"
        >
          <div
            className="relative bg-black/95 border-2 px-6 py-4 min-w-[300px] backdrop-blur-sm"
            style={{
              borderColor: COLORS.primary,
              boxShadow: `
                0 0 20px ${COLORS.primary}80,
                0 0 40px ${COLORS.primary}40,
                inset 0 0 20px ${COLORS.primary}10
              `,
            }}
          >
            {/* Scanline effect */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  ${COLORS.primary} 2px,
                  ${COLORS.primary} 4px
                )`
              }}
            />

            <div className="relative flex items-center gap-3">
              {/* Icon with glow */}
              <div
                className="flex-shrink-0"
                style={{
                  color: COLORS.primary,
                  filter: `drop-shadow(0 0 8px ${COLORS.primary})`
                }}
              >
                <CheckCircle2 size={24} />
              </div>

              {/* Message */}
              <div className="flex-1">
                <p
                  className="font-mono text-sm font-bold tracking-wide"
                  style={{ color: COLORS.accent }}
                >
                  {message}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 border transition-all hover:scale-110"
                style={{
                  borderColor: `${COLORS.secondary}60`,
                  color: COLORS.secondary
                }}
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </div>

            {/* Corner accents */}
            <div
              className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
              style={{ borderColor: COLORS.accent }}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
              style={{ borderColor: COLORS.accent }}
            />

            {/* Animated progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1"
              style={{ backgroundColor: COLORS.primary }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
