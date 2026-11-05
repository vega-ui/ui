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
