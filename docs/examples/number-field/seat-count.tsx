import {
  HelperText,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { useId } from 'react';

export default function SeatCount() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <NumberField min={1} max={50} defaultValue={5}>
        <NumberFieldDecrementButton aria-label='Remove a seat' />
        <NumberFieldInput id={id} name='seats' aria-describedby={hintId} />
        <NumberFieldIncrementButton aria-label='Add a seat' />
      </NumberField>
      <HelperText id={hintId}>From 1 to 50 seats on the Team plan.</HelperText>
    </div>
  );
}
