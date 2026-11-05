# Vega UI Monorepo

React component library, written by developers for developers 🩵

## Install

```bash
pnpm add @vega-ui/react @vega-ui/theme-core @vega-ui/icons
```

Import the theme and the stylesheet once, at the app entry point, and put the theme class on `<html>`:

```tsx
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
```

```html
<html class="light">
```

```tsx
import { Button } from '@vega-ui/react';

<Button>Hello, world!</Button>
```

The default font is Montserrat, which the app loads itself. Layers, themes, fonts and common mistakes are covered in [Getting started](./docs/en/getting-started.md).

## Running Tests

```bash
pnpm test
```

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.
