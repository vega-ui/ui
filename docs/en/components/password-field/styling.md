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
| `--button-color` | `PasswordFieldToggleIconButton` | Button icon color. |
| `--button-color-hover` | `PasswordFieldToggleIconButton` | Button icon color on hover. |
| `--button-color-active` | `PasswordFieldToggleIconButton` | Button icon color while pressed. |
| `--button-background-color` | `PasswordFieldToggleIconButton` | Button background. |
| `--button-background-color-hover` | `PasswordFieldToggleIconButton` | Button background on hover. |
| `--button-background-color-active` | `PasswordFieldToggleIconButton` | Button background while pressed. |

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

<!-- example: password-field/custom-visibility-icons.tsx -->
```tsx
import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { LockIcon, LockOpenIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function CustomVisibilityIcons() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Vault passphrase</Label>
      <PasswordField>
        <PasswordFieldInput id={id} autoComplete='current-password' />
        <PasswordFieldToggleIconButton aria-label='Show passphrase'>
          <PasswordFieldShownIcon><LockIcon /></PasswordFieldShownIcon>
          <PasswordFieldHiddenIcon><LockOpenIcon /></PasswordFieldHiddenIcon>
        </PasswordFieldToggleIconButton>
      </PasswordField>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- making the toggle look like a separate unrelated action
- breaking the shared `--input-height` sizing between field and toggle
