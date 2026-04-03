# Text Styling

## Overview

`Text` is the core body typography layer. It is driven by shared theme tokens and one internal custom property for text color.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--t-color` | root | local text-color override |
| `--default-font-family` | root | body font family |
| `--text-color` | root fallback | default readable text color |
| `--text-font-size-1` ... `--text-font-size-11` | size scale | body size mapping |
| `--line-height-1` ... `--line-height-11` | size scale | body line-height mapping |

## Part-Level Variables

### Root

The root consumes:

- `--t-color`, falling back to `--text-color`
- `--default-font-family`
- size-specific font-size and line-height tokens

## State And Variant Interaction

- weight is controlled through `data-font-weight`
- size is controlled through `data-size`
- `Text` does not define dedicated error or disabled variants; those are usually expressed through color overrides

## Examples

### Local color override

```tsx
<Text size={2} style={{ '--t-color': 'var(--label-secondary)' } as React.CSSProperties}>
  Secondary description
</Text>
```

### Larger body copy

```tsx
<Text size={5}>Plan changes take effect immediately.</Text>
```

## Do Not Override

- bypassing the shared text scale with arbitrary hard-coded font sizes
- making primary body copy use placeholder-like colors by default
