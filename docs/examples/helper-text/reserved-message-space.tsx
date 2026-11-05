import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function ReservedMessageSpace() {
  const id = useId();
  const [code, setCode] = useState('');
  const invalid = code !== '' && !/^[A-Z]{3}-\d{4}$/.test(code);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' }}>
        <Label htmlFor={`${id}-code`}>Booking code</Label>
        <TextField error={invalid}>
          <TextFieldInput
            id={`${id}-code`}
            value={code}
            placeholder='ABC-1234'
            aria-invalid={invalid}
            aria-describedby={`${id}-message`}
            onChange={(event) => setCode(event.currentTarget.value.toUpperCase())}
          />
        </TextField>
        <HelperText id={`${id}-message`} error={invalid} style={{ minHeight: '2lh' }}>
          {invalid ? 'Three letters, a hyphen and four digits.' : ''}
        </HelperText>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' }}>
        <Label htmlFor={`${id}-name`}>Last name</Label>
        <TextField>
          <TextFieldInput id={`${id}-name`} autoComplete='family-name' />
        </TextField>
      </div>
    </div>
  );
}
