# Checkbox Anatomy

## Overview

`Checkbox` is a [compound component](../../glossary.md#compound-component) that coordinates checked, indeterminate, disabled, and form-participation behavior across a root label and exported visual parts.

## Required Parts

### `Checkbox`

Required. Owns size, variant, checked, indeterminate, and disabled state.

### `CheckboxIndicator`

Required for the visible control surface.

### `CheckboxInput`

Required. The visually hidden native checkbox: focus, keyboard, checked state and form value come from it. Without it the indicator is an empty, unfocusable box.

## Optional Parts

### `CheckboxCheckedIcon`

Optional checked-state icon inside the indicator.

### `CheckboxIndeterminateIcon`

Optional indeterminate-state icon inside the indicator.

## Composition Order

1. `Checkbox`
2. `CheckboxInput`
3. `CheckboxIndicator`
4. `CheckboxCheckedIcon`
5. `CheckboxIndeterminateIcon`
6. label text

## Valid Composition Patterns

Two valid shapes: text inside the `Checkbox` root, which is the `<label>` and gives the input its name, and a bare checkbox (for example in a table cell) whose `CheckboxInput` gets an `aria-label`. `CheckboxIndeterminateIcon` can be left out when the checkbox never becomes indeterminate.

<!-- example: checkbox/valid-composition-patterns.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput name='archived' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Show archived projects
      </Checkbox>
      <Checkbox>
        <CheckboxInput aria-label='Select Q3 marketing report' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
        </CheckboxIndicator>
      </Checkbox>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Visual indicator without `CheckboxInput`

This leaves no focusable control and breaks native form participation.

### Indeterminate used as a final persisted state by accident

Indeterminate is usually a visual partial-selection state, not a separate business value.

### Split label and indicator as separate click targets

The root label should keep the control and text together as one interaction row.
