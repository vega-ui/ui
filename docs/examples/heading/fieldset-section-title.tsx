import {
  Button,
  Fieldset,
  FieldsetLegend,
  Heading,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useState, type FormEvent } from 'react';

export default function FieldsetSectionTitle() {
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Invoices for ${data.get('company')} go to ${data.get('billingEmail')}.`);
  };

  return (
    <form
      aria-labelledby='billing-form-title'
      onSubmit={onSubmit}
      onReset={() => setSaved('')}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}
    >
      <Heading as='h2' size={6} id='billing-form-title'>Billing details</Heading>
      <Fieldset style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-6)' }}>Company</FieldsetLegend>
        <Label htmlFor='billing-company-name'>Legal name</Label>
        <TextField>
          <TextFieldInput id='billing-company-name' name='company' autoComplete='organization' required />
        </TextField>
      </Fieldset>
      <Fieldset style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-6)' }}>Invoices</FieldsetLegend>
        <Label htmlFor='billing-invoice-email'>Send invoices to</Label>
        <TextField>
          <TextFieldInput id='billing-invoice-email' name='billingEmail' type='email' autoComplete='email' required />
        </TextField>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Save</Button>
        </div>
        {saved && <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved}</Text>}
      </div>
    </form>
  );
}
