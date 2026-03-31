import { Maximize2, Minimize2, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { COLORS } from '../../constants';

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  titleColor?: string;
}

export default function DraggableWindow({ 
  title, 
  children, 
  onClose,
  initialX = 100,
  initialY = 100,
  width = 600,
  height = 400,
  titleColor = COLORS.primary
}: DraggableWindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ x: initialX, y: initialY, width, height });
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1024,
    h: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => {
      setIsMobile(window.innerWidth < 768);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-control')) return;
    if (isMaximized || isMobile) return; // Don't allow dragging when maximized or on mobile
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore to previous state
      setPosition({ x: preMaximizeState.x, y: preMaximizeState.y });
      setIsMaximized(false);
    } else {
      // Save current state and maximize
      setPreMaximizeState({ x: position.x, y: position.y, width, height });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
      setIsMinimized(false); // Unminimize when maximizing
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Keep window within viewport bounds
      const maxX = window.innerWidth - (windowRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (windowRef.current?.offsetHeight || 0);

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const edge = 12;
  const maxFloatingW = Math.max(280, Math.min(width, viewport.w - edge * 2));
  const maxFloatingH = Math.max(240, Math.min(height, viewport.h - edge * 2));

  return (
    <div
      ref={windowRef}
      className="fixed bg-black/95 border-2 sm:border-4 overflow-hidden select-none flex flex-col max-w-[100dvw] max-h-[100dvh]"
      style={{
        left: isMobile ? '0' : `${position.x}px`,
        top: isMobile ? '0' : `${position.y}px`,
        width: isMobile || isMaximized ? '100dvw' : `${maxFloatingW}px`,
        height: isMinimized ? 'auto' : isMobile || isMaximized ? '100dvh' : `${maxFloatingH}px`,
        borderColor: titleColor,
        boxShadow: `0 0 20px ${titleColor}40`,
        zIndex: 9999
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-b sm:border-b-2 bg-black/80"
        style={{ 
          borderColor: titleColor,
          cursor: isMobile ? 'default' : 'move'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <span className="font-mono text-xs sm:text-sm font-bold truncate" style={{ color: titleColor }}>
            {title}
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1 sm:gap-2 window-control flex-shrink-0">
          {!isMobile && (
            <>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 border transition-all hover:scale-110"
                style={{ 
                  borderColor: `${COLORS.secondary}60`,
                  color: COLORS.secondary 
                }}
                title="Minimize"
              >
                <Minimize2 size={12} />
              </button>
              <button
                onClick={handleMaximize}
                className="p-1.5 border transition-all hover:scale-110"
                style={{ 
                  borderColor: `${titleColor}60`,
                  color: titleColor 
                }}
                title={isMaximized ? "Restore" : "Maximize"}
              >
                <Maximize2 size={12} />
              </button>
            </>
          )}
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
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-black">
          {children}
        </div>
      )}
    </div>
  );
}
