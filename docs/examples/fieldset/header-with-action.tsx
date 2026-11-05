import {
  Button,
  Fieldset,
  FieldsetHeader,
  FieldsetLegend,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const BILLING = { street: 'Unter den Linden 21', city: 'Berlin', postalCode: '10117' };

export default function HeaderWithAction() {
  const id = useId();
  const [address, setAddress] = useState({ street: '', city: '', postalCode: '' });

  const change = (field: keyof typeof address, value: string) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)', width: '100%' }}>
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <FieldsetHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Text size={2} style={{ flex: 1, minWidth: 0, color: 'var(--label-secondary)' }}>Where should we send the hardware?</Text>
        <Button type='button' size='xs' variant='secondary' appearance='ghost' onClick={() => setAddress(BILLING)} style={{ flexShrink: 0 }}>
          Copy billing address
        </Button>
      </FieldsetHeader>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-street`}>Street</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-street`}
            name='street'
            autoComplete='shipping street-address'
            value={address.street}
            onChange={(event) => change('street', event.currentTarget.value)}
          />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-city`}>City</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-city`}
            name='city'
            autoComplete='shipping address-level2'
            value={address.city}
            onChange={(event) => change('city', event.currentTarget.value)}
          />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-postal`}>Postal code</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-postal`}
            name='postalCode'
            autoComplete='shipping postal-code'
            value={address.postalCode}
            onChange={(event) => change('postalCode', event.currentTarget.value)}
          />
        </TextField>
      </div>
    </Fieldset>
  );
}
