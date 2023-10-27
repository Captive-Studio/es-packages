import { describe, it, expect } from 'vitest';
import { EmptyPlugin } from './empty.js';

describe('EmptyPlugin', () => {
  describe('#name', () => {
    it('should be constant', () => {
      expect(EmptyPlugin()).toHaveProperty('name', 'empty');
    });
  });
});
