export const COLORS = {
  primary: '#ff00ff',    // Magenta/Pink
  secondary: '#00ffff',  // Cyan
  accent: '#ccff00',     // Lime
  black: '#000000',
  white: '#ffffff',
} as const;

export const SHADOWS = {
  glow: (color: string, opacity: number = 0.4) => 
    `0 0 40px ${color}${Math.round(opacity * 255).toString(16)}, 0 0 80px ${COLORS.secondary}33`,
  neon: (color: string, opacity: number = 0.6) =>
    `0 0 15px ${color}${Math.round(opacity * 255).toString(16)}`,
} as const;
