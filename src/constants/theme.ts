/** Y2K chrome palette — electric cyan, silver chrome, hot magenta */
export const COLORS = {
  primary: '#00d9ff',
  secondary: '#c8cdd4',
  accent: '#ff2ec4',
  black: '#06060a',
  white: '#f4f8fc',
} as const;

export const SHADOWS = {
  subtle: (color: string, opacity: number = 0.1) =>
    `0 2px 8px ${color}${Math.round(opacity * 255).toString(16)}`,
  soft: (color: string, opacity: number = 0.15) =>
    `0 4px 12px ${color}${Math.round(opacity * 255).toString(16)}`,
} as const;
