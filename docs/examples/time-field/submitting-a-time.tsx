import { FormEvent, useState } from 'react';
import { Button, HelperText, Label, Text, TimeField, TimeFieldInput } from '@vega-ui/react';

export default function QuietHoursForm() {
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  };

  return (
    <form onSubmit={onSubmit} onReset={() => setSubmitted('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='quiet-from'>Mute notifications from</Label>
        <TimeField defaultValue='22:00'>
          <TimeFieldInput
            id='quiet-from'
            name='quietFrom'
            required
            pattern='\d{2}:\d{2}'
            placeholder='hh:mm'
            aria-describedby='quiet-from-hint'
          />
        </TimeField>
        <HelperText id='quiet-from-hint'>24-hour time, for example 22:00.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Save</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Sent: <code>{submitted}</code></Text>}
    </form>
  );
}
