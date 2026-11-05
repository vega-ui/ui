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

### Sizes

`size` maps to the text scale: `sm`, `md` and `lg` pair with the field sizes of the same name.

<!-- example: label/label-sizes.tsx -->
```tsx
import { Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

const SIZES = ['sm', 'md', 'lg'] as const;

export default function LabelSizes() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-${size}`} size={size}>Project name ({size})</Label>
          <TextField size={size}>
            <TextFieldInput id={`${id}-${size}`} />
          </TextField>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- removing the native label element semantics
- styling labels so lightly that they become indistinguishable from helper text
