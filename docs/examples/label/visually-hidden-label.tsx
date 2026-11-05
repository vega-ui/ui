import { Button, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { useId } from 'react';

export default function VisuallyHiddenLabel() {
  const id = useId();

  return (
    <form role='search' style={{ display: 'flex', gap: 'var(--spacing-4)', width: '100%' }}>
      <VisuallyHidden asChild>
        <Label htmlFor={id}>Search the help center</Label>
      </VisuallyHidden>
      <TextField style={{ flex: 1 }}>
        <TextFieldInput id={id} type='search' name='q' placeholder='How do I export invoices?' />
      </TextField>
      <Button type='submit'>Search</Button>
    </form>
  );
}
