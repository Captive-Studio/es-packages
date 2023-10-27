import { type RaygunStatic } from 'raygun4js';
import { describe, it, expect, vi, type Mocked } from 'vitest';
import { CrashReporter } from '../crashReporter.js';
import { CrashReporterEvent } from '../event.js';
import { RaygunPlugin } from './raygun.js';

describe('RaygunPlugin', () => {
  const anyApiKey = 'api-key';
  const anyError = new Error('AnyError');
  const anyOptions = {
    version: 'my-version',
    tags: {
      foo: 'bar',
      simple: '',
    },
  };
  const anyCrashReporter = CrashReporter(anyOptions);
  const mockInstance = (): Mocked<RaygunStatic> =>
    ({
      attach: vi.fn(),
      init: vi.fn(),
      setUser: vi.fn(),
      setVersion: vi.fn(),
      resetAnonymousUser: vi.fn(),
      send: vi.fn(),
      withCustomData: vi.fn(),
      withTags: vi.fn(),
    }) as any;

  describe('#name', () => {
    it('should be constant', () => {
      expect(
        RaygunPlugin({
          apiKey: anyApiKey,
        })
      ).toHaveProperty('name', 'raygun');
    });
  });
  describe('#dispatchEvent', () => {
    it('should handle Initialize', async () => {
      const raygunInstance = mockInstance();
      const plugin = RaygunPlugin({
        apiKey: anyApiKey,
        clientIp: '127.0.0.1',
        raygunInstance,
      });
      const crashReporter = CrashReporter({
        version: 'my-version',
        environment: 'production',
        tags: {
          foo: 'bar',
          simple: '',
        },
      });
      await plugin.dispatchEvent(CrashReporterEvent.Initialize({ instance: crashReporter }));
      expect(raygunInstance.init).toHaveBeenCalledWith(anyApiKey, {
        clientIp: '127.0.0.1',
        debugMode: false,
      });
      expect(raygunInstance.attach).toHaveBeenCalled();
      expect(raygunInstance.setVersion).toHaveBeenCalledWith('my-version');
      expect(raygunInstance.withTags).toHaveBeenCalledWith(['environment:production', 'foo:bar', 'simple']);
    });
    it('should handle CaptureError', async () => {
      const raygunInstance = mockInstance();
      const plugin = RaygunPlugin({
        apiKey: anyApiKey,
        raygunInstance,
      });
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
      expect(raygunInstance.send).toHaveBeenCalledWith(anyError, undefined, ['foo:bar', 'simple']);
    });
    it('should handle UpdateUser', async () => {
      const raygunInstance = mockInstance();
      const user = { id: 'userId', email: 'toto@foo.bar', displayName: 'Toto Foo' };
      const plugin = RaygunPlugin({
        apiKey: anyApiKey,
        raygunInstance,
      });
      await plugin.dispatchEvent(CrashReporterEvent.UpdateUser({ user: undefined, instance: anyCrashReporter }));
      expect(raygunInstance.resetAnonymousUser).toHaveBeenCalled();

      raygunInstance.setUser.mockReset();
      await plugin.dispatchEvent(CrashReporterEvent.UpdateUser({ user, instance: anyCrashReporter }));
      expect(raygunInstance.setUser).toHaveBeenCalledWith(user.id, false, user.email, user.displayName);

      raygunInstance.setUser.mockReset();
      await plugin.dispatchEvent(
        CrashReporterEvent.UpdateUser({ user: { ...user, id: undefined }, instance: anyCrashReporter })
      );
      expect(raygunInstance.setUser).toHaveBeenCalledWith(undefined, true, user.email, user.displayName);
    });
    it('should handle UpdateVersion', async () => {
      const raygunInstance = mockInstance();
      const version = '1.0.0';
      const plugin = RaygunPlugin({
        apiKey: anyApiKey,
        raygunInstance,
      });
      await plugin.dispatchEvent(CrashReporterEvent.UpdateVersion({ version, instance: anyCrashReporter }));
      expect(raygunInstance.setVersion).toHaveBeenCalled();
    });
  });
});
