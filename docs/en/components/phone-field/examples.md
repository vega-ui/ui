# PhoneField Examples

## Basic

### Basic: simple ISO-based phone mask

`country` alone sets the format: the mask keeps the US calling code and groups the digits as `+1 201 555-0123`. A visible `Label` names the input and `autoComplete='tel'` lets the browser fill it in.

<!-- example: phone-field/simple-iso-based-phone-mask.tsx -->
```tsx
import { Label, PhoneField, PhoneFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function SimpleIsoBasedPhoneMask() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Mobile number</Label>
      <PhoneField country='US'>
        <PhoneFieldInput name='phone' id={id} autoComplete='tel' placeholder='+1 201 555-0123' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

### Basic: country select with flag icons

Flags from `@vega-ui/icons` sit in each option next to the name and the calling code. The country is controlled, so the trigger shows only the selected flag and its `aria-label` carries the country name.

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

  const onChangeCountry = (next: string) => {
    const found = countries.find((item) => item.code === next);
    if (found) setCountry(found);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField country={country.code} onChangeCountry={onChangeCountry}>
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
        <PhoneFieldInput name='phone' id={id} autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: controlled value with clear action

The parent owns the number in E.164, like `+14155550132`, and clears it with an empty string; the input shows it formatted. The readout tells the user when the number is still incomplete.

<!-- example: phone-field/controlled-value-with-clear-action.tsx -->
```tsx
import { Button, Label, PhoneField, PhoneFieldInput, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function ControlledValueWithClearAction() {
  const id = useId();
  const [phone, setPhone] = useState('+14155550132');
  const digits = phone.replace(/\D/g, '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone for delivery updates</Label>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <PhoneField country='US' value={phone} onChangeValue={setPhone} style={{ flex: 1 }}>
          <PhoneFieldInput id={id} autoComplete='tel' />
        </PhoneField>
        <Button variant='secondary' appearance='ghost' disabled={phone === ''} onClick={() => setPhone('')}>
          Clear
        </Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', marginBlockStart: 'var(--spacing-2)' }}>
        {digits.length === 11 ? `Stored as ${phone}` : 'Enter all 10 digits of the number.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: uncontrolled native form submit

`PhoneFieldInput` submits the shown text under `name='phone'`, like a native input, and `SelectHiddenSelect` submits the country under `name='country'`. `required` is native validation on the real input, and a field that shows only the calling code counts as empty for it. A number too short or too long for its country blocks the submit with the message of the browser.

<!-- example: phone-field/uncontrolled-native-form-submit.tsx -->
```tsx
import {
  Button,
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
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function UncontrolledNativeFormSubmit() {
  const id = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`country=${data.get('country')}, phone=${data.get('phone')}`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField defaultCountry='DE'>
        <PhoneFieldSelect>
          <SelectHiddenSelect name='country' />
          <SelectCombobox aria-label='Country'>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='DE'>DE</SelectOption>
            <SelectOption value='AT'>AT</SelectOption>
            <SelectOption value='CH'>CH</SelectOption>
          </SelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput name='phone' id={id} autoComplete='tel' required />
      </PhoneField>
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Request a callback</Button>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Submitted: {submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: full field inside a dialog form

The country list opens in the top layer above the modal dialog. The form reads both values with `FormData` and closes the dialog on submit.

<!-- example: phone-field/full-field-inside-a-dialog-form.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
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
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function FullFieldInsideADialogForm() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setContact(`${data.get('phone')} (${data.get('country')})`);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogTrigger asChild>
          <Button>Add emergency contact</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Emergency contact</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-12)' }}
          >
            <Label htmlFor={id}>Phone number</Label>
            <PhoneField defaultCountry='FR'>
              <PhoneFieldSelect>
                <SelectHiddenSelect name='country' />
                <SelectCombobox aria-label='Country'>
                  <SelectValue />
                  <SelectIcon />
                </SelectCombobox>
                <SelectListbox>
                  <SelectOption value='FR'>FR</SelectOption>
                  <SelectOption value='BE'>BE</SelectOption>
                  <SelectOption value='CH'>CH</SelectOption>
                </SelectListbox>
              </PhoneFieldSelect>
              <PhoneFieldInput name='phone' id={id} autoComplete='tel' required />
            </PhoneField>
            <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Save contact</Button>
          </form>
        </DialogContent>
      </Dialog>
      {contact && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>Emergency contact: {contact}</Text>}
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: invalid number state

The field makes a number too short for its country invalid through `setCustomValidity`, and `required` an empty one, so the example only reads `validity`: on blur and on submit an invalid number sets `aria-invalid` on the input and links the message with `aria-describedby`, and typing clears it. `noValidate` on the form replaces the message bubble of the browser with this message, and `checkValidity()` still blocks the submit.

<!-- example: phone-field/invalid-number-state.tsx -->
```tsx
import { Button, HelperText, Label, PhoneField, PhoneFieldInput, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function InvalidNumberState() {
  const id = useId();
  const errorId = `${id}-error`;
  const [phone, setPhone] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = event.currentTarget.checkValidity();
    setInvalid(!valid);
    setSaved(valid);
  };

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone for two-factor codes</Label>
      <PhoneField country='US' value={phone} onChangeValue={setPhone}>
        <PhoneFieldInput
          id={id}
          autoComplete='tel'
          placeholder='+1 201 555-0123'
          required
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          onInput={() => setInvalid(false)}
          onBlur={(event) => setInvalid(phone !== '' && !event.currentTarget.validity.valid)}
        />
      </PhoneField>
      {invalid && <HelperText id={errorId} invalid>Enter all 10 digits of the US number.</HelperText>}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Send a code</Button>
      {saved && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          A code was sent to {phone}.
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: inherited from a fieldset

The input and the country trigger are native controls, so a disabled `Fieldset` disables both and leaves the number and the country out of the form, like `disabled` on `PhoneField`. The switch toggles that state.

<!-- example: phone-field/disabled-input.tsx -->
```tsx
import {
  Fieldset,
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
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function DisabledInput() {
  const switchId = useId();
  const phoneId = useId();
  const [sameAsProfile, setSameAsProfile] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 340 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput
            id={switchId}
            checked={sameAsProfile}
            onChange={(event) => setSameAsProfile(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor={switchId}>Use the number from my profile</Label>
      </div>
      <Fieldset
        disabled={sameAsProfile}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}
      >
        <Label htmlFor={phoneId}>Billing phone</Label>
        <PhoneField defaultValue='+447400123456'>
          <PhoneFieldSelect>
            <SelectHiddenSelect name='country' />
            <SelectCombobox aria-label='Country'>
              <SelectValue />
              <SelectIcon />
            </SelectCombobox>
            <SelectListbox>
              <SelectOption value='GB'>GB</SelectOption>
              <SelectOption value='IE'>IE</SelectOption>
            </SelectListbox>
          </PhoneFieldSelect>
          <PhoneFieldInput name='billingPhone' id={phoneId} autoComplete='tel' />
        </PhoneField>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: non-strict mask for lenient paste behavior

With `strictMask={false}` a pasted number keeps its own calling code, and the field switches the country to match it; `onChangeCountry` reports the detected country. With the default strict mask the calling code the text starts with stays in front, so the same paste after it would be read as a number of that calling code.

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
      <PhoneField defaultCountry='US' strictMask={false} onChangeCountry={setCountry}>
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

### Edge: emoji flags

Options and the value take any content, so emoji flags work without image assets. The trigger reads the selected code from `useSelectContext` and shows only its flag, as an image named after the country.

<!-- example: phone-field/emoji-flags.tsx -->
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
      <PhoneField defaultCountry='BR'>
        <PhoneFieldSelect>
          <SelectHiddenSelect name='country' />
          <SelectCombobox aria-label='Country'>
            <SelectValue>
              <SelectedFlag />
            </SelectValue>
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            {countries.map((country) => (
              <SelectOption key={country.code} value={country.code} label={country.name} style={{ justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                  <span aria-hidden='true'>{country.flag}</span>
                  {country.name}
                </span>
                <span style={{ opacity: 0.7 }}>{country.callingCode}</span>
              </SelectOption>
            ))}
          </SelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput name='whatsapp' id={id} autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->
