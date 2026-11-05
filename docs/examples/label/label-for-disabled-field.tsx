import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function LabelForDisabledField() {
  const id = useId();
  const [sameAsCompany, setSameAsCompany] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={sameAsCompany} onChange={(event) => setSameAsCompany(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
        </CheckboxIndicator>
        Ship to the company address
      </Checkbox>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label
          htmlFor={id}
          style={{ color: sameAsCompany ? 'var(--label-tertiary)' : undefined, cursor: sameAsCompany ? 'not-allowed' : undefined }}
        >
          Shipping address
        </Label>
        <TextField>
          <TextFieldInput id={id} name='shippingAddress' autoComplete='shipping street-address' disabled={sameAsCompany} />
        </TextField>
      </div>
    </div>
  );
}
