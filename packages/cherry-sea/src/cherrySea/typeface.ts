import { Typeface } from '../type.js';

const fallback = ['-apple-system', 'Segoe UI', 'roboto', 'noto sans', 'ubuntu', 'cantarell', 'helvetica neue'];

export const typeface = {
  brand: Typeface(['Barlow', ...fallback]),
  plain: Typeface(['Inter', ...fallback]),
};
