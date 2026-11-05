import { HelperText, Label, Link, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function ExplainDisabledField() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id} style={{ color: 'var(--label-tertiary)' }}>Custom domain</Label>
      <TextField>
        <TextFieldInput id={id} placeholder='docs.northwind.io' disabled aria-describedby={`${id}-hint`} />
      </TextField>
      <HelperText id={`${id}-hint`}>
        Custom domains are available on the Business plan. <Link href='#pricing'>Compare plans</Link>
      </HelperText>
    </div>
  );
}
