import {
  HelperText,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { KeyboardEvent, useId, useState } from 'react';

export default function CapsLockWarning() {
  const id = useId();
  const [capsLock, setCapsLock] = useState(false);

  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(event.getModifierState('CapsLock'));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField>
        <PasswordFieldInput
          id={id}
          autoComplete='current-password'
          aria-describedby={`${id}-caps`}
          onKeyDown={onKey}
          onKeyUp={onKey}
          onBlur={() => setCapsLock(false)}
        />
        <PasswordFieldToggleIconButton aria-label='Show password'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleIconButton>
      </PasswordField>
      <HelperText id={`${id}-caps`} aria-live='polite'>
        {capsLock ? 'Caps Lock is on.' : ''}
      </HelperText>
    </div>
  );
}
