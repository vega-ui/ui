# Label: паттерны

## Явная подпись и id поля ввода

Когда использовать:

- подпись и элемент управления рендерятся как отдельные соседние элементы

Заметки по композиции:

- задайте элементу управления стабильный `id`
- свяжите с ним `Label` через `htmlFor`

Компромиссы:

- понятно и явно
- требует управления `id`

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

## Подпись, оборачивающая контрол

Когда использовать:

- подпись и контрол из одного элемента (`TextArea`, `Radio`) должны образовывать одну цель для клика без работы с id

Заметки по композиции:

- оберните контрол в `Label`; `htmlFor` и `id` не нужны
- не оборачивайте `TextField` (его корень — `<div>`) и `Checkbox`/`Switch` (их корни уже являются `<label>`)

Компромиссы:

- увеличивает область нажатия
- хуже подходит для сложных вложенных раскладок

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

## Подпись со вспомогательным текстом

Когда использовать:

- полю нужна видимая подпись и дополнительная подсказка

Заметки по композиции:

- держите саму подпись отдельно от вспомогательного текста
- размещайте вспомогательный текст под элементом управления или рядом с ним

Компромиссы:

- сохраняет понятную семантику
- требует дополнительного текстового элемента для подсказки

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
