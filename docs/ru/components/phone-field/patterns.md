# PhoneField: паттерны

## Контактная форма с учётом страны

Когда использовать:

- продукт хранит международные номера телефонов

Заметки о композиции:

- держите выбор страны видимым
- нормализуйте значения при отправке
- показывайте в триггере компактное значение (здесь флаг), а полное название страны — в списке

Компромиссы:

- лучшая корректность для международных номеров
- более сложное поведение формы, чем у обычного текстового поля

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

## Ввод со строгой маской

Когда использовать:

- формат ввода должен быть жёстко ограничен

Заметки о композиции:

- `strictMask` включён по умолчанию: код страны из `code` зафиксирован, и принимаются только его цифры
- перепроверьте перемещение каретки и вставку

Компромиссы:

- более чистый отформатированный ввод
- менее снисходительное редактирование

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

## Терпимая вставка

Когда использовать:

- пользователи часто вставляют номера телефонов из внешних систем

Заметки о композиции:

- используйте `strictMask={false}`
- вставленный номер с другим кодом страны переключает страну, и `onChangeCode` сообщает об этом
- нормализуйте на границе функции

Компромиссы:

- лучшая терпимость к вставке
- более слабые гарантии форматирования внутри поля

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
