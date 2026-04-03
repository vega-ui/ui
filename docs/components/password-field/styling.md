# PasswordField Styling

## Overview

`PasswordField` reuses the `TextField` styling contract. Its unique visual layer is the toggle icon button, which maps to the shared input height and hover tokens.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--input-height` | toggle button | keeps the toggle square with the field height |
| `--text-color` | toggle button | default icon color |
| `--fills-quaternary-hover` | toggle button | hover surface |
| `--fills-quaternary-active` | toggle button | active surface |

## Part-Level Variables

### Root

The root inherits the same wrapper contract as `TextField`.

### Toggle Button

`PasswordFieldToggleIconButton` maps `--icon-button-size` to `--input-height` and uses transparent background until hover or active state.

## State And Variant Interaction

- size flows from the `TextField` root
- disabled behavior is inherited through input and context
- shown/hidden state affects icon rendering, not the wrapper surface

## Examples

### Custom visibility icons

```tsx
<PasswordField>
  <PasswordFieldInput />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon><Lock /></PasswordFieldShownIcon>
    <PasswordFieldHiddenIcon><LockOpen /></PasswordFieldHiddenIcon>
  </PasswordFieldToggleIconButton>
</PasswordField>
```

## Do Not Override

- making the toggle look like a separate unrelated action
- breaking the shared `--input-height` sizing between field and toggle
