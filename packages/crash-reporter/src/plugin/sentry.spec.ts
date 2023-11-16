import { describe, it, expect, type Mocked, vi } from 'vitest';
import * as Sentry from '@sentry/browser';
import { CrashReporter } from '../crashReporter.js';
import { CrashReporterEvent } from '../event.js';
import { SentryPlugin } from './sentry.js';

describe('SentryPlugin', () => {
  const anyDSN = 'sentry-dsn';
  const anyError = new Error('AnyError');
  const anyOptions = {
    dsn: anyDSN,
  };
  const anyCrashReporter = CrashReporter({
    app: 'my-app',
    version: '1.0.0-default',
  });
  const mockInstance = (): Mocked<typeof Sentry> =>
    ({
      init: vi.fn(),
      setTags: vi.fn(),
      setUser: vi.fn(),
      captureException: vi.fn(),
    }) as unknown as Mocked<typeof Sentry>;

  describe('#name', () => {
    it('should be constant', () => {
      const sentryInstance = mockInstance();

      expect(
        SentryPlugin(sentryInstance, {
          dsn: anyDSN,
        })
      ).toHaveProperty('name', 'sentry');
    });
  });
  describe('#dispatchEvent', () => {
    it('should handle Initialize', async () => {
      const sentryInstance = mockInstance();
      const plugin = SentryPlugin(sentryInstance, {
        dsn: anyDSN,
      });
      const crashReporter = CrashReporter({
        app: 'my-app',
        environment: 'my-environment',
        version: 'my-version',
        tags: {
          foo: 'bar',
          simple: '',
        },
        plugin,
      });
      await plugin.dispatchEvent(CrashReporterEvent.Initialize({ instance: crashReporter }));
      expect(sentryInstance.init).toHaveBeenCalledWith({
        dsn: anyDSN,
        release: 'my-app@my-version',
        environment: 'my-environment',
        enabled: true,
        debug: false,
      });
      expect(sentryInstance.setTags).toHaveBeenCalledWith({
        foo: 'bar',
        simple: '',
      });
    });
    it('should handle CaptureError', async () => {
      const sentryInstance = mockInstance();
      const plugin = SentryPlugin(sentryInstance, anyOptions);

      await plugin.dispatchEvent(
        CrashReporterEvent.CaptureError({
          instance: anyCrashReporter,
          error: anyError,
          tags: {
            foo: 'bar',
            simple: '',
          },
        })
      );
      expect(sentryInstance.captureException).toHaveBeenCalledWith(anyError, {
        tags: {
          foo: 'bar',
          simple: '',
        },
      });
    });
    it('should handle UpdateUser', async () => {
      const sentryInstance = mockInstance();
      const user = { id: 'userId', email: 'toto@foo.bar', displayName: 'Toto Foo' };
      const plugin = SentryPlugin(sentryInstance, anyOptions);

      await plugin.dispatchEvent(CrashReporterEvent.UpdateUser({ user: undefined, instance: anyCrashReporter }));
      expect(sentryInstance.setUser).toHaveBeenCalled();

      sentryInstance.setUser.mockReset();
      await plugin.dispatchEvent(CrashReporterEvent.UpdateUser({ user, instance: anyCrashReporter }));
      expect(sentryInstance.setUser).toHaveBeenCalledWith({
        id: 'userId',
        email: 'toto@foo.bar',
        displayName: 'Toto Foo',
      });

      sentryInstance.setUser.mockReset();
      await plugin.dispatchEvent(CrashReporterEvent.UpdateUser({ user: undefined, instance: anyCrashReporter }));
      expect(sentryInstance.setUser).toHaveBeenCalledWith(null);
    });
    it('should handle UpdateVersion', async () => {
      const sentryInstance = mockInstance();
      const plugin = SentryPlugin(sentryInstance, {
        ...anyOptions,
      });
      await plugin.dispatchEvent(CrashReporterEvent.UpdateVersion({ version: '10.0.x', instance: anyCrashReporter }));
      expect(sentryInstance.init).toHaveBeenCalledWith({
        release: `${anyCrashReporter.app}@10.0.x`,
      });
    });
  });
});
