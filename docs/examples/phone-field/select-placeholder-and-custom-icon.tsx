import {
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
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
          <SelectHiddenSelect name='country' />
          <SelectCombobox aria-label='Country'>
            <SelectValue placeholder='Code' />
            <SelectIcon>
              <ChevronsUpDown />
            </SelectIcon>
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='ES'>ES</SelectOption>
            <SelectOption value='IT'>IT</SelectOption>
            <SelectOption value='PT'>PT</SelectOption>
          </SelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
