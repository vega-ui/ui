# Card Styling

## Overview

`Card` styling is concentrated in one grouped surface with appearance-driven border treatment and size-driven padding.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--card-border-color` | `Card` | Border color. |
| `--card-background-color` | `Card` | Surface background. |

## Part-Level Variables

- `Card`: owns the entire surface, padding, and radius treatment.

## State And Variant Interaction

- `size` changes padding and radius.
- `appearance='outline'` shows border treatment.
- `appearance='transparent'` removes card-level border emphasis.

## Examples

```css
.brandCard {
  --card-border-color: var(--border-color);
}
```

```css
.softCard {
  --card-background-color: var(--surface-primary);
}
```

## Do Not Override

- Do not rely on transparent cards where the parent background is visually noisy.
- Do not use card styling as a substitute for semantic heading structure.
- Do not expect the surface to solve internal spacing automatically.
