import type { Theme } from './type.js';
import { color } from './cherrySea/color.js';
import { colorPalette } from './cherrySea/colorPalette.js';
import { spacing } from './cherrySea/spacing.js';
import { typeface } from './cherrySea/typeface.js';

/**
 * Cherry sea theme configuration
 */
export const cherrySea = {
  typeface,
  spacing,
  color,
  colorPalette,
} satisfies Theme;
