import type { Color } from '../type.js';
import { colorPalette } from './colorPalette.js';

const white = '#fff';

export const color = {
  // emphasisOnBlue: colorPalette.goldenFizz[400],

  // Primary
  primary: colorPalette.pinkVivid[500],
  onPrimary: white,

  surface: colorPalette.blueGrey[50],
  onSurface: colorPalette.blueGrey[900],

  onSurfaceVariant: colorPalette.blueGrey[700],
  white,
} satisfies Color;
