# Separator Styling

## Overview

`Separator` has a very small styling contract driven by orientation and one shared color token.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--color-gray-accent-200` | root | divider color |

## Part-Level Variables

### Root

The root starts as a full-width horizontal line and switches dimensions based on `data-orientation`.

## State And Variant Interaction

- `horizontal` uses `width: 100%` and `height: 1px`
- `vertical` uses `width: 1px` and `height: 100%`
- there are no component-local state variants

## Examples

### Subtle horizontal divider

```tsx
<Separator />
```

### Vertical toolbar divider

```tsx
<div style={{ height: 24 }}>
  <Separator orientation='vertical' />
</div>
```

## Do Not Override

- relying on the separator to create spacing by itself
- using a decorative divider where semantic grouping is required
