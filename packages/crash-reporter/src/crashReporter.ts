/* eslint-disable @typescript-eslint/no-use-before-define */
import { EmptyPlugin } from './plugin/empty.js';
import { CrashReporterEvent, type CrashReporterUser } from './event.js';

export interface CrashReporter {
  /**
   * Application name
   */
  readonly app: string | undefined;
  /**
   * Application Version
   */
  readonly version: { current: string | undefined };
  /**
   * Application environment (production, staging, etc)
   *
   * @default `undefined`
   */
  readonly environment: string | undefined;
  /**
   * Set to `true` if the CrashReporter and its plugin should log verbose debug messages
   */
  readonly debug: boolean;
  /**
   * Is `true` when crash reports should be sent
   */
  readonly enabled: boolean;
  /**
   * A tag hash sent for each crash reports
   */
  readonly tags: CrashReporter.TagSet;

  /**
   * Set application version
   *
   * @param event
   */
  setVersion(version: string): void;
  /**
   * Set current user or logout if undefined
   *
   * @param event
   */
  setUser(user: CrashReporterUser | undefined): void;
  /**
   * Send an Error event to crash reporter
   *
   * @param event
   */
  captureError(event: { error: unknown; tags?: CrashReporter.TagSet }): void;
}

const defaultCrashReporterPlugin = EmptyPlugin();

/**
 * Crash reporter service constructor
 *
 * @param options
 */
export function CrashReporter(options: CrashReporter.Options): CrashReporter {
  const {
    app,
    version: versionDefault,
    environment,
    enabled = true,
    debug = false,
    tags = {},
    plugin = defaultCrashReporterPlugin,
  } = options;
  const logDebug = debug
    ? (...args: unknown[]) => {
        // eslint-disable-next-line no-console
        console.debug('[CrashReporter]', ...args);
      }
    : () => {};
  const versionRef = { current: versionDefault };
  const ignore = (_anyValue: unknown): void => {};

  function dispatchEvent(event: CrashReporterEvent) {
    return enabled ? plugin.dispatchEvent(event) : undefined;
  }

  function setVersion(version: string) {
    logDebug('setVersion(', version, ')');
    versionRef.current = version;
    return dispatchEvent(
      CrashReporterEvent.UpdateVersion({
        version,
        instance,
      }),
    );
  }

  function setUser(user: CrashReporterUser | undefined) {
    logDebug('setUser(', user, ')');
    return dispatchEvent(
      CrashReporterEvent.UpdateUser({
        user,
        instance,
      }),
    );
  }

  function captureError({ error, tags: errorTags }: { error: unknown; tags?: CrashReporter.TagSet }) {
    logDebug('captureError(', { error, tags: errorTags }, ')');
    return dispatchEvent(
      CrashReporterEvent.CaptureError({
        error,
        tags: errorTags ?? {},
        instance,
      }),
    );
  }

  const instance = {
    app,
    version: versionRef,
    environment,
    enabled,
    debug,
    tags,
    setUser,
    setVersion,
    captureError,
  };
  logDebug('initialize(', options, ')');
  ignore(dispatchEvent(CrashReporterEvent.Initialize({ instance })));

  return instance;
}
export namespace CrashReporter {
  export interface TagSet {
    [name: string]: string;
  }

  export interface Options {
    /**
     * Application name
     *
     * @default `undefined`
     */
    app?: string | undefined;
    /**
     * Application version
     *
     * @default `undefined`
     */
    version?: string | undefined;
    /**
     * Application environment (production, staging, etc)
     *
     * @default `undefined`
     */
    environment?: string | undefined;
    /**
     * No crash report are sent if `false`
     *
     * @default `true`
     */
    enabled?: boolean;
    /**
     * Verbose debug message are shown
     *
     * @default `false`
     */
    debug?: boolean;
    /**
     * Tags as a record `production:enabled`, `type:application`, 'test'
     *
     * @default `{}`
     */
    tags?: TagSet;
    /**
     * Plugin Adapter to handle events
     *
     * @default `EmptyPlugin()`
     */
    plugin?: CrashReporter.Plugin;
  }

  export interface Plugin {
    /**
     * Plugin name
     */
    name: string;
    /**
     * Plugin event handler
     */
    dispatchEvent(event: CrashReporterEvent): void | Promise<void>;
  }
}
