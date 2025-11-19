import type { Section } from '../../constants';
import { NAV_ITEMS, COLORS, SHADOWS } from '../../constants';

interface WindowNavProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function WindowNav({ currentSection, onSectionChange }: WindowNavProps) {
  return (
    <nav className="border-b-2 border-[#ff00ff]/20 bg-black/50 px-4 py-2">
      <div className="flex gap-1 md:gap-2 justify-center flex-wrap">
        {NAV_ITEMS.map((item) => {
          const isActive = currentSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`px-3 md:px-4 py-2 font-mono text-xs md:text-sm transition-all duration-300 flex items-center gap-1 md:gap-2 ${
                isActive
                  ? 'bg-[#ff00ff] text-black font-bold scale-105'
                  : 'text-[#00ffff] hover:bg-[#ff00ff]/20 hover:text-[#ff00ff]'
              }`}
              style={isActive ? {
                boxShadow: SHADOWS.neon(COLORS.primary)
              } : {}}
            >
              <span className="text-sm md:text-base">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
