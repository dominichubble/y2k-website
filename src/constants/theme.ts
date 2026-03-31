/**
 * Soft Y2K tuned to the profile portrait: brushed steel, warm pearl, soft periwinkle.
 * Neutral graphite base so the B&W suit + metallic elevator read clean, not candy-coloured.
 */
export const COLORS = {
  primary: '#9aadbf',
  secondary: '#ece8e4',
  accent: '#b8c9eb',
  black: '#121318',
  white: '#f7f5f2',
} as const;

/** For rgba(...) in inline styles */
export const COLORS_RGB = {
  primary: '154, 173, 191',
  accent: '184, 201, 235',
} as const;

export const SHADOWS = {
  subtle: (color: string, opacity: number = 0.1) =>
    `0 2px 8px ${color}${Math.round(opacity * 255).toString(16)}`,
  soft: (color: string, opacity: number = 0.15) =>
    `0 4px 12px ${color}${Math.round(opacity * 255).toString(16)}`,
} as const;
