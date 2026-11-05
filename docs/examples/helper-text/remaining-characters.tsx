import { HelperText, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_LENGTH = 50;

export default function RemainingCharacters() {
  const id = useId();
  const [subject, setSubject] = useState('Your March invoice is ready');
  const remaining = MAX_LENGTH - subject.length;
  const message = remaining === 1 ? '1 character left' : `${remaining} characters left`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Email subject</Label>
      <TextField>
        <TextFieldInput
          id={id}
          value={subject}
          maxLength={MAX_LENGTH}
          aria-describedby={`${id}-count`}
          onChange={(event) => setSubject(event.currentTarget.value)}
        />
      </TextField>
      <HelperText id={`${id}-count`} error={remaining === 0} style={{ fontVariantNumeric: 'tabular-nums' }}>{message}</HelperText>
      <VisuallyHidden>
        <div role='status'>{remaining <= 10 ? message : ''}</div>
      </VisuallyHidden>
    </div>
  );
}
