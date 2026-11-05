# Label Patterns

## Explicit Label And Input Id

When to use:

- the label and control are rendered as separate siblings

Composition notes:

- give the control a stable `id`
- connect `Label` with `htmlFor`

Trade-offs:

- clear and explicit
- requires id management

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

## Wrapping Label

When to use:

- the label and a single-element control (`TextArea`, `Radio`) should form one click target without managing ids

Composition notes:

- wrap the control inside `Label`; no `htmlFor` or `id` is needed
- do not wrap `TextField` (its root is a `<div>`) or `Checkbox`/`Switch` (their roots are already `<label>` elements)

Trade-offs:

- improves hit area
- less suitable for complex nested layouts

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

## Label With Helper Copy

When to use:

- the field needs visible labeling plus secondary guidance

Composition notes:

- keep the actual label separate from helper text
- place helper copy below the control or nearby

Trade-offs:

- preserves clear semantics
- requires an extra text element for guidance

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
