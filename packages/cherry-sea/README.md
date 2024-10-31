# Cherry Sea _(@captive/cherry-sea)_

> Theme for Tailwind or vanilla CSS

## Installation

NPM :

```sh
npm install @captive/cherry-sea --save
```

Yarn :

```sh
yarn add @captive/cherry-sea
```

## Usage

### Javascript import

```javascript
import { colors, spacing, fonts } from '@captive/cherry-sea';
```

### Tailwind

```javascript
import { colors, spacing, fonts } from '@captive/cherry-sea';

module.exports = {
  theme: {
    extend: {
      colors: colors,
      spacing: spacing,
      fontFamily: fonts,
    }
  }
}
```

```html
<h1 class="text-pink-vivid-500 font-brand mt-space-200">Title</h1>
<!--
  Here, the title will have
  - text-pink-vivid-500: color of the pink vivid 500 (#d9127c)
  - font-brand: the brand font (Barlow)
  - mt-space-200: margin-top of 32px (space-200)
-->
```

@see Tailwind documentation for more :
- [colors](https://tailwindcss.com/docs/customizing-colors)
- [spacing](https://tailwindcss.com/docs/customizing-spacing)
- [fonts](https://tailwindcss.com/docs/font-family)

## Documentation

- [Colors](https://captive.notion.site/UI-Nuanciers-Captive-pour-le-web-et-mobile-ee189f2db6e543e6bc7cba77c9e8dff5?pvs=4)
- [Spacings](https://captive.notion.site/UI-Espacement-du-Design-System-Captive-cc192b02b57d453fa0da9fdc6d1234c2?pvs=4)
- [Fonts](https://captive.notion.site/UI-Typographie-Captive-85c60f5a849f4adaacaf18cc4aff2cea?pvs=4)
