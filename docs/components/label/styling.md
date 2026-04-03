# Label Styling

## Overview

`Label` has a minimal local styling contract. It mostly inherits typography from `Text` and only adds `display: inline-block`.

## Public CSS Variables

There are no dedicated public `--label-*` component-local variables for `Label`.

The component inherits the `Text` token model, including:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--default-font-family` | `Text` foundation | base label font family |
| `--text-color` | inherited text color | readable label color |
| `--text-font-size-*` | size scale | label size mapping |
| `--line-height-*` | size scale | label line-height mapping |

## Part-Level Variables

### Root

`Label` itself only sets `display: inline-block`. Typography comes from `Text`.

## State And Variant Interaction

- visual sizing is inherited from the text-size data attributes
- no dedicated disabled or error styling is defined on the label root
- disabled presentation usually comes from surrounding layout or the associated control

## Examples

### Compact inline label

```tsx
<Label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Checkbox />
  Send weekly digest
</Label>
```

## Do Not Override

- removing the native label element semantics
- styling labels so lightly that they become indistinguishable from helper text
