import { Maximize2, X } from 'lucide-react';
import { COLORS } from '../../constants';

interface WindowHeaderProps {
  title?: string;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
}

export default function WindowHeader({ 
  title = "DOMINIC HUBBLE",
  onMaximize,
  onClose,
  isMaximized = false
}: WindowHeaderProps) {
  return (
    <div
      className="border-b-2 px-2.5 sm:px-4 md:px-6 py-1.5 sm:py-2.5 md:py-3 flex items-center justify-between gap-2 rounded-t-lg font-y2k-mono relative overflow-hidden shrink-0 min-w-0"
      style={{
        background: `linear-gradient(180deg, #2a2c32 0%, #22242a 52%, #1d1f24 100%)`,
        borderColor: COLORS.primary,
        boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px opacity-45 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.primary}, ${COLORS.accent}, transparent)`,
        }}
      />
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 relative z-10">
        <h1 className="min-w-0 truncate text-[10px] sm:text-xs md:text-base lg:text-lg font-semibold tracking-[0.1em] sm:tracking-[0.14em] md:tracking-[0.18em] uppercase">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(105deg, ${COLORS.secondary} 0%, ${COLORS.primary} 40%, ${COLORS.white} 55%, ${COLORS.primary} 70%, ${COLORS.secondary} 100%)`,
            }}
          >
            {title}
          </span>
        </h1>
        <span
          className="text-xs animate-pulse hidden md:inline"
          style={{ color: COLORS.accent }}
        >
          ✩｡⋆
        </span>
      </div>
      
      <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-3 md:gap-4 relative z-10">
        {/* Window Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {onMaximize && (
            <button
              onClick={onMaximize}
              className="p-1 sm:p-1.5 border transition-all hover:scale-110"
              style={{ 
                borderColor: `${COLORS.primary}60`,
                color: COLORS.primary 
              }}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize2 size={12} />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 sm:p-1.5 border transition-all hover:scale-110"
              style={{ 
                borderColor: `${COLORS.accent}60`,
                color: COLORS.accent 
              }}
              title="Close"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
