import {
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  type NumberFieldProps,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyNumberFieldProps extends NumberFieldProps {
  name?: string
  decrementLabel: string
  incrementLabel: string
}

export function MyNumberField({ id, name, decrementLabel, incrementLabel, ...props }: MyNumberFieldProps) {
  return (
    <NumberField {...props}>
      <NumberFieldDecrementButton square aria-label={decrementLabel}><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
      <NumberFieldInput id={id} name={name} />
      <NumberFieldIncrementButton square aria-label={incrementLabel}><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
    </NumberField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <MyNumberField id={id} name='seats' min={1} max={50} defaultValue={5} decrementLabel='Remove a seat' incrementLabel='Add a seat' />
    </div>
  );
}
