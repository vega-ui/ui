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
import { FlagDE, FlagFR, FlagGBUKM, FlagIN, FlagJP, FlagUS } from '@vega-ui/icons';
import { useId, useState } from 'react';

const countries = [
  { code: 'US', name: 'United States', callingCode: '+1', Flag: FlagUS },
  { code: 'GB', name: 'United Kingdom', callingCode: '+44', Flag: FlagGBUKM },
  { code: 'DE', name: 'Germany', callingCode: '+49', Flag: FlagDE },
  { code: 'FR', name: 'France', callingCode: '+33', Flag: FlagFR },
  { code: 'IN', name: 'India', callingCode: '+91', Flag: FlagIN },
  { code: 'JP', name: 'Japan', callingCode: '+81', Flag: FlagJP },
] as const;

export default function SelectWithCountryOptionsAndIcons() {
  const id = useId();
  const [country, setCountry] = useState<(typeof countries)[number]>(countries[1]);

  const onChangeCode = (code: string) => {
    const found = countries.find((item) => item.code === code);
    if (found) setCountry(found);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField code={country.code} onChangeCode={onChangeCode}>
        <PhoneFieldSelect>
          <SelectHiddenSelect name='country' />
          <SelectCombobox aria-label={`Country: ${country.name}`}>
            <SelectValue>
              <country.Flag width={20} height={15} aria-hidden='true' />
            </SelectValue>
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            {countries.map(({ code, name, callingCode, Flag }) => (
              <SelectOption key={code} value={code} label={name} style={{ justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                  <Flag width={20} height={15} aria-hidden='true' />
                  {name}
                </span>
                <span style={{ opacity: 0.7 }}>{callingCode}</span>
              </SelectOption>
            ))}
          </SelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
