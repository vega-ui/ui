import {
  Button,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { FormEvent, useId, useState } from 'react';

const DEFAULT_BUDGET = 2500;

export default function FormSubmitAndReset() {
  const id = useId();
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(`monthlyBudget=${new FormData(event.currentTarget).get('monthlyBudget')}`);
  };

  const onReset = () => {
    setBudget(DEFAULT_BUDGET);
    setSubmitted('');
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Monthly budget, USD</Label>
        <NumberField min={0} max={1000000} step={500} value={budget} onChangeValue={setBudget} maximumFractionDigits={0}>
          <NumberFieldDecrementButton square aria-label='Decrease budget by 500'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
          <NumberFieldInput id={id} required />
          <NumberFieldIncrementButton square aria-label='Increase budget by 500'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
        </NumberField>
        <input type='hidden' name='monthlyBudget' value={Number.isNaN(budget) ? '' : budget} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted}</Text>
    </form>
  );
}
