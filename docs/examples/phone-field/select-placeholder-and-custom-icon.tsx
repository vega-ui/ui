import {
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectValue,
} from '@vega-ui/react';
import { ChevronsUpDown } from '@vega-ui/icons';
import { useId } from 'react';

export default function SelectPlaceholderAndCustomIcon() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect name='country' />
          <PhoneFieldSelectCombobox aria-label='Country'>
            <PhoneFieldSelectValue placeholder='Code' />
            <PhoneFieldSelectIcon>
              <ChevronsUpDown />
            </PhoneFieldSelectIcon>
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='ES'>ES</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='IT'>IT</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='PT'>PT</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
