import type { CrashReporter } from '../crashReporter.js';

export function EmptyPlugin(): CrashReporter.Plugin {
  return {
    name: 'empty',
    dispatchEvent(_event) {},
  };
}
