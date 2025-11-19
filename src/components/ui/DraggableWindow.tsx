import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
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
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-control')) return;
    if (isMaximized) return; // Don't allow dragging when maximized
    
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

  return (
    <div
      ref={windowRef}
      className="fixed bg-black/95 border-4 overflow-hidden select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMaximized ? '100vw' : `${width}px`,
        height: isMinimized ? 'auto' : isMaximized ? '100vh' : `${height}px`,
        borderColor: titleColor,
        boxShadow: `0 0 20px ${titleColor}40`,
        zIndex: 9999
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b-2 cursor-move bg-black/80"
        style={{ 
          borderColor: titleColor
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold" style={{ color: titleColor }}>
            {title}
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-2 window-control">
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
        <div 
          className="overflow-y-auto overflow-x-hidden bg-black" 
          style={{ height: isMaximized ? 'calc(100vh - 56px)' : `${height - 56}px` }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
