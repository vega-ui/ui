import { Button, Fieldset, FieldsetLegend, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function MutedExplanatoryText() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled aria-describedby='export-locked-note' style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-8)' }}>Scheduled exports</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='export-email'>Send CSV to</Label>
          <TextField>
            <TextFieldInput id='export-email' name='exportEmail' type='email' defaultValue='finance@acme.io' />
          </TextField>
        </div>
        <Button style={{ justifySelf: 'end' }}>Save schedule</Button>
      </Fieldset>
      <Text
        id='export-locked-note'
        size={2}
        style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}
      >
        Scheduled exports are available on the Business plan.
      </Text>
    </div>
  );
}
