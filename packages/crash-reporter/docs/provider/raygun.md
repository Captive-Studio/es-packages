# Raygun Plugin

## Setup

```ts
import { CrashReporter } from '@app/crash-reporter';
import { RaygunPlugin } from '@app/crash-reporter/dist/plugin/raygun';

const crashReporter = CrashReporter({
    plugin: RaygunPlugin({
        apiKey: '...',
        // ... all properties from raygun4js.init()
        // @see https://github.com/MindscapeHQ/raygun4js#initialization-options  
    }),
});
```

## Options

See [Official Raygun4Js Documentation](https://github.com/MindscapeHQ/raygun4js#initialization-options)
