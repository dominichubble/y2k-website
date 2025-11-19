export type Section = 'home' | 'about' | 'projects' | 'experience' | 'skills';

export interface NavItem {
  id: Section;
  label: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'home...', icon: '🏠' },
  { id: 'about', label: 'about...', icon: '👤' },
  { id: 'projects', label: 'projects...', icon: '💻' },
  { id: 'experience', label: 'experience...', icon: '⚡' },
  { id: 'skills', label: 'skills...', icon: '✨' },
];
