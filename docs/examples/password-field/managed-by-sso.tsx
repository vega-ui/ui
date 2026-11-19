import {
  HelperText,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
} from '@vega-ui/react';
import { EyeIcon, EyeOffIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function ManagedBySso() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField disabled>
        <PasswordFieldInput id={id} placeholder='Managed by Okta' aria-describedby={`${id}-hint`} />
        <PasswordFieldToggle square aria-label='Show password'>
          <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
          <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
        </PasswordFieldToggle>
      </PasswordField>
      <HelperText id={`${id}-hint`}>Your organization signs you in with Okta. Change the password there.</HelperText>
    </div>
  );
}
