import {
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function StepperSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 220 }}>
      {SIZES.map((size) => (
        <NumberField key={size} size={size} min={0} max={10} defaultValue={3}>
          <NumberFieldDecrementButton aria-label={`Decrease, size ${size}`} />
          <NumberFieldInput aria-label={`Guests, size ${size}`} />
          <NumberFieldIncrementButton aria-label={`Increase, size ${size}`} />
        </NumberField>
      ))}
    </div>
  );
}
