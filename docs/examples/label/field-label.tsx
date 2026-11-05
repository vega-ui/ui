import { Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldLabel() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Company name</Label>
      <TextField>
        <TextFieldInput id={id} name='company' autoComplete='organization' />
      </TextField>
    </div>
  );
}
