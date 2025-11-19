export type Section = 'home' | 'about' | 'projects' | 'experience' | 'skills';

export interface NavItem {
  id: Section;
  label: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'home', icon: 'home' },
  { id: 'about', label: 'about', icon: 'user' },
  { id: 'projects', label: 'projects', icon: 'folder' },
  { id: 'experience', label: 'experience', icon: 'briefcase' },
  { id: 'skills', label: 'skills', icon: 'zap' },
];
