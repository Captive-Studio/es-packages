# ES only

## Setup

```ts
import { CrashReporter } from '@app/crash-reporter';

const crashReporter = CrashReporter({
    // app: 'my-app',
    // enabled: true | false,
    // plugin: RaygunPlugin() | ...
});
```

### Options

| Name          | Description                                        | Type                     | Default         | Required |
|---------------|----------------------------------------------------|--------------------------|-----------------|----------|
| `app`         | Application name                                   | `string`                 |                 |          |
| `version`     | Application version                                | `string`                 |                 |          |
| `environment` | Application environment (production, staging, ...) | `string`                 |                 |          |
| `enabled`     | If false, all features are disabled                | `boolean`                | `true`          |          |
| `tags`        | Global tags { [tagName]: 'tagValue' }              | `Record<string, string>` | `{}`            |          |
| `plugin`      | Adapter Plugin for provider (raygun, sentry, etc)  | `CrashReporter.Plugin`   | `EmptyPlugin()` |          |

### Plugins

* [Raygun](./provider/raygun.md)
* [Sentry](./provider/sentry.md)

## Recipes

### Identify Users

```ts
const crashReporter: CrashReporter // = ...;

crashReporter.setUser({
    id: 'my-id',
    email: 'foo@bar.com',
    displayName: 'Foo Bar',
});
```

### Update version (after hot reload for example)

```ts
const crashReporter: CrashReporter // = ...;

crashReporter.setVersion('1.0.0-hotfix');
```

### Capture a custom error

```ts
const crashReporter: CrashReporter // = ...;

function testCrash() {
    throw new Error('This is a test error');
}

try {
    testCrash();
} catch (error) {
    crashReporter.captureError({ 
        error, // Error to capture
        tags: { 'test': '' } // Custom tags
    });
    throw error;
}
```
