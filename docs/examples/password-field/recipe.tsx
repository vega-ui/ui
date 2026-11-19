import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
  type PasswordFieldInputProps,
} from '@vega-ui/react';
import { EyeIcon, EyeOffIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyPasswordFieldProps extends PasswordFieldInputProps {
  toggleLabel: string
}

export function MyPasswordField({ toggleLabel, ...props }: MyPasswordFieldProps) {
  return (
    <PasswordField>
      <PasswordFieldInput {...props} />
      <PasswordFieldToggle square aria-label={toggleLabel}>
        <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
        <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
      </PasswordFieldToggle>
    </PasswordField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Password</Label>
      <MyPasswordField id={id} name='password' autoComplete='current-password' toggleLabel='Show password' />
    </div>
  );
}
