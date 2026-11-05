# Формы и валидация

Поля Vega UI — нативные элементы формы, поэтому обычная `<form>` отправляет, проверяет и сбрасывает их без дополнительного состояния.

## Работу делают нативные поля

Каждая часть поля рендерит настоящий элемент: `TextFieldInput`, `PasswordFieldInput`, `NumberFieldInput`, `PhoneFieldInput`, `DateFieldInput` и `TimeFieldInput` — это `<input>`, `TextArea` — `<textarea>`, `Radio` — `<input type="radio">`, а `CheckboxInput`, `SwitchInput`, `SegmentedControlItemInput` и `SliderThumbInput` — поля внутри своих компонентов. `PinField` хранит код в одном визуально скрытом поле за своими ячейками.

Поэтому формы получают поведение браузера бесплатно:

- `name`, `value`, `required`, `pattern`, `min`, `max`, `minLength` и `autoComplete` ставятся на часть-поле, ровно как на нативный элемент
- `new FormData(form)` читает значения, а отправка без `preventDefault()` передаёт их, как любая HTML-форма
- у `Button` нет `type` по умолчанию, поэтому внутри формы она отправляет её, как нативная `<button>`; передайте `type='button'` кнопкам, которые не должны этого делать
- автозаполнение браузера, менеджеры паролей и атрибут `form` работают с полями как обычно

<!-- example: text-field/profile-form-submit.tsx -->
```tsx
import { Button, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ProfileFormSubmit() {
  const id = useId();
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`${data.get('fullName')} <${data.get('email')}>`);
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSaved('')}
      style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-name`}>Full name</Label>
        <TextField>
          <TextFieldInput id={`${id}-name`} name='fullName' autoComplete='name' defaultValue='Ada Lovelace' required />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-email`}>Email</Label>
        <TextField>
          <TextFieldInput id={`${id}-email`} name='email' type='email' autoComplete='email' required />
        </TextField>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
        <Button type='submit'>Save profile</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved === '' ? '' : `Saved: ${saved}`}</Text>
    </form>
  );
}
```
<!-- /example -->

## Что отправляет каждое поле

Нативное поле отправляет текст, который показывает. Для большинства полей это и есть значение; несколько компонентов держат на корне другое значение:

| Компонент | Отправляется при `name` на поле | Значение на корне |
| --- | --- | --- |
| `TextField`, `TextArea`, `PasswordField` | введённый текст | — |
| `NumberField` | отформатированный текст, например `2 500` | `value` / `defaultValue` числом, `NaN` для пустого поля |
| `DateField`, `DateRangeField`, `DateTimeField`, `TimeField` | введённый текст в `format`, например `15.01.2026` | ISO `value` / `defaultValue`, см. [Даты и календарные системы](./i18n.md#значения-дат) |
| `Checkbox`, `Radio`, `Switch`, `SegmentedControl` | `value` каждого отмеченного поля | — |
| `Slider` | значение каждого бегунка; `name` на корне применяется ко всем бегункам | `value` / `defaultValue` массивом |
| `Select` | выбранное значение через `SelectHiddenSelect` с `name` | `value` / `defaultValue` |

Если сервер ждёт значение корня, а не показанный текст, повторите его в скрытом поле из `onChangeValue`. Так [пример DateField](./components/date-field/examples.md) отправляет ISO-день. У `Listbox` нет части для формы: рендерите по скрытому полю на каждое выбранное значение, как в [Listbox в форме](./components/listbox/examples.md).

<!-- example: select/native-form-participation.tsx -->
```tsx
import {
  Button,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function NativeFormParticipation() {
  const planId = useId();
  const cycleId = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`plan=${data.get('plan')}, cycle=${data.get('cycle')}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={planId}>Plan</Label>
        <Select defaultValue='team'>
          <SelectHiddenSelect name='plan' />
          <SelectCombobox id={planId}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='starter'>Starter</SelectOption>
            <SelectOption value='team'>Team</SelectOption>
            <SelectOption value='enterprise'>Enterprise</SelectOption>
          </SelectListbox>
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={cycleId}>Billing cycle</Label>
        <Select defaultValue='yearly'>
          <SelectHiddenSelect name='cycle' />
          <SelectCombobox id={cycleId}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='monthly'>Monthly</SelectOption>
            <SelectOption value='yearly'>Yearly, 2 months free</SelectOption>
          </SelectListbox>
        </Select>
      </div>
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-4)' }}>Continue to payment</Button>
      {submitted && (
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          Submitted: {submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Валидация ограничений

`required`, `pattern`, `type='email'`, `min` и `max` на частях-полях блокируют отправку и заполняют `input.validity`, как у нативных полей. Браузер показывает своё всплывающее сообщение, если вы не возьмёте это на себя:

- слушайте `onInvalid` на поле и вызывайте `event.preventDefault()`, чтобы скрыть подсказку браузера, а затем читайте `event.currentTarget.validity`, чтобы выбрать своё сообщение
- или поставьте `noValidate` на форму и проверяйте значения сами в `onSubmit`

Вид ошибки включается явно и никогда не выводится из валидности. Передайте `error` корню поля (`TextField`, `TextArea`, `NumberField`, `PinField`) и `HelperText`, чтобы переключить их на цвета ошибки. Библиотека не ставит ARIA за вас: задайте `aria-invalid` на поле и укажите в `aria-describedby` тот `HelperText`, который несёт сообщение.

<!-- example: helper-text/native-validity-message.tsx -->
```tsx
import { Button, HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const getMessage = (input: HTMLInputElement) => {
  if (input.validity.valueMissing) return 'Enter a postal code.';
  if (input.validity.patternMismatch) return 'Use 5 digits, for example 10115.';
  return '';
};

export default function NativeValidityMessage() {
  const id = useId();
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setError(getMessage(event.currentTarget));
  };

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    if (!invalid) return;
    setError(getMessage(event.currentTarget));
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Postal code</Label>
        <TextField error={invalid}>
          <TextFieldInput
            id={id}
            name='postalCode'
            inputMode='numeric'
            autoComplete='postal-code'
            required
            pattern='\d{5}'
            aria-invalid={invalid}
            aria-describedby={invalid ? `${id}-error ${id}-hint` : `${id}-hint`}
            onInvalid={onInvalid}
            onInput={onInput}
          />
        </TextField>
        {invalid && <HelperText id={`${id}-error`} error>{error}</HelperText>}
        <HelperText id={`${id}-hint`}>We deliver within Germany only.</HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start' }}>Check delivery</Button>
    </form>
  );
}
```
<!-- /example -->

Элементы без нативного ограничения, например `Select` без выбора, проверяются в `onSubmit`: храните ошибку в состоянии, ставьте `aria-invalid` на `SelectCombobox` и переводите на него фокус. См. [обязательный выбор в Select](./components/select/examples.md).

## Отключение группы

`Fieldset` рендерит нативный `<fieldset>`, поэтому `disabled` на нём отключает все элементы внутри по правилам браузера: поля перестают принимать фокус и ввод, а отключённые элементы не попадают в `FormData`. Объясните причину рядом с группой через `HelperText`, а не отключайте её молча.

<!-- example: checkbox/disabled-by-fieldset.tsx -->
```tsx
import { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  HelperText,
} from '@vega-ui/react';

const channels = [
  { value: 'email', label: 'Email' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS' },
];

export default function DisabledByFieldset() {
  const [useDefaults, setUseDefaults] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={useDefaults} onChange={(event) => setUseDefaults(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Use workspace defaults
      </Checkbox>
      <Fieldset disabled={useDefaults}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Delivery channels</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {channels.map((channel) => (
            <Checkbox key={channel.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <CheckboxInput name='channels' value={channel.value} defaultChecked={channel.value === 'email'} />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
                <CheckboxIndeterminateIcon />
              </CheckboxIndicator>
              {channel.label}
            </Checkbox>
          ))}
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <CheckboxInput defaultChecked disabled aria-describedby='security-alerts-note' />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
                <CheckboxIndeterminateIcon />
              </CheckboxIndicator>
              Security alerts
            </Checkbox>
            <HelperText id='security-alerts-note' style={{ paddingInlineStart: 'var(--spacing-12)' }}>Required by your organization and cannot be turned off.</HelperText>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Сброс

`<button type='reset'>` возвращает каждое неконтролируемое поле к значению по умолчанию:

- нативные части возвращаются к `defaultValue` или `defaultChecked`
- `NumberField`, `PhoneField`, `PinField`, `DateField`, `DateRangeField`, `DateTimeField`, `TimeField` и `Slider` восстанавливают `defaultValue` своего корня, в том числе для формы, связанной атрибутом `form`
- контролируемое поле сохраняет свой `value`, потому что им владеет родитель: сбросьте это состояние в `onReset` формы

В `onReset` же удобно очищать результаты отправки и сообщения об ошибках, которые хранятся в состоянии.

## Чек-лист

- Дайте `name` каждому отправляемому полю; поле без него не попадает в `FormData`.
- Держите правила валидации на частях-полях, чтобы браузер, автозаполнение и сервер видели одни и те же ограничения.
- Связывайте `aria-invalid` и `aria-describedby` сами, а `error` передавайте только как визуальное состояние.
- Отключайте группу через `Fieldset` с `disabled`, а не через `disabled` на каждом элементе.
- Проверяйте те же правила на сервере: валидация на клиенте — удобство, а не гарантия.
