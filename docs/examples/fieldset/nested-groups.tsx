import {
  Fieldset,
  FieldsetLegend,
  Label,
  Radio,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId } from 'react';

const WINDOWS = [
  { value: 'morning', label: 'Morning, 8:00–12:00' },
  { value: 'afternoon', label: 'Afternoon, 12:00–17:00' },
  { value: 'evening', label: 'Evening, 17:00–21:00' },
];

export default function NestedGroups() {
  const id = useId();

  return (
    <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)', width: '100%' }}>
      <FieldsetLegend>Delivery to the office</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-company`}>Company and floor</Label>
        <TextField>
          <TextFieldInput id={`${id}-company`} name='company' defaultValue='Northwind, 4th floor' />
        </TextField>
      </div>
      <Fieldset>
        <FieldsetLegend size={3}>Delivery window</FieldsetLegend>
        {WINDOWS.map((window) => (
          <Label key={window.value} fontWeight={400} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='window' value={window.value} defaultChecked={window.value === 'morning'} />
            {window.label}
          </Label>
        ))}
      </Fieldset>
    </Fieldset>
  );
}
