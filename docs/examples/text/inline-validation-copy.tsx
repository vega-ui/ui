import { Button, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState, type CSSProperties, type FormEvent } from 'react';

const validCodes = ['SPRING20', 'WELCOME10'];

export default function InlineValidationCopy() {
  const [error, setError] = useState('');
  const [applied, setApplied] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const code = String(data.get('coupon')).trim().toUpperCase();

    if (!validCodes.includes(code)) {
      setApplied('');
      setError(`${code === '' ? 'This code' : code} is not valid or has expired.`);
      return;
    }

    setError('');
    setApplied(`${code} applied to your order.`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='coupon-code'>Coupon code</Label>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <TextField error={error !== ''} style={{ flex: 1, minWidth: 0 }}>
          <TextFieldInput
            id='coupon-code'
            name='coupon'
            autoComplete='off'
            aria-invalid={error !== ''}
            aria-describedby={error ? 'coupon-code-error' : undefined}
            onChange={() => setError('')}
          />
        </TextField>
        <Button type='submit' variant='secondary' appearance='ghost'>Apply</Button>
      </div>
      {error && (
        <Text id='coupon-code-error' size={2} style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
          {error}
        </Text>
      )}
      {applied && <Text size={2} role='status' style={{ '--t-color': 'var(--color-green-accent-600)' } as CSSProperties}>{applied}</Text>}
    </form>
  );
}
