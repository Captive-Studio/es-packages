import type { CSSColor } from './CSS.js';

export interface Color {
  primary: CSSColor;
  onPrimary: CSSColor;

  surface: CSSColor;
  onSurface: CSSColor;

  onSurfaceVariant: CSSColor;
  white: CSSColor;
}
