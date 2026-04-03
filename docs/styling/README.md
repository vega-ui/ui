# Styling

This section documents the global styling model behind VegaUI. Use it before reading component-level `styling.md` files.

## Scope

- `tokens.md`: global design tokens from `@vega-ui/tokens-core`
- `themes.md`: light and dark theme layers from `@vega-ui/theme-core`
- `css-variables.md`: how global and component variables are composed in real apps

## Source Of Truth

- `packages/tokens/src/*.css`: raw token definitions
- `packages/theme/src/*.css`: semantic theme layers
- `packages/ui/src/**/style.module.css`: component-level override points

## Mental Model

Use the styling system in this order:

1. import global tokens
2. apply a theme class such as `.light` or `.dark`
3. consume semantic variables in components
4. use component-local `--component-*` variables only for targeted overrides
