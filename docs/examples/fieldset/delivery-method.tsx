import {
  Fieldset,
  FieldsetLegend,
  Label,
  Radio,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

type Method = 'courier' | 'pickup';

const radioRowStyle = { display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' };

export default function DeliveryMethod() {
  const id = useId();
  const [method, setMethod] = useState<Method>('courier');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Delivery method</FieldsetLegend>
        <Label fontWeight={400} style={radioRowStyle}>
          <Radio name='method' value='courier' checked={method === 'courier'} onChange={() => setMethod('courier')} />
          Courier to your door, $7.90
        </Label>
        <Label fontWeight={400} style={radioRowStyle}>
          <Radio name='method' value='pickup' checked={method === 'pickup'} onChange={() => setMethod('pickup')} />
          Pickup point, free
        </Label>
      </Fieldset>
      {method === 'courier' && (
        <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)' }}>
          <FieldsetLegend>Courier address</FieldsetLegend>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={`${id}-street`}>Street and house number</Label>
            <TextField>
              <TextFieldInput id={`${id}-street`} name='street' autoComplete='shipping street-address' />
            </TextField>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={`${id}-city`}>City</Label>
            <TextField>
              <TextFieldInput id={`${id}-city`} name='city' autoComplete='shipping address-level2' />
            </TextField>
          </div>
        </Fieldset>
      )}
      {method === 'pickup' && (
        <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)' }}>
          <FieldsetLegend>Pickup point</FieldsetLegend>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={`${id}-postal`}>Postal code to search near</Label>
            <TextField>
              <TextFieldInput id={`${id}-postal`} name='pickupPostalCode' inputMode='numeric' autoComplete='postal-code' />
            </TextField>
          </div>
        </Fieldset>
      )}
    </div>
  );
}
