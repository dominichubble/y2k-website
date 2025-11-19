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
      className="bg-black/80 border-b-2 px-6 py-3 flex items-center justify-between"
      style={{ borderColor: COLORS.primary }}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-lg md:text-xl font-black tracking-wider">
          <span 
            className="bg-clip-text text-transparent" 
            style={{ backgroundImage: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})` }}
          >
            {title}
          </span>
        </h1>
        <span className="text-[#00ffff] text-sm animate-pulse hidden md:inline">✩｡⋆</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-xs text-gray-500 font-mono hidden md:block">
          [Y2K MODE ACTIVE]
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          {onMaximize && (
            <button
              onClick={onMaximize}
              className="p-1.5 border transition-all hover:scale-110"
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
              className="p-1.5 border transition-all hover:scale-110"
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
