import { FormEvent, useState } from 'react';
import { Button, HelperText, Label, TimeField, TimeFieldInput } from '@vega-ui/react';

const isOvernight = (time: string) => time >= '22:00' || time <= '06:00';

export default function NightDeliveryForm() {
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onChangeValue = (value: string) => {
    setTime(value);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (time && !isOvernight(time)) {
      setError('Night deliveries arrive between 22:00 and 06:00.');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='night-delivery'>Night delivery at</Label>
        <TimeField error={invalid} value={time} onChangeValue={onChangeValue}>
          <TimeFieldInput
            id='night-delivery'
            required
            placeholder='hh:mm'
            aria-invalid={invalid}
            aria-describedby='night-delivery-hint'
          />
        </TimeField>
        <HelperText id='night-delivery-hint' error={invalid}>{invalid ? error : 'Between 22:00 and 06:00.'}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book</Button>
      </div>
    </form>
  );
}
