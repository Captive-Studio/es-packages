import { describe, it, expect } from 'vitest';
import { toCSSStyle, toCSSVariables } from './toCSSStyle.js';
import { cherrySea } from './cherrySea.js';

const THEME_PREFIX = 'cs';

describe(toCSSStyle, () => {
  it('matches snapshot', () => {
    expect(toCSSStyle(cherrySea, THEME_PREFIX)).toMatchSnapshot();
  });
});
describe(toCSSVariables, () => {
  it('matches snapshot', () => {
    expect(toCSSVariables(cherrySea, THEME_PREFIX)).toMatchSnapshot();
  });
});
