import type * as Sentry from '@sentry/types';
import { CrashReporterEvent } from '../event.js';
import type { CrashReporter } from '../crashReporter.js';

const assertNever = (_value: never) => {};

export interface SentryRequiredOptions extends Pick<Sentry.Options, 'debug' | 'enabled' | 'release' | 'environment'> {}

export interface SentryModule<Options extends SentryRequiredOptions> {
  init(options?: Options): void;
  setUser(user: unknown): void;
  setTags(tags: unknown): void;
  captureException(error: unknown, options?: unknown): void;
}

/**
 * @see https://docs.sentry.io/platforms/javascript/guides/capacitor/configuration/
 * @param options
 */
export function SentryPlugin<Options extends SentryRequiredOptions>(
  sentryModule: SentryModule<Options>,
  options?: Options,
): CrashReporter.Plugin {
  return {
    name: 'sentry',
    dispatchEvent(event) {
      switch (event._) {
        case CrashReporterEvent.Initialize.typeName: {
          const {
            instance: { app, version, enabled, environment, tags, debug },
          } = event;
          // @ts-ignore Cannot get rid of this error
          sentryModule.init({
            release: `${app ?? ''}@${version.current ?? ''}`,
            debug,
            environment,
            enabled,
            ...options,
          });
          sentryModule.setTags(tags);
          break;
        }
        case CrashReporterEvent.UpdateUser.typeName: {
          if (event.user == null) {
            sentryModule.setUser(null);
          } else {
            const { id, ...other } = event.user;
            sentryModule.setUser({
              id: id == null ? id : String(id),
              ...other,
            });
          }
          break;
        }
        case CrashReporterEvent.UpdateVersion.typeName: {
          // @ts-ignore Cannot get rid of this error
          sentryModule.init({
            release: `${event.instance.app ?? ''}@${event.version}`,
          });
          break;
        }
        case CrashReporterEvent.CaptureError.typeName: {
          const { error, tags } = event;
          sentryModule.captureException(error, {
            tags,
          });
          break;
        }
        default: {
          assertNever(event);
        }
      }
    },
  };
}
