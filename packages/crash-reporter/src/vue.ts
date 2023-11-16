import { inject, handleError, type InjectionKey, type App, type ComponentPublicInstance, type ErrorCodes } from 'vue';
import { CrashReporter } from './crashReporter.js';

// Declare globals
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $crashReporter: CrashReporter;
  }
}

/**
 * Default empty crash reporter
 */
export const defaultCrashReporter: CrashReporter = CrashReporter({
  enabled: false,
});

/**
 * CrashReporter service injection key
 *
 * @see https://logaretm.com/blog/type-safe-provide-inject/
 */
export const crashReporterKey: InjectionKey<CrashReporter> = Symbol('CrashReporter');

/**
 * Vue composable to return a CrashReporter service instance
 *
 * @example
 * ```ts
 * // In VueJS component
 * const crashReporter = useCrashReporter()
 * ```
 */
export function useCrashReporter(): CrashReporter {
  return inject(crashReporterKey, defaultCrashReporter);
}

export interface CrashReporterPlugin extends CrashReporter {
  /**
   * VueJS plugin installation callback
   *
   * @param app
   */
  install(app: App): void;
  /**
   * VueJS global error handler
   *
   * @param error
   * @param instance
   * @param info
   */
  errorHandler(error: unknown, instance: ComponentPublicInstance | null, info: string): void;
}
export namespace CrashReporterPlugin {
  export interface Options extends CrashReporter.Options {}
}

/**
 * @example
 * ```ts
 * // src/crashReporter.ts
 * import { CrashReporter } from '@captive/crash-reporter';
 * import { withPlugin } from '@captive/crash-reporter/dist/vue.js';
 * export const CrashReporter = withPlugin(CrashReporter(...));
 *
 * // src/main.ts
 * import { CrashReporter } from './crashReporter.js';
 *
 * const app = createApp({})
 *   .use(CrashReporter)
 * ```
 */
export function withPlugin(crashReporter: CrashReporter): CrashReporterPlugin {
  const crashReporterPlugin: CrashReporterPlugin = {
    ...crashReporter,
    install(app, _config?: unknown): void {
      // To use const crashReporter = useCrashReporter()
      app.provide(crashReporterKey, crashReporterPlugin);
      // To use $crashReporter in templates
      app.config.globalProperties.$crashReporter = crashReporterPlugin;
      app.config.errorHandler = crashReporterPlugin.errorHandler.bind(crashReporterPlugin);
    },
    errorHandler(error, _instance, _info) {
      // 1. Capture in crash reporter
      crashReporterPlugin.captureError({ error });
      // 2. Forward to default VueJS handler (console.error)
      handleError(error, null, 10 as ErrorCodes /* ErrorCodes.APP_ERROR_HANDLER */, false);
    },
  };
  return crashReporterPlugin;
}
