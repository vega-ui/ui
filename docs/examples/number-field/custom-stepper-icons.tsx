import {
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function CustomStepperIcons() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 200 }}>
      <Label htmlFor={id}>Font size, px</Label>
      <NumberField min={8} max={72} defaultValue={16}>
        <NumberFieldDecrementButton aria-label='Smaller'>
          <Icon><ChevronDownIcon /></Icon>
        </NumberFieldDecrementButton>
        <NumberFieldInput id={id} />
        <NumberFieldIncrementButton aria-label='Larger'>
          <Icon><ChevronUpIcon /></Icon>
        </NumberFieldIncrementButton>
      </NumberField>
    </div>
  );
}
