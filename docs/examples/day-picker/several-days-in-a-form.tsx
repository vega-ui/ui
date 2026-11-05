import {
  Button,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function SeveralDaysInAForm() {
  const [days, setDays] = useState<string[]>([]);
  const [missing, setMissing] = useState(false);
  const [submitted, setSubmitted] = useState<string[]>([]);
  const hintId = useId();

  const change = (next: string[]) => {
    setDays(next);
    setMissing(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const shifts = new FormData(event.currentTarget).getAll('shift').map(String);

    if (shifts.length === 0) {
      setMissing(true);
      return;
    }

    setSubmitted(shifts.sort());
  };

  const reset = () => {
    setDays([]);
    setMissing(false);
    setSubmitted([]);
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Extra shifts in November</FieldsetLegend>
        <DayPicker
          aria-label='Shift days, November 2026'
          aria-describedby={hintId}
          locale='en-US'
          selection='multiple'
          month='2026-11-01'
          selected={days}
          onSelectCell={change}
        >
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
        <HelperText id={hintId} error={missing}>
          {missing ? 'Pick at least one day.' : 'Pick every day you can work.'}
        </HelperText>
      </Fieldset>
      {days.map((day) => (
        <input key={day} type='hidden' name='shift' value={day} />
      ))}
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save {days.length} {days.length === 1 ? 'shift' : 'shifts'}</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{submitted.length > 0 ? `Sent shift=${submitted.join(', ')}` : ''}</Text>
    </form>
  );
}
