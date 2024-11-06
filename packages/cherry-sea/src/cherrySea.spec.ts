import { describe, it, expect } from 'vitest';
import { cherrySea } from './cherrySea.js';

describe('cherrySea', () => {
  it('matches snapshot', () => {
    expect(cherrySea).toMatchSnapshot();
  });
});
