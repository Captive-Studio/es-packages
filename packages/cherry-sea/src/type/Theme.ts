import type { Spacing } from './Spacing.js';
import type { Typeface } from './Typeface.js';

export interface Theme {
  typeface: Record<string, Typeface>;
  spacing: Spacing;
}
