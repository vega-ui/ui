import {
  HelperText,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useId } from 'react';

export default function ReadOnlyField() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Billing currency</Label>
      <Select readOnly defaultValue='eur'>
        <SelectHiddenSelect name='currency' />
        <SelectCombobox id={id} aria-describedby={hintId}>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='usd'>US dollar (USD)</SelectOption>
          <SelectOption value='eur'>Euro (EUR)</SelectOption>
          <SelectOption value='gbp'>Pound sterling (GBP)</SelectOption>
        </SelectListbox>
      </Select>
      <HelperText id={hintId}>
        Locked after the first invoice. Contact support to change it.
      </HelperText>
    </div>
  );
}
