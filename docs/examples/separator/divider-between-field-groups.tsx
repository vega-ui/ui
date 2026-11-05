import {
  Button,
  Fieldset,
  FieldsetLegend,
  Label,
  Separator,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useState, type FormEvent } from 'react';

export default function DividerBetweenFieldGroups() {
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Saved ${data.get('fullName')} <${data.get('email')}>, ${data.get('company')}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSaved('')}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}
    >
      <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-8)' }}>Personal details</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-name'>Full name</Label>
          <TextField>
            <TextFieldInput id='billing-name' name='fullName' autoComplete='name' required />
          </TextField>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-email'>Email</Label>
          <TextField>
            <TextFieldInput id='billing-email' name='email' type='email' autoComplete='email' required />
          </TextField>
        </div>
      </Fieldset>
      <Separator />
      <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-8)' }}>Company</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-company'>Company name</Label>
          <TextField>
            <TextFieldInput id='billing-company' name='company' autoComplete='organization' />
          </TextField>
        </div>
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
