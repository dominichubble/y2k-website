import { useState, useCallback } from 'react';
import type { Section } from '../constants';

export function useNavigation(initialSection: Section = 'home') {
  const [currentSection, setCurrentSection] = useState<Section>(initialSection);

  const navigateTo = useCallback((section: Section) => {
    setCurrentSection(section);
  }, []);

  return {
    currentSection,
    navigateTo,
  };
}
