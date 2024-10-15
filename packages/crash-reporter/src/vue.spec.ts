import * as Vue from 'vue';
import { type ComponentPublicInstance } from 'vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { crashReporterKey, withPlugin, useCrashReporter } from './vue.js';
import { CrashReporter } from './crashReporter.js';

beforeEach(() => {
  const doNothing = () => {};
  vi.spyOn(console, 'error').mockImplementation(doNothing);
  vi.spyOn(console, 'warn').mockImplementation(doNothing);
});

describe('crashReporterKey', () => {
  it('should be a symbol', () => {
    expect(typeof crashReporterKey).toBe('symbol');
  });
  it('should have description', () => {
    expect(crashReporterKey.description).toBe('CrashReporter');
  });
});
describe('useCrashReporter', () => {
  it('should be a function', () => {
    expect(typeof useCrashReporter).toBe('function');
  });
});
describe('withPlugin', () => {
  const anyCrashReporter = CrashReporter({});

  it('should be a vuejs plugin', () => {
    const plugin = withPlugin(anyCrashReporter);
    expect(plugin).toEqual(
      expect.objectContaining({
        install: expect.any(Function),
      }),
    );
  });
  it('should be a CrashReporter instance', () => {
    const plugin = withPlugin(anyCrashReporter);
    expect(plugin).toEqual(
      expect.objectContaining({
        captureError: expect.any(Function),
      }),
    );
  });
  describe('#install', () => {
    it('should provide plugin instance', () => {
      const plugin = withPlugin(anyCrashReporter);
      const app = Vue.createApp({});
      vi.spyOn(app, 'provide');
      plugin.install(app);
      expect(app.provide).toHaveBeenCalledWith(crashReporterKey, plugin);
    });
    it('should provide globalProperties', () => {
      const plugin = withPlugin(anyCrashReporter);
      const app = Vue.createApp({});
      plugin.install(app);
      expect(app.config.globalProperties).toEqual(
        expect.objectContaining({
          $crashReporter: plugin,
        }),
      );
    });
    it('should set errorHandler', () => {
      const plugin = withPlugin(anyCrashReporter);
      const errorHandlerSpy = vi.spyOn(plugin, 'errorHandler').mockImplementation(() => {});
      const app = Vue.createApp({});
      plugin.install(app);

      const err = {};
      const instance = {} as unknown as ComponentPublicInstance;
      const info = 'info';
      app.config.errorHandler!(err, instance, info);
      expect(errorHandlerSpy).toHaveBeenCalledWith(err, instance, info);
    });
  });
  describe('#errorHandler', () => {
    it('should call captureError()', () => {
      const plugin = withPlugin(anyCrashReporter);
      vi.spyOn(plugin, 'captureError');
      const error = new Error('AnyError');
      const vm: Vue.ComponentPublicInstance = {} as any;
      const info = 'some information';
      plugin.errorHandler(error, vm, info);
      expect(plugin.captureError).toHaveBeenCalledWith({ error });
    });
    it('should call console.error()', () => {
      const plugin = withPlugin(anyCrashReporter);
      const error = new Error('AnyError');
      const vm: Vue.ComponentPublicInstance = {} as any;
      const info = 'some information';
      plugin.errorHandler(error, vm, info);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });
});
