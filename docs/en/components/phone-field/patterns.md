# PhoneField Patterns

## Country-Aware Contact Form

When to use:

- the product stores international phone numbers

Composition notes:

- keep the country select visible
- normalize values at submit time
- show a compact value in the trigger (here the flag) and the full country name in the list

Trade-offs:

- better international correctness
- more complex form behavior than a plain text input

<!-- example: phone-field/select-with-country-options-and-icons.tsx -->
```tsx
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
```
<!-- /example -->

## Strict Mask Entry

When to use:

- the entry format should stay tightly constrained

Composition notes:

- `strictMask` is on by default: the calling code of `code` is fixed and only its digits are accepted
- retest caret movement and paste behavior

Trade-offs:

- cleaner formatted input
- less forgiving editing

<!-- example: phone-field/simple-iso-based-phone-mask.tsx -->
```tsx
import { Label, PhoneField, PhoneFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function SimpleIsoBasedPhoneMask() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Mobile number</Label>
      <PhoneField code='US'>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' placeholder='+1 201 555-0123' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

## Lenient Paste Flow

When to use:

- users often paste phone numbers from external systems

Composition notes:

- use `strictMask={false}`
- a pasted number with another calling code switches the country, and `onChangeCode` reports it
- normalize at the feature boundary

Trade-offs:

- better paste tolerance
- weaker in-field formatting guarantees

<!-- example: phone-field/non-strict-mask-for-lenient-paste-behavior.tsx -->
```tsx
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
```
<!-- /example -->
