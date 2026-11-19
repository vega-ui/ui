import {
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

export default function LargeAmountNoWheel() {
  const id = useId();
  const [limit, setLimit] = useState(2500000);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Annual spend limit, USD</Label>
      <NumberField
        min={0}
        max={50000000}
        step={10000}
        maximumFractionDigits={0}
        changeOnWheel={false}
        value={limit}
        onChangeValue={setLimit}
      >
        <NumberFieldDecrementButton square aria-label='Decrease by 10,000'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
        <NumberFieldInput id={id} aria-describedby={`${id}-hint`} />
        <NumberFieldIncrementButton square aria-label='Increase by 10,000'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
      </NumberField>
      <HelperText id={`${id}-hint`} style={{ fontVariantNumeric: 'tabular-nums' }}>
        {Number.isNaN(limit) ? 'No limit set.' : `About ${compact.format(limit)}. Max 50M.`}
      </HelperText>
    </div>
  );
}
