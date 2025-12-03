export const COLORS = {
  primary: '#94a3b8',    // Muted slate blue
  secondary: '#a1a1aa',  // Muted zinc gray
  accent: '#f472b6',     // Muted pink accent
  black: '#0f172a',      // Dark slate
  white: '#f1f5f9',      // Soft white
} as const;

export const SHADOWS = {
  subtle: (color: string, opacity: number = 0.1) => 
    `0 2px 8px ${color}${Math.round(opacity * 255).toString(16)}`,
  soft: (color: string, opacity: number = 0.15) =>
    `0 4px 12px ${color}${Math.round(opacity * 255).toString(16)}`,
} as const;
