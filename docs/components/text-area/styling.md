# TextArea Styling

## Overview

`TextArea` is a single surface driven by shared field tokens and size-specific padding and min-height values.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--textarea-height` | root | min-height baseline |
| `--textarea-br-ratio` | root | border-radius ratio |
| `--fills-tertiary` | root | default surface |
| `--fills-tertiary-hover` | root | hover surface |
| `--color-primary-500` | root | focus outline |
| `--color-error` | root | error outline |

## Part-Level Variables

### Root

The root sets size-specific padding, type scale, min height, and state colors.

## State And Variant Interaction

- `data-size` maps to spacing and typography
- `data-full-width='true'` sets `width: 100%`
- `data-error='true'` switches the outline to error color
- disabled state changes both foreground and surface tokens

## Examples

### Full-width notes area

```tsx
<TextArea fullWidth placeholder='Add rollout notes' />
```

## Do Not Override

- making placeholder and entered text visually indistinguishable
- overriding disabled styling so the field still looks editable
