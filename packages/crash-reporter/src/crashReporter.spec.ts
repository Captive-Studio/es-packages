import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CrashReporter } from './crashReporter.js';
import { CrashReporterEvent } from './event.js';

describe('CrashReporter', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  const mockPlugin = (): CrashReporter.Plugin => ({
    name: 'mock',
    dispatchEvent: vi.fn(() => Promise.resolve()),
  });
  const anyError = new Error('AnyError');
  describe('()', () => {
    it('should dispatchEvent(Initialize())', () => {
      const plugin = mockPlugin();
      const reporter = CrashReporter({ plugin });
      expect(plugin.dispatchEvent).toHaveBeenCalledWith(CrashReporterEvent.Initialize({ instance: reporter }));
    });
  });
  describe('#captureError()', () => {
    it('with ({ plugin })', () => {
      const plugin = mockPlugin();
      const tags = { foo: 'true' };
      const reporter = CrashReporter({ plugin });
      reporter.captureError({ error: anyError, tags });
      expect(plugin.dispatchEvent).toHaveBeenCalledWith(
        CrashReporterEvent.CaptureError({ error: anyError, tags, instance: reporter }),
      );
    });
    it('with ({ plugin, enabled: false })', () => {
      const plugin = mockPlugin();
      const reporter = CrashReporter({ plugin, enabled: false });
      reporter.captureError({ error: anyError });
      expect(plugin.dispatchEvent).not.toHaveBeenCalled();
    });
  });
  describe('#setUser()', () => {
    it('with ({ plugin, enabled: false })', () => {
      const plugin = mockPlugin();
      const reporter = CrashReporter({ plugin });
      reporter.setUser({ id: 'user-id' });
      expect(plugin.dispatchEvent).toHaveBeenCalledWith(
        CrashReporterEvent.UpdateUser({ user: { id: 'user-id' }, instance: reporter }),
      );
    });
  });
  describe('#setVersion()', () => {
    it('with ({ plugin, enabled: false })', () => {
      const plugin = mockPlugin();
      const reporter = CrashReporter({ plugin });
      reporter.setVersion('1.0.0');
      expect(plugin.dispatchEvent).toHaveBeenCalledWith(
        CrashReporterEvent.UpdateVersion({ version: '1.0.0', instance: reporter }),
      );
    });
  });
});
