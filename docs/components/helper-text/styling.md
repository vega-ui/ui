# HelperText Styling

## Overview

`HelperText` uses the shared text system with a small local color contract.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--label-tertiary` | root default | neutral helper-copy color |
| `--color-error` | root error state | validation/adverse tone |

## Part-Level Variables

### Root

The root sets `display: inline-block` and changes color based on `data-error`.

## State And Variant Interaction

- default state uses `--label-tertiary`
- `error` uses `--color-error`
- font size still comes from the `Text` size mapping chosen by the helper-text size mapper

## Examples

### Error helper copy

```tsx
<HelperText error>Enter a valid email address.</HelperText>
```

## Do Not Override

- making helper and primary label colors indistinguishable
- using error red for neutral guidance by default
