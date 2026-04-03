# CSS Variables

VegaUI styling is built as a layered CSS variable system.

## Layers

1. raw token variables from `@vega-ui/tokens-core`
2. semantic application variables from `@vega-ui/theme-core`
3. component-local variables from `packages/ui/src/**/style.module.css`

## How The Layers Work Together

Example flow:

1. `--color-blue-500` is defined in the token layer
2. the active theme maps that scale into semantic variables such as `--color-blue-accent-500`, `--text-color`, or `--fills-primary`
3. a component may then expose local variables such as `--select-value-color` or `--select-size`

That means component docs should distinguish three override levels:

- token override: broad system-level change
- theme override: semantic application change
- component override: targeted local tuning

## Preferred Override Order

Start with the broadest safe level:

1. adjust theme semantics when the change should affect many components
2. adjust component-local `--component-*` variables when only one component family should change
3. use direct style overrides only when neither tokens nor documented variables cover the case

This rule matters because raw token overrides spread across the whole system quickly, while semantic theme overrides remain predictable and component-local overrides stay contained.

## Example

```tsx
<Select
  style={{
    '--select-size': '44px',
    '--select-value-color': 'var(--color-primary-700)',
  } as React.CSSProperties}
>
  {/* parts */}
</Select>
```

In this example:

- `--color-primary-700` comes from the semantic theme layer
- `--select-size` and `--select-value-color` are component-local variables

## Guidance

- do not treat every CSS custom property in source as stable public API
- prefer documented semantic variables over raw palette values
- keep theme concerns global and component overrides local
