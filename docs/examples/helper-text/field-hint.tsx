import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldHint() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Recovery email</Label>
      <TextField>
        <TextFieldInput id={id} type='email' autoComplete='email' aria-describedby={hintId} />
      </TextField>
      <HelperText id={hintId}>Used only if you lose access to your main inbox.</HelperText>
    </div>
  );
}
