# Tokens

Global tokens live in `@vega-ui/tokens-core`: raw scales for color, type, radius, spacing, motion, shadow and layering that the themes build on.

The package entrypoint [packages/tokens/src/index.css](../../../packages/tokens/src/index.css) imports the token groups used across VegaUI:

- `colors.css`
- `typography.css`
- `radiuses.css`
- `spacings.css`
- `animations.css`
- `shadows.css`
- `layers.css`

## Token Categories

The token package provides raw building blocks, not component behavior.

- colors: palette scales such as `--color-blue-500`
- typography: font, size, line-height, and text treatment tokens
- radiuses: border-radius scales
- spacings: layout and control sizing scales
- animations: motion timing and transition tokens
- shadows: elevation and surface shadow tokens
- layers: z-index and layer ordering tokens

## Scales And Roundness

`--spacing` and `--radius` are the bases of the `--spacing-*` and `--radius-*` scales. The scales are computed on `:root`, so override the bases on `:root` too: a base set on a nested element does not recompute them.

`--br-ratio` sets how round the controls are. Buttons, icon buttons, fields, checkboxes, options, selects, segmented controls, grid items, badges and inline code take their corner radius as their height times this ratio, so one value changes them all. The default is `0.333`; `0.5` makes them pill-shaped and `0` square. It is read on each control, so it also works on a nested element. A component's own `--*-br-ratio` still overrides it.

```css
:root {
  --br-ratio: 0.5;
}
```

## Color Guidance

The strongest rule from [packages/tokens/README.md](../../../packages/tokens/README.md) is:

- use raw palette tokens only to define semantics
- use semantic accent tokens inside components

## Do Not Use Raw Tokens In Components

Treat this as a hard rule for normal component styles.

Use raw palette tokens such as `--color-blue-500` or `--color-gray-300` only when:

- you are defining a semantic theme variable
- you are working in the token or theme layer itself
- a component doc explicitly documents a raw token hook as public API

For regular component CSS, prefer semantic variables such as:

- `--text-color`
- `--label-primary`
- `--border-color`
- `--color-blue-accent-500`
- `--color-gray-accent-300`
- `--fills-primary`

Good:

```css
color: var(--color-primary-500);
border-color: var(--color-gray-accent-300);
```

Avoid in component styles:

```css
color: var(--color-blue-500);
border-color: var(--color-gray-300);
```

## Why Tokens And Themes Are Separate

Tokens define scales. Themes decide how those scales become semantic application variables. Components should usually consume theme semantics, not raw token values, unless a component contract explicitly documents a raw token hook.
