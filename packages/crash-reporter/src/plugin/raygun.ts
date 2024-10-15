import rg4js, { type RaygunOptions, type RaygunStatic } from 'raygun4js';
import { CrashReporterEvent } from '../event.js';
import type { CrashReporter } from '../crashReporter.js';

const assertNever = (_value: never) => {};
const toRaygunTags = (tagSet: CrashReporter.TagSet): Array<string> =>
  Object.entries(tagSet).map(([key, value]) => `${key}${value.length > 0 ? ':' : ''}${String(value)}`);
const getDOMLoaded = () =>
  new Promise<void>((resolve) => {
    window.addEventListener('load', () => {
      resolve();
    });
  });

const getRaygunStatic = () =>
  new Promise<RaygunStatic>((resolve) => {
    // @ts-ignore lib typing is wrong
    rg4js('getRaygunInstance', (raygun: RaygunStatic) => resolve(raygun));
  });

/**
 * @see https://github.com/MindscapeHQ/raygun4js#initialization-options
 * @param options
 */
export function RaygunPlugin(options: RaygunPlugin.Option): CrashReporter.Plugin {
  const { raygunInstance: raygunInstanceOption, apiKey, ...raygunOptions } = options;

  let raygunInstanceRef: RaygunStatic | undefined = raygunInstanceOption;
  const getRaygunInstance = async () => {
    if (raygunInstanceOption != null) {
      return raygunInstanceOption;
    }
    await getDOMLoaded();
    const raygunInstanceStatic = await getRaygunStatic();
    if (raygunInstanceRef == null) {
      raygunInstanceRef = raygunInstanceStatic.constructNewRaygun();
    }
    return raygunInstanceRef;
  };

  return {
    name: 'raygun',
    async dispatchEvent(event) {
      const raygunInstance = await getRaygunInstance();

      switch (event._) {
        case CrashReporterEvent.Initialize.typeName: {
          const {
            instance: { version, environment, tags, debug },
          } = event;
          raygunInstance.init(apiKey, { debugMode: debug, ...raygunOptions });
          raygunInstance.attach();
          if (version.current != null) {
            raygunInstance.setVersion(version.current);
          }
          const tagList = toRaygunTags(environment == null ? tags : { environment, ...tags });
          if (tagList.length > 0) {
            raygunInstance.withTags(tagList);
          }
          break;
        }
        case CrashReporterEvent.UpdateUser.typeName: {
          const { user } = event;
          if (user == null) {
            raygunInstance.resetAnonymousUser();
          } else {
            const isAnonymous = user.id == null;
            raygunInstance.setUser(user.id as string, isAnonymous, user.email, user.displayName);
          }
          break;
        }
        case CrashReporterEvent.UpdateVersion.typeName: {
          raygunInstance.setVersion(event.version);
          break;
        }
        case CrashReporterEvent.CaptureError.typeName: {
          raygunInstance.send(
            // @ts-ignore Thrown error are typed as unknown
            event.error,
            undefined,
            toRaygunTags(event.tags),
          );
          break;
        }
        default: {
          assertNever(event);
        }
      }
    },
  };
}
export namespace RaygunPlugin {
  export interface Option extends RaygunOptions {
    /**
     * Raygun API Key
     */
    apiKey: string;
    /**
     * Optional raygunInstance, will create one if omitted
     */
    raygunInstance?: RaygunStatic;
  }
}
