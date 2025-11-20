import { useEffect } from 'react';
import type { Section } from '../constants';

interface UseKeyboardShortcutsProps {
  onNavigate: (section: Section) => void;
  currentSection: Section;
  onEscape?: () => void;
}

export function useKeyboardShortcuts({ onNavigate, currentSection, onEscape }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      // ESC key
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }

      // Number keys for navigation (1-6)
      const keyMap: { [key: string]: Section } = {
        '1': 'home',
        '2': 'about',
        '3': 'projects',
        '4': 'experience',
        '5': 'skills',
        '6': 'blog'
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        onNavigate(keyMap[e.key]);
        return;
      }

      // Arrow keys for sequential navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const sections: Section[] = ['home', 'about', 'projects', 'experience', 'skills', 'blog'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowRight') {
          const nextIndex = (currentIndex + 1) % sections.length;
          onNavigate(sections[nextIndex]);
        } else if (e.key === 'ArrowLeft') {
          const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
          onNavigate(sections[prevIndex]);
        }
        return;
      }

      // ? key to show help (need shift for ?)
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        const event = new CustomEvent('showKeyboardHelp');
        window.dispatchEvent(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, currentSection, onEscape]);
}
