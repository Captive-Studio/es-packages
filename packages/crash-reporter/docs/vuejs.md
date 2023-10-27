# VueJS Plugin

## Setup

```ts
import { createApp } from 'vue';
import { createCrashReporter } from '@app/crash-reporter/dist/vue';

const CrashReporter = createCrashReporter({
    plugin: EmptyPlugin(),
});
const app = createApp({})
  .use(CrashReporter);
```

### Options

See [Crash Reporter](./crash-reporter.md#options)

## Recipes

### Composition API : use `useCrashReporter()`

```html
<script setup>
import { useCrashReporter } from '@app/crash-reporter/dist/vue';

const crashReporter = useCrashReporter();
</script>

```

### Option API : use globalProperty `$crashReporter` or `useCrashReporter()`

```ts
import { useCrashReporter } from '@app/crash-reporter/dist/vue';

export default {
    name: 'MyComponent',
    setup() {
        const { 
            $crashReporter,
         } = this;
         // OR 
         const crashReporter = useCrashReporter();
    }
}
```

### More

All recipes for ES client can be applied to VueJS plugin. See [all recipes](./crash-reporter.md)
