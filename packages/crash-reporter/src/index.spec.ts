import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('Public api', () => {
  it('doit inclure les clés', () =>
    expect(Module).toMatchObject({
      CrashReporter: expect.any(Function),
      CrashReporterEvent: expect.any(Object),
    }));
});
