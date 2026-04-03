# CheckboxCard Styling

## Overview

`CheckboxCard` builds on `Card` and adds a small card-specific styling layer for orientation, hover, checked, indeterminate, and disabled border treatment.

## Public CSS Variables

| Variable | Purpose |
| --- | --- |
| `--checkbox-card-background-color` | card surface override hook |
| `--card-border-color` | main border color, adjusted by state |

## Part-Level Variables

### Root

The root `.checkboxCard` element owns orientation, hover, active, checked, and disabled border styling.

### Content

`CheckboxCardContent`, `CheckboxCardTitle`, and `CheckboxCardDescription` rely mostly on the `Card` text and spacing layer.

### Control

The control visuals are driven by the composed checkbox-card control parts.

## State And Variant Interaction

- `data-orientation='vertical' | 'horizontal'` changes layout direction and spacing.
- `data-variant='primary' | 'secondary'` changes checked and indeterminate border color.
- `:has(input[type='checkbox']:checked)` and `:has(...:indeterminate)` drive selected border state.
- Disabled state remaps the border color to disabled theme tokens.

## Examples

### Local minimum width override

```css
.compactPlanCard {
  min-width: 180px;
}
```

```tsx
<CheckboxCard className='compactPlanCard'>
  <CheckboxCardContent>
    <CheckboxCardTitle>Starter</CheckboxCardTitle>
    <CheckboxCardDescription>Good for small teams and internal pilots.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl />
</CheckboxCard>
```

## Do Not Override

- breaking the labeled-card click target with pointer-events hacks
- styling checked cards in ways that hide disabled or indeterminate state
- treating descriptive text spacing as if it were independent from card orientation
