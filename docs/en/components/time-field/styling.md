# TimeField Styling

## Overview

`TimeField` inherits the `TextField` styling contract. Its distinct behavior is masking and parsing, not a separate visual surface.

## Public CSS Variables

There are no dedicated public `--time-field-*` variables in the current implementation.

The component inherits the relevant `TextField` surface tokens:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--input-height` | inherited wrapper/input | field height |
| `--fills-tertiary` | inherited wrapper | default surface |
| `--color-primary-500` | inherited wrapper | focus outline |
| `--color-error` | inherited wrapper | error outline |

## Part-Level Variables

### Root

The root is a `TextField` wrapper with time-specific context only.

### Input

`TimeFieldInput` is a masked `TextFieldInput` and inherits its typography and spacing.

## State And Variant Interaction

- format changes input behavior, not visual styling
- bounds and step affect masking logic, not the surface
- error and disabled visuals come from the inherited field/input contract
- the error look follows `aria-invalid='true'`, `:user-invalid` or `[data-user-edited]:invalid` on `TimeFieldInput`

`TimeField` writes the text of `TimeFieldInput` itself, and Chromium and WebKit do not count that text as an edit of the user, so the input does not match `:user-invalid` after it. In your own CSS, pair `:user-invalid` with `[data-user-edited]:invalid`:

```css
.pickup-time:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

## Examples

### Field sizes

`size` on the root sets the height, padding and font size of the inherited `TextField` surface: `sm`, `md` (default) or `lg`.

<!-- example: time-field/field-sizes.tsx -->
```tsx
import { TimeField, TimeFieldInput } from '@vega-ui/react';

export default function FieldSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 200 }}>
      <TimeField size='sm' defaultValue='09:30'>
        <TimeFieldInput aria-label='Small time field' />
      </TimeField>
      <TimeField size='md' defaultValue='09:30'>
        <TimeFieldInput aria-label='Medium time field' />
      </TimeField>
      <TimeField size='lg' defaultValue='09:30'>
        <TimeFieldInput aria-label='Large time field' />
      </TimeField>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- treating format changes as a styling concern
- documenting time-specific styling variables that do not exist in source
