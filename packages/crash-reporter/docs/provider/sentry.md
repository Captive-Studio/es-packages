# Sentry Capacitor Plugin

## Setup

```ts
import { CrashReporter } from '@app/crash-reporter';
import { SentryCapacitorPlugin } from '@app/crash-reporter/dist/plugin/sentryCapacitor';

const crashReporter = CrashReporter({
    plugin: SentryCapacitorPlugin({
        dsn: '...',  
    }),
});
```

## Options

See [Official Sentry Documentation](https://docs.sentry.io/platforms/javascript/guides/capacitor/configuration/)
