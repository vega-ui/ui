import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
} from '@vega-ui/react';
import { EyeIcon, EyeOffIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function OneToggleForTwoFields() {
  const id = useId();
  const [shown, setShown] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-new`}>New password</Label>
        <PasswordField shown={shown} onChangeShown={setShown}>
          <PasswordFieldInput id={`${id}-new`} autoComplete='new-password' />
          <PasswordFieldToggle square aria-label='Show passwords'>
            <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
            <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
          </PasswordFieldToggle>
        </PasswordField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-confirm`}>Repeat new password</Label>
        <PasswordField shown={shown}>
          <PasswordFieldInput id={`${id}-confirm`} autoComplete='new-password' />
        </PasswordField>
      </div>
    </div>
  );
}
