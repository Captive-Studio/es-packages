import type { Color } from './Color.js';
import type { ColorPalette } from './ColorPalette.js';
import type { Spacing } from './Spacing.js';
import type { Typeface } from './Typeface.js';

export interface Theme {
  /**
   * Font typeface
   */
  typeface: Record<string, Typeface>;
  /**
   * Color schemes
   */
  color: Color;
  /**
   * Color palette by their name
   */
  colorPalette: Record<string, ColorPalette>;
  /**
   * Spacing scale
   */
  space: Spacing;
}
