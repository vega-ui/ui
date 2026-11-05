import {
  Button,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const UNIT_PRICE = 24.5;
export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function OrderTotal({ locale = 'en-US' }: { locale?: string }) {
  const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  const id = useId();
  const [quantity, setQuantity] = useState(2);
  const empty = Number.isNaN(quantity);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 240 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Notebooks, {currency.format(UNIT_PRICE)} each</Label>
        <NumberField min={0} max={99} value={quantity} onChangeValue={setQuantity}>
          <NumberFieldDecrementButton aria-label='Decrease quantity' />
          <NumberFieldInput id={id} />
          <NumberFieldIncrementButton aria-label='Increase quantity' />
        </NumberField>
      </div>
      <Text size={3} fontWeight={500} role='status' style={{ fontVariantNumeric: 'tabular-nums' }}>
        Total: {empty ? '—' : currency.format(quantity * UNIT_PRICE)}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setQuantity(10)}>Bulk: 10</Button>
        <Button size='sm' variant='secondary' appearance='transparent' onClick={() => setQuantity(NaN)}>Clear</Button>
      </div>
    </div>
  );
}
