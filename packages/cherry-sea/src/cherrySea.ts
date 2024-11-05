import type { Theme } from './type.js';
import { spacing } from './cherrySea/spacing.js';
import { typeface } from './cherrySea/typeface.js';

/**
 * Cherry sea theme configuration
 */
export const cherrySea = {
  typeface,
  spacing,
} satisfies Theme;
