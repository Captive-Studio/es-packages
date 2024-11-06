import { describe, it, expect } from 'vitest';
import { toCSSStyle } from './toCSSStyle.js';
import { cherrySea } from './cherrySea.js';

const THEME_PREFIX = 'cs';

describe('cherrySea', () => {
  it('matches snapshot', () => {
    expect(toCSSStyle(cherrySea, THEME_PREFIX)).toMatchSnapshot();
  });
});
