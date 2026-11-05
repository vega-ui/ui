# Getting started

Install the packages, connect the styles and the theme, and render your first component.

## Requirements

- `react` and `react-dom` `^19.0.0`
- a bundler that loads CSS imported from packages, such as Vite, webpack or Next.js

## Install

```bash
pnpm add @vega-ui/react @vega-ui/theme-core @vega-ui/icons
```

- `@vega-ui/react`: the components and their stylesheet.
- `@vega-ui/theme-core`: the light and dark themes. Components read their colors, surfaces and text from its variables, so without it they render unstyled.
- `@vega-ui/icons`: the icons used across the examples. `@vega-ui/react` already depends on it, but pnpm and Yarn Plug'n'Play only let the app import packages it lists itself.

Install `@vega-ui/i18n` as well when the app uses calendar systems or the date helpers directly. See [Dates and calendar systems](./i18n.md#install).

## Connect Styles

Components do not import their CSS. Import the theme and the stylesheet once, at the app entry point, theme first:

```tsx
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
```

With CSS layers, declare the order first and import the library into its own layers, so app styles win regardless of specificity:

```css
@layer theme, library, app;

@import url('@vega-ui/theme-core') layer(theme);
@import url('@vega-ui/react/style.css') layer(library);
```

Styles outside any layer win over every layer, so app styles can also stay unlayered.

## Apply A Theme

The theme variables are defined on the `.light` and `.dark` classes. Put the class on the root element:

```html
<html class="light">
```

Keep it on `<html>` or `<body>`, not on an inner wrapper. `Dialog`, `Drawer` and `Sheet` render into `document.body`, outside the app tree, and only pick up a theme set on an ancestor of `body`.

To switch the theme, replace the class. Custom themes are described in [Themes](./styling/themes.md).

## Fonts

The default font stack is `Montserrat, Arial, sans-serif`. The library does not load Montserrat: without it in the app, text falls back to Arial.

Load Montserrat in the app, or set your own stack:

```css
:root {
  --default-font-family: Inter, system-ui, sans-serif;
}
```

Headings follow `--default-font-family`. Code uses `--code-font-family`.

## First Component

```tsx
import { Button } from '@vega-ui/react';

export function App() {
  return <Button>Save changes</Button>;
}
```

For Next.js and server rendering, see [Next.js and SSR](./nextjs.md).

## Common Mistakes

- Only `@vega-ui/react/style.css` is imported: without `@vega-ui/theme-core` the variables are undefined.
- The theme class is on an inner wrapper: `Dialog`, `Drawer` and `Sheet` open without a theme.
- Montserrat is not loaded and the font stack is not replaced: text renders in Arial.
- `@vega-ui/icons` is imported but not installed: the build fails to resolve it.

## Working On The Library

```bash
pnpm install
pnpm storybook
pnpm test
pnpm docs:validate
```

- `pnpm storybook`: the component playground.
- `pnpm test`: the tests of every package; component tests run in Chromium, Firefox and WebKit.
- `pnpm --filter @vega-ui/react test`: the component tests only.
- `pnpm docs:validate`: checks the structure of the documentation.
