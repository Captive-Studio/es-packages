import * as Sentry from '@sentry/capacitor';
import { CrashReporterEvent } from '../event.js';
import type { CrashReporter } from '../crashReporter.js';

const assertNever = (_value: never) => {};

/**
 * @see https://docs.sentry.io/platforms/javascript/guides/capacitor/configuration/
 * @param options
 */
export function SentryCapacitorPlugin(options: SentryCapacitorPlugin.Option): CrashReporter.Plugin {
  return {
    name: 'sentry',
    dispatchEvent(event) {
      switch (event._) {
        case CrashReporterEvent.Initialize.typeName: {
          const {
            instance: { app, version, enabled, environment, tags, debug },
          } = event;
          Sentry.init({
            release: `${app ?? ''}@${version.current ?? ''}`,
            debug,
            environment,
            enabled,
            ...options,
          });
          Sentry.setTags(tags);
          break;
        }
        case CrashReporterEvent.UpdateUser.typeName: {
          if (event.user == null) {
            Sentry.setUser(null);
          } else {
            const { id, ...other } = event.user;
            Sentry.setUser({
              id: id == null ? id : String(id),
              ...other,
            });
          }
          break;
        }
        case CrashReporterEvent.UpdateVersion.typeName: {
          Sentry.init({
            release: `${event.instance.app ?? ''}@${event.version}`,
          });
          break;
        }
        case CrashReporterEvent.CaptureError.typeName: {
          const { error, tags } = event;
          Sentry.captureException(error, {
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
export namespace SentryCapacitorPlugin {
  export interface Option extends Sentry.CapacitorOptions {}
}
