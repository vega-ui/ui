import { Button, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function HiddenHelperDescription() {
  const [budget, setBudget] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBudget(String(new FormData(event.currentTarget).get('budget')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='monthly-budget'>Monthly budget</Label>
      <TextField style={{ paddingInlineStart: 'var(--spacing-8)', gap: 'var(--spacing-2)' }}>
        <span aria-hidden='true' style={{ color: 'var(--label-secondary)' }}>$</span>
        <TextFieldInput
          id='monthly-budget'
          name='budget'
          type='number'
          min={0}
          step={50}
          defaultValue={500}
          aria-describedby='monthly-budget-currency'
          required
          style={{ paddingInlineStart: 0, fontVariantNumeric: 'tabular-nums' }}
        />
      </TextField>
      <VisuallyHidden asChild>
        <span id='monthly-budget-currency'>Amount in US dollars</span>
      </VisuallyHidden>
      <Button type='submit' style={{ alignSelf: 'flex-start', marginBlockStart: 'var(--spacing-9)' }}>Save budget</Button>
      <output style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {budget === '' ? '' : `Budget set to $${budget}`}
      </output>
    </form>
  );
}
