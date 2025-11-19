import { COLORS } from '../../constants';

interface WindowHeaderProps {
  title?: string;
}

export default function WindowHeader({ title = "DOMINIC HUBBLE.TV" }: WindowHeaderProps) {
  return (
    <div 
      className="bg-gradient-to-r from-[#ff00ff]/20 via-[#00ffff]/20 to-[#ff00ff]/20 border-b-2 border-[#ff00ff]/30 px-6 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <div 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: COLORS.primary }}
          />
          <div 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: COLORS.secondary, animationDelay: '0.2s' }}
          />
          <div 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: COLORS.accent, animationDelay: '0.4s' }}
          />
        </div>
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
      <div className="text-xs text-gray-500 font-mono hidden md:block">
        [Y2K MODE ACTIVE]
      </div>
    </div>
  );
}
