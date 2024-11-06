import type { Color } from '../type.js';
import { colorPalette } from './colorPalette.js';

const white = '#fff';
const defaultError = 'red';

export const color = {
  // emphasisOnBlue: colorPalette.goldenFizz[400],

  // Primary
  primary: colorPalette.pinkVivid[500],
  onPrimary: white,
  primaryContainer: defaultError,
  onPrimaryContainer: defaultError,
  // Secondary
  secondary: defaultError,
  onSecondary: defaultError,
  secondaryContainer: defaultError,
  onSecondaryContainer: defaultError,
  // Tertiary
  tertiary: defaultError,
  onTertiary: defaultError,
  tertiaryContainer: defaultError,
  onTertiaryContainer: defaultError,
  // Error
  error: defaultError,
  onError: defaultError,
  errorContainer: defaultError,
  onErrorContainer: defaultError,

  surface: colorPalette.blueGrey[50],
  onSurface: colorPalette.blueGrey[900],

  outlineVariant: defaultError,
  onSurfaceVariant: colorPalette.blueGrey[700],

  outline: defaultError,
  white,
} satisfies Color;
