import {
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function NonStrictMaskForLenientPasteBehavior() {
  const id = useId();
  const [country, setCountry] = useState('US');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Customer phone</Label>
      <PhoneField defaultCode='US' strictMask={false} onChangeCode={setCountry}>
        <PhoneFieldSelect>
          <SelectCombobox aria-label='Country'>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='US'>US</SelectOption>
            <SelectOption value='GB'>GB</SelectOption>
            <SelectOption value='DE'>DE</SelectOption>
            <SelectOption value='FR'>FR</SelectOption>
            <SelectOption value='JP'>JP</SelectOption>
          </SelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} autoComplete='tel' />
      </PhoneField>
      <Text size={2} style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-2)' }}>
        Paste +33 6 12 34 56 78 or +81 90-1234-5678: the country switches to match. Detected: {country}
      </Text>
    </div>
  );
}
