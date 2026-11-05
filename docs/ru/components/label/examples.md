# Label: примеры

## Базовый

### Базовый: подпись текстового поля

`htmlFor` должен совпадать с `id` нативного инпута — `TextFieldInput`, а не обёртки `TextField`. `useId` сохраняет id уникальным, даже если форма отрисована несколько раз. Клик по подписи ставит фокус в инпут.

<!-- example: label/field-label.tsx -->
```tsx
import { Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldLabel() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Company name</Label>
      <TextField>
        <TextFieldInput id={id} name='company' autoComplete='organization' />
      </TextField>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: подписи составных полей

В составных полях `id` ставится на фокусируемую часть: `SelectCombobox`, `NumberFieldInput` или сам `TextArea`. Тогда подпись называет именно её, и клик по подписи переносит туда фокус.

<!-- example: label/labels-for-composite-fields.tsx -->
```tsx
import {
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  TextArea,
} from '@vega-ui/react';
import { useId } from 'react';

export default function LabelsForCompositeFields() {
  const id = useId();

  return (
    <form style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-region`}>Data region</Label>
        <Select defaultValue='eu-central'>
          <SelectHiddenSelect name='region' />
          <SelectCombobox id={`${id}-region`}>
            <SelectValue placeholder='Choose a region' />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='eu-central'>Frankfurt (eu-central)</SelectOption>
            <SelectOption value='us-east'>Virginia (us-east)</SelectOption>
            <SelectOption value='ap-south'>Mumbai (ap-south)</SelectOption>
          </SelectListbox>
        </Select>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-replicas`}>Read replicas</Label>
        <NumberField min={0} max={5} defaultValue={1}>
          <NumberFieldDecrementButton aria-label='Remove a replica' />
          <NumberFieldInput id={`${id}-replicas`} name='replicas' />
          <NumberFieldIncrementButton aria-label='Add a replica' />
        </NumberField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-notes`}>Notes for the on-call team</Label>
        <TextArea id={`${id}-notes`} name='notes' rows={3} fullWidth />
      </div>
    </form>
  );
}
```
<!-- /example -->

### Форма/интеграция: оборачивающая подпись без id

Если обернуть контрол в `Label`, связь возникает неявно — ни `htmlFor`, ни `id` не нужны. Подходит для контролов из одного нативного элемента, вроде `TextArea` и `Radio`; `TextField` рендерит обёртку `<div>`, которую подпись содержать не должна, а корни `Checkbox` и `Switch` уже сами являются подписями.

<!-- example: label/wrapping-label.tsx -->
```tsx
import { Label, Radio, TextArea } from '@vega-ui/react';

export default function WrappingLabel() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Label style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        Delivery instructions
        <TextArea name='instructions' rows={3} fullWidth placeholder='Gate code, floor, where to leave the parcel' />
      </Label>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label fontWeight={400} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Radio name='window' value='morning' defaultChecked />
          Morning, 8:00–12:00
        </Label>
        <Label fontWeight={400} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Radio name='window' value='evening' />
          Evening, 17:00–21:00
        </Label>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: подписи слева от полей

Сетка из двух колонок ставит подписи слева от полей. `display: contents` на каждой строке оставляет подпись и поле прямыми элементами сетки, а длинные подписи переносятся внутри своей колонки и не сдвигают поле.

<!-- example: label/side-by-side-labels.tsx -->
```tsx
import { Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

const FIELDS = [
  { name: 'firstName', label: 'First name', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last name', autoComplete: 'family-name' },
  { name: 'jobTitle', label: 'Job title shown on your public profile', autoComplete: 'organization-title' },
];

export default function SideBySideLabels() {
  const id = useId();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(96px, 160px) minmax(0, 1fr)',
        alignItems: 'center',
        columnGap: 'var(--spacing-8)',
        rowGap: 'var(--spacing-6)',
        width: '100%',
      }}
    >
      {FIELDS.map((field) => (
        <div key={field.name} style={{ display: 'contents' }}>
          <Label htmlFor={`${id}-${field.name}`} size='sm'>{field.label}</Label>
          <TextField>
            <TextFieldInput id={`${id}-${field.name}`} name={field.name} autoComplete={field.autoComplete} />
          </TextField>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: отметка обязательности и сообщение об ошибке

Звёздочка декоративна и скрыта от скринридера; обязательность озвучивает `required` на инпуте. Подпись при ошибке не меняется — ошибку несёт сообщение под полем, связанное через `aria-describedby`.

<!-- example: label/required-field-error.tsx -->
```tsx
import { Button, HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function RequiredFieldError() {
  const id = useId();
  const messageId = `${id}-message`;
  const [taxId, setTaxId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && taxId.trim() === '';

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>
          VAT number <span aria-hidden style={{ color: 'var(--color-error)' }}>*</span>
        </Label>
        <TextField error={invalid}>
          <TextFieldInput
            id={id}
            name='vat'
            required
            value={taxId}
            aria-invalid={invalid}
            aria-describedby={messageId}
            onChange={(event) => setTaxId(event.currentTarget.value)}
          />
        </TextField>
        <HelperText id={messageId} error={invalid}>
          {invalid ? 'Enter the VAT number to issue tax invoices.' : 'Printed on every invoice, for example DE123456789.'}
        </HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start' }}>Save billing details</Button>
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: подпись отключённого поля

У `Label` нет собственного отключённого стиля, поэтому приглушайте её вместе с полем, которое она называет. Здесь чекбокс отключает поле адреса, и подпись следует за ним.

<!-- example: label/label-for-disabled-field.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function LabelForDisabledField() {
  const id = useId();
  const [sameAsCompany, setSameAsCompany] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={sameAsCompany} onChange={(event) => setSameAsCompany(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
        </CheckboxIndicator>
        Ship to the company address
      </Checkbox>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label
          htmlFor={id}
          style={{ color: sameAsCompany ? 'var(--label-tertiary)' : undefined, cursor: sameAsCompany ? 'not-allowed' : undefined }}
        >
          Shipping address
        </Label>
        <TextField>
          <TextFieldInput id={id} name='shippingAddress' autoComplete='shipping street-address' disabled={sameAsCompany} />
        </TextField>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: визуально скрытая подпись

Если в дизайне нет места для видимой подписи, оставьте настоящий `<label>` и скройте его через `VisuallyHidden`. Скринридеры и голосовое управление по-прежнему получают имя, а плейсхолдер остаётся лишь примером.

<!-- example: label/visually-hidden-label.tsx -->
```tsx
import { Button, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { useId } from 'react';

export default function VisuallyHiddenLabel() {
  const id = useId();

  return (
    <form role='search' style={{ display: 'flex', gap: 'var(--spacing-4)', width: '100%' }}>
      <VisuallyHidden asChild>
        <Label htmlFor={id}>Search the help center</Label>
      </VisuallyHidden>
      <TextField style={{ flex: 1 }}>
        <TextFieldInput id={id} type='search' name='q' placeholder='How do I export invoices?' />
      </TextField>
      <Button type='submit'>Search</Button>
    </form>
  );
}
```
<!-- /example -->
