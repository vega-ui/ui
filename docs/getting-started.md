# Getting Started

Use this guide to integrate VegaUI into an application or to run the repository locally. It is based on the actual package layout in this monorepo, not on marketing-level README snippets.

## Prerequisites

- `react` and `react-dom` `^19.0.0`
- a bundler that can load package CSS
- `pnpm` for local work in this repository

## Install In An App

Install the React package and the theme package together:

```bash
pnpm add @vega-ui/react @vega-ui/theme-core
```

Why both:

- `@vega-ui/react` provides components and compiled component CSS
- `@vega-ui/theme-core` provides the global semantic theme variables those components rely on

## Connect Styles

Import the theme once near the application entrypoint and import the component stylesheet once:

```tsx
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
```

If your app uses CSS layers, keep library styles below app overrides:

```css
@import url('@/shared/styles/normalize.css') layer(reset);
@import url('@vega-ui/theme-core') layer(theme);
@import url('@vega-ui/react/style.css') layer(library);

@layer reset, theme, library, app, overrides;
```

## Minimal App Shell

Apply a theme class at the app boundary:

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

Available built-in theme classes are `.light` and `.dark`. For custom themes, see [themes.md](/Users/slava/WebstormProjects/ui/docs/styling/themes.md).

## Fonts

The repository examples use `Montserrat`, but VegaUI does not hard-require that font. Use your application font stack unless the product design specifically matches the Storybook examples.

## Local Repository Development

```bash
pnpm install
pnpm storybook
pnpm test
pnpm docs:validate
```

- `pnpm storybook`: run the component playground locally
- `pnpm test`: run the workspace test suite
- `pnpm docs:validate`: validate the documentation structure contract
- `pnpm --filter @vega-ui/react test`: run browser tests only for the main UI package

## Common Setup Mistakes

- Importing `@vega-ui/react/style.css` without `@vega-ui/theme-core`, which leaves semantic theme variables undefined.
- Applying `.light` or `.dark` too deep in the tree instead of around the app shell.
- Using raw palette tokens directly in app component overrides instead of semantic theme variables.
- Treating Storybook font choices as a runtime requirement for the library.

See also: [Glossary](./glossary.md) for terms such as [Source Of Truth](./glossary.md#source-of-truth).
