import { type FormEvent, type ReactNode, useState } from 'react';
import { Button, HelperText, Label, Slot, TextArea } from '@vega-ui/react';

interface FieldProps {
  id: string
  label: string
  hint: string
  children: ReactNode
}

function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <Label htmlFor={id}>{label}</Label>
      <Slot id={id} name={id} aria-describedby={`${id}-hint`}>{children}</Slot>
      <HelperText id={`${id}-hint`}>{hint}</HelperText>
    </div>
  );
}

export default function FormControlSlot() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`${data.get('address')} · ${data.get('team-size')} people`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <Field id='address' label='Billing address' hint='Printed on every invoice'>
        <TextArea rows={3} required defaultValue='Acme Inc., 21 Harbour Street, Dublin' />
      </Field>
      <Field id='team-size' label='Team size' hint='Used to suggest a plan'>
        <select
          defaultValue='6–20'
          style={{
            height: 'var(--spacing-21)',
            paddingInline: 'var(--spacing-10)',
            border: 'none',
            borderRadius: 'var(--radius-4)',
            background: 'var(--fills-tertiary)',
            color: 'inherit',
            font: 'inherit',
          }}
        >
          <option>1–5</option>
          <option>6–20</option>
          <option>21–100</option>
        </select>
      </Field>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
        <Button type='submit'>Continue</Button>
        <output style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{result}</output>
      </div>
    </form>
  );
}
