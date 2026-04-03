# Checkbox Anatomy

## Overview

`Checkbox` is a [compound component](../../glossary.md#compound-component) that coordinates checked, indeterminate, disabled, and form-participation behavior across a root label and exported visual parts.

## Required Parts

### `Checkbox`

Required. Owns size, variant, checked, indeterminate, and disabled state.

### `CheckboxIndicator`

Required for the visible control surface.

## Optional Parts

### `CheckboxHiddenInput`

Recommended when the checkbox should participate in native forms.

### `CheckboxCheckedIcon`

Optional checked-state icon inside the indicator.

### `CheckboxIndeterminateIcon`

Optional indeterminate-state icon inside the indicator.

## Composition Order

1. `Checkbox`
2. `CheckboxHiddenInput`
3. `CheckboxIndicator`
4. `CheckboxCheckedIcon`
5. `CheckboxIndeterminateIcon`
6. label text

## Valid Composition Patterns

```tsx
<Checkbox>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Receive updates
</Checkbox>
```

## Invalid Composition Patterns

### Visual indicator without a hidden input in real forms

This breaks native form participation.

### Indeterminate used as a final persisted state by accident

Indeterminate is usually a visual partial-selection state, not a separate business value.

### Split label and indicator as separate click targets

The root label should keep the control and text together as one interaction row.
