/** Softcore Y2K — pastel chrome, seafoam & lavender, easy on the eyes */
export const COLORS = {
  primary: '#98ccd5',
  secondary: '#e8e4f0',
  accent: '#d4b8f0',
  black: '#17151f',
  white: '#faf8ff',
} as const;

export const SHADOWS = {
  subtle: (color: string, opacity: number = 0.1) =>
    `0 2px 8px ${color}${Math.round(opacity * 255).toString(16)}`,
  soft: (color: string, opacity: number = 0.15) =>
    `0 4px 12px ${color}${Math.round(opacity * 255).toString(16)}`,
} as const;
