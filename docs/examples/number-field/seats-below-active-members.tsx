import {
  HelperText,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const ACTIVE_MEMBERS = 12;

const getSeatsError = (seats: number) => {
  if (Number.isNaN(seats)) return 'Enter the number of seats.';
  if (seats < ACTIVE_MEMBERS) return `You have ${ACTIVE_MEMBERS} active members. Remove members first or keep at least ${ACTIVE_MEMBERS} seats.`;
  return '';
};

export default function SeatsBelowActiveMembers() {
  const id = useId();
  const messageId = `${id}-message`;
  const [seats, setSeats] = useState(10);
  const error = getSeatsError(seats);
  const invalid = error !== '';

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Seats after renewal</Label>
      <NumberField min={1} max={200} value={seats} onChangeValue={setSeats} error={invalid}>
        <NumberFieldDecrementButton aria-label='Remove a seat' />
        <NumberFieldInput id={id} aria-invalid={invalid} aria-describedby={messageId} />
        <NumberFieldIncrementButton aria-label='Add a seat' />
      </NumberField>
      <HelperText id={messageId} error={invalid}>
        {invalid ? error : `Covers all ${ACTIVE_MEMBERS} active members.`}
      </HelperText>
    </div>
  );
}
