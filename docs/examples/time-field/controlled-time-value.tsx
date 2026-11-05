import { useState } from 'react';
import { Fieldset, FieldsetLegend, Label, Text, TimeField, TimeFieldInput } from '@vega-ui/react';

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const describeShift = (start: string, end: string) => {
  if (!start || !end) return 'Enter both times';

  const length = toMinutes(end) - toMinutes(start);

  return `${Math.floor(length / 60)} h ${length % 60} min`;
};

export default function ShiftHours() {
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('17:30');

  return (
    <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-6)' }}>Shift</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='shift-start'>Starts</Label>
        <TimeField value={start} onChangeValue={setStart}>
          <TimeFieldInput id='shift-start' placeholder='hh:mm' />
        </TimeField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='shift-end'>Ends</Label>
        <TimeField min={start} value={end} onChangeValue={setEnd}>
          <TimeFieldInput id='shift-end' placeholder='hh:mm' />
        </TimeField>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        Length: {describeShift(start, end)}
      </Text>
    </Fieldset>
  );
}
