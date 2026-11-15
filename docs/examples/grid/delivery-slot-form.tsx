import { FormEvent, useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  HelperText,
  Text,
} from '@vega-ui/react';
import './examples.css';

const days = [
  { date: '2026-03-10', label: 'Tue 10' },
  { date: '2026-03-11', label: 'Wed 11' },
  { date: '2026-03-12', label: 'Thu 12' },
];
const windows = ['08:00', '12:00', '16:00'];
const full = ['2026-03-10T08:00', '2026-03-11T12:00'];

export default function DeliverySlotForm() {
  const [slot, setSlot] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const [submitted, setSubmitted] = useState('');

  const onChangeValue = (key: string) => {
    setSlot(key);
    setMissing(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = String(new FormData(event.currentTarget).get('slot'));
    if (!value) {
      setMissing(true);
      return;
    }

    setSubmitted(value);
  };

  const onReset = () => {
    setSlot(null);
    setMissing(false);
    setSubmitted('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: 'fit-content' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='delivery-slot-label' fontWeight={500}>Delivery window</Text>
        <Grid
          aria-labelledby='delivery-slot-label'
          selection='single'
          aria-describedby={missing ? 'delivery-slot-error' : undefined}
          value={slot}
          onChangeValue={onChangeValue}
          disabled={full}
          defaultActive='2026-03-10T12:00'
          className='selectableGrid'
        >
          <GridRowGroup>
            {days.map((day, row) => (
              <GridRow key={day.date} row={row}>
                <GridRowHeader col={0} excluded>{day.label}</GridRowHeader>
                {windows.map((time, col) => (
                  <GridCell key={time} col={col + 1} value={`${day.date}T${time}`}>
                    {time}
                  </GridCell>
                ))}
              </GridRow>
            ))}
          </GridRowGroup>
        </Grid>
        <input type='hidden' name='slot' value={slot ?? ''} />
        {missing && <HelperText id='delivery-slot-error' invalid style={{ contain: 'inline-size' }}>Choose a delivery window to continue.</HelperText>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Book delivery</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>Submitted slot={submitted}</Text>}
    </form>
  );
}
