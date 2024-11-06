import type { Theme } from './type.js';
import { color } from './cherrySea/color.js';
import { colorPalette } from './cherrySea/colorPalette.js';
import { space } from './cherrySea/space.js';
import { typeface } from './cherrySea/typeface.js';

/**
 * Cherry sea theme configuration
 */
export const cherrySea = {
  typeface,
  space,
  color,
  colorPalette,
} satisfies Theme;
