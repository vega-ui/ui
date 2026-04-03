# Backdrop Styling

## Overview

`Backdrop` styling is minimal and driven by visibility, blur, and the global overlay token.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--overlay` | pseudo-element | overlay tint |

## Part-Level Variables

### Root

The root uses `FloatingOverlay` and establishes the layout box plus stacking context.

### Pseudo-element

The `::after` pseudo-element renders the visible overlay fill and optional blur.

## State And Variant Interaction

- `data-visible='true'` makes the overlay tint visible
- `data-blurred='true'` enables `backdrop-filter: blur(20px)`
- hidden state keeps the pseudo-element transparent and not visible

## Examples

### Non-blurred overlay

```tsx
<Backdrop visible blurred={false} />
```

## Do Not Override

- treating the backdrop tint as an arbitrary brand surface
- relying on the backdrop to express modal semantics by itself
