# PhoneField: примеры

## Базовый

### Базовый: простая маска телефона по ISO-коду

Одного `code` достаточно для формата: маска держит код страны США и группирует цифры как `+1 201 555-0123`. Видимая `Label` называет поле, а `autoComplete='tel'` позволяет браузеру заполнить его.

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

### Базовый: выбор страны с иконками флагов

Флаги из `@vega-ui/icons` стоят в каждом варианте рядом с названием и кодом страны. Страна контролируемая, поэтому триггер показывает только выбранный флаг, а его `aria-label` содержит название страны.

<!-- example: phone-field/select-with-country-options-and-icons.tsx -->
```tsx
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
          <PhoneFieldSelectHiddenSelect name='country' />
          <PhoneFieldSelectCombobox aria-label={`Country: ${country.name}`}>
            <PhoneFieldSelectValue>
              <country.Flag width={20} height={15} aria-hidden='true' />
            </PhoneFieldSelectValue>
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            {countries.map(({ code, name, callingCode, Flag }) => (
              <PhoneFieldSelectOption key={code} value={code} label={name}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                  <Flag width={20} height={15} aria-hidden='true' />
                  {name}
                </span>
                <span style={{ opacity: 0.7 }}>{callingCode}</span>
              </PhoneFieldSelectOption>
            ))}
          </PhoneFieldSelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: контролируемое значение с действием очистки

Отформатированным текстом владеет родитель, выводит из него сохраняемые цифры и очищает его пустой строкой. Подсказка сообщает, что номер ещё не полный.

<!-- example: phone-field/controlled-value-with-clear-action.tsx -->
```tsx
import { Button, Label, PhoneField, PhoneFieldInput, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function ControlledValueWithClearAction() {
  const id = useId();
  const [phone, setPhone] = useState('+1 415 555-0132');
  const digits = phone.replace(/\D/g, '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone for delivery updates</Label>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <PhoneField code='US' value={phone} onChangeValue={setPhone} style={{ flex: 1 }}>
          <PhoneFieldInput id={id} autoComplete='tel' />
        </PhoneField>
        <Button variant='secondary' appearance='ghost' disabled={phone === ''} onClick={() => setPhone('')}>
          Clear
        </Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', marginBlockStart: 'var(--spacing-2)' }}>
        {digits.length === 11 ? `Stored as +${digits}` : 'Enter all 10 digits of the number.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: отправка неконтролируемой нативной формы

Поле отправляет отформатированный номер под `name='phone'`, а `PhoneFieldSelectHiddenSelect` — страну под `name='country'`. `required` — нативная валидация настоящего поля ввода.

<!-- example: phone-field/uncontrolled-native-form-submit.tsx -->
```tsx
import {
  Button,
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
      <PhoneField defaultCode='DE'>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect name='country' />
          <PhoneFieldSelectCombobox aria-label='Country'>
            <PhoneFieldSelectValue />
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='DE'>DE</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='AT'>AT</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='CH'>CH</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' required />
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

## Раскладка/оверлей

### Раскладка/оверлей: полное поле внутри формы в диалоге

Список стран открывается в верхнем слое поверх модального диалога. Форма читает оба значения через `FormData` и закрывает диалог при отправке.

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
  PhoneFieldSelectCombobox,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectValue,
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
            <PhoneField defaultCode='FR'>
              <PhoneFieldSelect>
                <PhoneFieldSelectHiddenSelect name='country' />
                <PhoneFieldSelectCombobox aria-label='Country'>
                  <PhoneFieldSelectValue />
                  <PhoneFieldSelectIcon />
                </PhoneFieldSelectCombobox>
                <PhoneFieldSelectListbox>
                  <PhoneFieldSelectOption value='FR'>FR</PhoneFieldSelectOption>
                  <PhoneFieldSelectOption value='BE'>BE</PhoneFieldSelectOption>
                  <PhoneFieldSelectOption value='CH'>CH</PhoneFieldSelectOption>
                </PhoneFieldSelectListbox>
              </PhoneFieldSelect>
              <PhoneFieldInput id={id} name='phone' autoComplete='tel' required />
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

## Ошибка

### Ошибка: состояние невалидного номера

Номер проверяется при потере фокуса и при отправке. Неполный номер ставит `error` на поле и `aria-invalid` на поле ввода и связывает сообщение через `aria-describedby`; ввод последней цифры снимает ошибку.

<!-- example: phone-field/invalid-number-state.tsx -->
```tsx
import { Button, HelperText, Label, PhoneField, PhoneFieldInput, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const countDigits = (phone: string) => phone.replace(/\D/g, '').length;

export default function InvalidNumberState() {
  const id = useId();
  const errorId = `${id}-error`;
  const [phone, setPhone] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState(false);

  const onChangeValue = (next: string) => {
    setPhone(next);
    if (invalid && countDigits(next) === 11) setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (countDigits(phone) !== 11) {
      setInvalid(true);
      setSaved(false);
      return;
    }

    setSaved(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone for two-factor codes</Label>
      <PhoneField code='US' value={phone} onChangeValue={onChangeValue} error={invalid}>
        <PhoneFieldInput
          id={id}
          autoComplete='tel'
          placeholder='+1 201 555-0123'
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          onBlur={() => setInvalid(countDigits(phone) > 1 && countDigits(phone) !== 11)}
        />
      </PhoneField>
      {invalid && <HelperText id={errorId} error>Enter all 10 digits of the US number.</HelperText>}
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

## Отключённый

### Отключённый: унаследовано от fieldset

Поле ввода и триггер страны — нативные элементы, поэтому отключённый `Fieldset` отключает оба и исключает их из формы. Переключатель меняет это состояние.

<!-- example: phone-field/disabled-input.tsx -->
```tsx
import {
  Fieldset,
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
        <PhoneField defaultValue='+44 7400 123456'>
          <PhoneFieldSelect>
            <PhoneFieldSelectHiddenSelect name='country' />
            <PhoneFieldSelectCombobox aria-label='Country'>
              <PhoneFieldSelectValue />
              <PhoneFieldSelectIcon />
            </PhoneFieldSelectCombobox>
            <PhoneFieldSelectListbox>
              <PhoneFieldSelectOption value='GB'>GB</PhoneFieldSelectOption>
              <PhoneFieldSelectOption value='IE'>IE</PhoneFieldSelectOption>
            </PhoneFieldSelectListbox>
          </PhoneFieldSelect>
          <PhoneFieldInput id={phoneId} name='billingPhone' autoComplete='tel' />
        </PhoneField>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: нестрогая маска для терпимой вставки

С `strictMask={false}` вставленный номер сохраняет свой код страны, а поле переключает страну под него; `onChangeCode` сообщает определённую страну. Со строгой маской по умолчанию та же вставка была бы приведена к коду текущей страны.

<!-- example: phone-field/non-strict-mask-for-lenient-paste-behavior.tsx -->
```tsx
import {
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectValue,
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
          <PhoneFieldSelectCombobox aria-label='Country'>
            <PhoneFieldSelectValue />
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='GB'>GB</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='DE'>DE</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='FR'>FR</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='JP'>JP</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
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

### Пограничный случай: эмодзи-флаги

Варианты и значение принимают любое содержимое, поэтому эмодзи-флаги работают без файлов изображений. Триггер читает выбранный код из `useSelectContext` и показывает только флаг — как изображение с названием страны.

<!-- example: phone-field/emoji-flags.tsx -->
```tsx
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
```
<!-- /example -->
