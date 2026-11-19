# @vega-ui/react

React component library for VegaUI.

## Requirements

- `react` and `react-dom` `^19.0.0`
- a bundler that loads CSS imported from packages, such as Vite, webpack or Next.js

## Install

```bash
pnpm add @vega-ui/react @vega-ui/theme-core
```

- `@vega-ui/react`: the components and their stylesheet.
- `@vega-ui/theme-core`: the light and dark themes the components read their colors from.

The components draw no icons of their own: pass any icon set or your own SVG. The examples use `@vega-ui/icons`, built on `lucide-react`; add it with `pnpm add @vega-ui/icons` to copy them as they are.

## Connect Styles

Components do not import their CSS. Import the theme and the stylesheet once, at the app entry point, theme first:

```tsx
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
```

With CSS layers:

```css
@layer theme, library, app;

@import url('@vega-ui/theme-core') layer(theme);
@import url('@vega-ui/react/style.css') layer(library);
```

## Apply A Theme

Put `.light` or `.dark` on `<html>` or `<body>`. `Dialog`, `Drawer` and `Sheet` render into `document.body` and only pick up a theme set on an ancestor of `body`.

```html
<html class="light">
```

## Fonts

The default font stack is `Montserrat, Arial, sans-serif`, and the library does not load Montserrat. Load it in the app, or replace the stack:

```css
:root {
  --default-font-family: Inter, system-ui, sans-serif;
}
```

## Imports

```tsx
import { Button, Dialog, Select, TextField } from '@vega-ui/react';
import type { ButtonProps, SelectProps } from '@vega-ui/react';
```

Per-component entry points are available too:

```tsx
import { Button } from '@vega-ui/react/Button';
```

## Package Scripts

```bash
pnpm --filter @vega-ui/react build
pnpm --filter @vega-ui/react test
pnpm --filter @vega-ui/react check-types
```

## Documentation

- [Getting started](../../docs/en/getting-started.md)
- [Styling](../../docs/en/styling/README.md)
- [Components](../../docs/en/components/README.md)
