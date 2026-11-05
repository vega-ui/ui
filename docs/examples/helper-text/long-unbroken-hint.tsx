import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function LongUnbrokenHint() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Webhook URL</Label>
      <TextField>
        <TextFieldInput id={id} type='url' aria-describedby={`${id}-hint`} />
      </TextField>
      <HelperText id={`${id}-hint`} style={{ overflowWrap: 'anywhere' }}>
        Default: https://hooks.northwind-logistics.example.com/v2/events/shipments/status-changed
      </HelperText>
    </div>
  );
}
