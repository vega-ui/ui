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
  useSelectContext,
} from '@vega-ui/react';
import { useId } from 'react';

const countries = [
  { code: 'BR', flag: '🇧🇷', name: 'Brazil', callingCode: '+55' },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico', callingCode: '+52' },
  { code: 'US', flag: '🇺🇸', name: 'United States', callingCode: '+1' },
  { code: 'FR', flag: '🇫🇷', name: 'France', callingCode: '+33' },
] as const;

function SelectedFlag() {
  const { selected } = useSelectContext();
  const country = countries.find((item) => item.code === selected);

  if (!country) return null;

  return (
    <span role='img' aria-label={country.name}>
      {country.flag}
    </span>
  );
}

export default function EmojiFlags() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>WhatsApp number</Label>
      <PhoneField defaultCode='BR'>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect name='country' />
          <PhoneFieldSelectCombobox aria-label='Country'>
            <PhoneFieldSelectValue>
              <SelectedFlag />
            </PhoneFieldSelectValue>
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            {countries.map((country) => (
              <PhoneFieldSelectOption key={country.code} value={country.code} label={country.name}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                  <span aria-hidden='true'>{country.flag}</span>
                  {country.name}
                </span>
                <span style={{ opacity: 0.7 }}>{country.callingCode}</span>
              </PhoneFieldSelectOption>
            ))}
          </PhoneFieldSelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='whatsapp' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
