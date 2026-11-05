import { HelperText, Icon, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { CircleAlertIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function ErrorMessageIcon() {
  const [error, setError] = useState('');

  const validate = (input: HTMLInputElement) => {
    if (input.validity.valid) {
      setError('');
      return;
    }

    setError('Enter an email like name@company.com');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='billing-email'>Billing email</Label>
      <TextField error={error !== ''}>
        <TextFieldInput
          id='billing-email'
          type='email'
          defaultValue='finance.acme.com'
          required
          aria-invalid={error !== ''}
          aria-describedby={error === '' ? undefined : 'billing-email-error'}
          onBlur={(event) => validate(event.currentTarget)}
        />
      </TextField>
      {error !== '' && (
        <HelperText id='billing-email-error' error style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <Icon size='xs' style={{ flexShrink: 0 }}><CircleAlertIcon /></Icon>
          {error}
        </HelperText>
      )}
    </div>
  );
}
