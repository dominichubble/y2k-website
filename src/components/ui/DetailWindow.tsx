import { useEffect } from 'react';
import { COLORS } from '../../constants';
import DraggableWindow from './DraggableWindow';

interface DetailItem {
  label: string;
  value: string | number;
}

interface DetailSection {
  title: string;
  items?: DetailItem[];
  content?: string;
  tags?: string[];
  listItems?: string[];
}

interface DetailWindowProps {
  title: string;
  subtitle?: string;
  link?: string;
  sections: DetailSection[];
  onClose: () => void;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
}

export default function DetailWindow({
  title,
  subtitle,
  link,
  sections,
  onClose,
  initialX = 200,
  initialY = 100,
  width = 650,
  height = 550
}: DetailWindowProps) {
  // Listen for close modal event
  useEffect(() => {
    const handleCloseAll = () => {
      onClose();
    };

    window.addEventListener('closeAllModals', handleCloseAll);

    return () => {
      window.removeEventListener('closeAllModals', handleCloseAll);
    };
  }, [onClose]);

  return (
    <DraggableWindow
      title={title}
      onClose={onClose}
      initialX={initialX}
      initialY={initialY}
      width={width}
      height={height}
      titleColor={COLORS.primary}
    >
      <div className="p-6 space-y-5">
        {/* Header */}
        {subtitle && (
          <div>
            <p className="text-white font-semibold text-lg">{subtitle}</p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono transition-colors"
                style={{ color: COLORS.secondary }}
              >
                {link} →
              </a>
            )}
          </div>
        )}

        {/* Sections */}
        {sections.map((section, index) => (
          <div key={index}>
            <h4 className="text-xs font-mono text-gray-400 mb-3 tracking-wide">
              {section.title}
            </h4>

            {/* Grid items (for key-value pairs) */}
            {section.items && (
              <div className="grid grid-cols-2 gap-3 text-sm">
                {section.items.map((item, i) => (
                  <div key={i}>
                    <span className="text-gray-400 block mb-1 text-xs">{item.label}</span>
                    <span className="text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Text content */}
            {section.content && (
              <p className="text-gray-300 text-sm leading-relaxed">
                {section.content}
              </p>
            )}

            {/* Tags */}
            {section.tags && (
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-mono border"
                    style={{
                      borderColor: `${COLORS.secondary}50`,
                      color: COLORS.secondary,
                      backgroundColor: `${COLORS.secondary}10`
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* List items */}
            {section.listItems && (
              <ul className="space-y-2">
                {section.listItems.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-300 flex items-start gap-2 leading-relaxed"
                  >
                    <span style={{ color: COLORS.accent }}>▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </DraggableWindow>
  );
}
