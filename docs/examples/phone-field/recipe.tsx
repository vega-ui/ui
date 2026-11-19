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
  type PhoneFieldProps,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyPhoneFieldProps extends PhoneFieldProps {
  name?: string
  countryName?: string
  countryLabel: string
}

export function MyPhoneField({ id, name, countryName, countryLabel, children, ...props }: MyPhoneFieldProps) {
  return (
    <PhoneField {...props}>
      <PhoneFieldSelect>
        <SelectHiddenSelect name={countryName} />
        <SelectCombobox aria-label={countryLabel}>
          <SelectValue />
          <SelectIcon><ChevronDownIcon /></SelectIcon>
        </SelectCombobox>
        <SelectListbox>{children}</SelectListbox>
      </PhoneFieldSelect>
      <PhoneFieldInput id={id} name={name} autoComplete='tel' />
    </PhoneField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <MyPhoneField id={id} name='phone' countryName='country' countryLabel='Country' defaultCountry='GB'>
        <SelectOption value='US'>US</SelectOption>
        <SelectOption value='GB'>GB</SelectOption>
        <SelectOption value='DE'>DE</SelectOption>
        <SelectOption value='FR'>FR</SelectOption>
      </MyPhoneField>
    </div>
  );
}
