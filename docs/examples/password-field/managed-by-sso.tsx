import {
  HelperText,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { useId } from 'react';

export default function ManagedBySso() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField disabled>
        <PasswordFieldInput id={id} placeholder='Managed by Okta' aria-describedby={`${id}-hint`} />
        <PasswordFieldToggleIconButton aria-label='Show password'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleIconButton>
      </PasswordField>
      <HelperText id={`${id}-hint`}>Your organization signs you in with Okta. Change the password there.</HelperText>
    </div>
  );
}
