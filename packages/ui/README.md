# @vega-ui/react

React component library for VegaUI.

## Requirements

- `react` `^19.0.0`
- `react-dom` `^19.0.0`
- a bundler that can import package CSS

## Installation

Install the component package together with the global theme package:

```bash
pnpm add @vega-ui/react @vega-ui/theme-core
```

Why both:

- `@vega-ui/react` provides components and compiled component CSS
- `@vega-ui/theme-core` provides the semantic theme variables those components rely on

## Styles

Import the theme and component stylesheet once near the application entrypoint:

```tsx
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
```

If your app uses CSS layers, keep VegaUI below app-specific overrides:

```css
@import url('@/shared/styles/normalize.css') layer(reset);
@import url('@vega-ui/theme-core') layer(theme);
@import url('@vega-ui/react/style.css') layer(library);

@layer reset, theme, library, app, overrides;
```

## Quick Start

Apply a theme class at the app boundary, then render components normally:

```tsx
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
import { Button } from '@vega-ui/react';

export function App() {
  return (
    <div className='light'>
      <Button>Save changes</Button>
    </div>
  );
}
```

Built-in theme classes are `.light` and `.dark`.

## Common Import Paths

```tsx
import { Button, Dialog, Select, TextField } from '@vega-ui/react';
import type { ButtonProps, SelectProps } from '@vega-ui/react';
```

The package also exposes per-component entrypoints:

```tsx
import { Button } from '@vega-ui/react/Button';
```

## Local Development

From the repository root:

```bash
pnpm install
pnpm storybook
pnpm --filter @vega-ui/react test
pnpm docs:validate
```

Package-local scripts:

```bash
pnpm --filter @vega-ui/react build
pnpm --filter @vega-ui/react test
pnpm --filter @vega-ui/react check-types
```

## Documentation

- [Getting Started](../../docs/getting-started.md)
- [Styling Model](../../docs/styling/README.md)
- [Component Docs](../../docs/components/README.md)

## Common Mistakes

- importing `@vega-ui/react/style.css` without `@vega-ui/theme-core`
- applying `.light` or `.dark` too deep in the tree instead of around the app shell
- using raw palette tokens in app overrides instead of semantic theme variables
- assuming the component package is fully themed without an app-level theme class
