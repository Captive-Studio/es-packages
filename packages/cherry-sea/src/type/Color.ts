import type { CSSColor } from './CSS.js';

export interface Color {
  // Primary
  primary: CSSColor;
  onPrimary: CSSColor;
  primaryContainer: CSSColor;
  onPrimaryContainer: CSSColor;
  // Secondary
  secondary: CSSColor;
  onSecondary: CSSColor;
  secondaryContainer: CSSColor;
  onSecondaryContainer: CSSColor;
  // Tertiary
  tertiary: CSSColor;
  onTertiary: CSSColor;
  tertiaryContainer: CSSColor;
  onTertiaryContainer: CSSColor;
  // Error
  error: CSSColor;
  onError: CSSColor;
  errorContainer: CSSColor;
  onErrorContainer: CSSColor;

  surface: CSSColor;
  onSurface: CSSColor;

  outlineVariant: CSSColor;
  onSurfaceVariant: CSSColor;

  outline: CSSColor;
  white: CSSColor;
}
