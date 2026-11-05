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
