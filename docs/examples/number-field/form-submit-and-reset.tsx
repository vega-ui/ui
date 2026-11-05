import {
  Button,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function FormSubmitAndReset() {
  const id = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = String(new FormData(event.currentTarget).get('monthlyBudget'));
    const budget = Number(raw.replace(/\s/g, ''));
    setSubmitted(`Field text “${raw}” → number ${budget}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSubmitted('')}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Monthly budget, USD</Label>
        <NumberField min={0} max={1000000} step={500} defaultValue={2500} maximumFractionDigits={0}>
          <NumberFieldDecrementButton aria-label='Decrease budget by 500' />
          <NumberFieldInput id={id} name='monthlyBudget' required />
          <NumberFieldIncrementButton aria-label='Increase budget by 500' />
        </NumberField>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted}</Text>
    </form>
  );
}
