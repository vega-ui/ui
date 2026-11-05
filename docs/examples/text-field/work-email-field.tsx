import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function WorkEmailField() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Work email</Label>
      <TextField>
        <TextFieldInput
          id={id}
          type='email'
          name='email'
          autoComplete='email'
          placeholder='maria.lopez@northwind.io'
          aria-describedby={hintId}
        />
      </TextField>
      <HelperText id={hintId}>Invoices and security alerts are sent here.</HelperText>
    </div>
  );
}
