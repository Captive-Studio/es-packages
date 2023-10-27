# Sentry Capacitor Plugin

## Setup

```ts
import { CrashReporter } from '@captive/crash-reporter';
import { SentryCapacitorPlugin } from '@captive/crash-reporter/dist/plugin/sentryCapacitor';

const crashReporter = CrashReporter({
    plugin: SentryCapacitorPlugin({
        dsn: '...',  
    }),
});
```

## Options

See [Official Sentry Documentation](https://docs.sentry.io/platforms/javascript/guides/capacitor/configuration/)
