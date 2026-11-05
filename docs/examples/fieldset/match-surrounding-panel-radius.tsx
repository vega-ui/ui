import { Fieldset, FieldsetLegend, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function MatchSurroundingPanelRadius() {
  const id = useId();

  return (
    <div style={{ padding: 'var(--spacing-8)', borderRadius: 'var(--radius-6)', background: 'var(--fills-quaternary)', width: '100%' }}>
      <Fieldset appearance='outlined' style={{ borderRadius: 'var(--radius-4)' }}>
        <FieldsetLegend>Billing contact</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={id}>Invoice email</Label>
          <TextField>
            <TextFieldInput id={id} type='email' name='invoiceEmail' defaultValue='ap@northwind.io' />
          </TextField>
        </div>
      </Fieldset>
    </div>
  );
}
