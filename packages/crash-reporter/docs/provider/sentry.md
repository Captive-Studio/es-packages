# Sentry Capacitor Plugin

## Setup

```ts
import { CrashReporter } from '@captive/crash-reporter';
import { SentryPlugin } from '@captive/crash-reporter/dist/plugin/sentry.js';
import * as Sentry from '@sentry/browser'; // or '@sentry/capacitor'

const crashReporter = CrashReporter({
    plugin: SentryPlugin(Sentry, {
        dsn: '...',  
    }),
});
```

## Options

See [Official Sentry Documentation](https://docs.sentry.io/platforms/javascript/guides/capacitor/configuration/)
