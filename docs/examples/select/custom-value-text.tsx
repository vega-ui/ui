import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useState } from 'react';

export default function CustomValueText() {
  const [currency, setCurrency] = useState<string | null>('EUR');

  return (
    <Select style={{ width: 120 }} value={currency} onChangeValue={(next) => setCurrency(next ?? null)}>
      <SelectCombobox aria-label='Currency'>
        <SelectValue placeholder='Currency'>{currency}</SelectValue>
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='USD'>United States dollar (USD)</SelectOption>
        <SelectOption value='EUR'>Euro (EUR)</SelectOption>
        <SelectOption value='JPY'>Japanese yen (JPY)</SelectOption>
        <SelectOption value='CHF'>Swiss franc (CHF)</SelectOption>
      </SelectListbox>
    </Select>
  );
}
