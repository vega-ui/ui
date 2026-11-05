import {
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const LIST_PRICE = 1290;
export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function DiscountPercentage({ locale = 'en-US' }: { locale?: string }) {
  const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  const id = useId();
  const [discount, setDiscount] = useState(12.5);
  const price = Number.isNaN(discount) ? LIST_PRICE : LIST_PRICE * (1 - discount / 100);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor={id}>Discount</Label>
      <NumberField min={0} max={100} step={0.5} maximumFractionDigits={1} value={discount} onChangeValue={setDiscount}>
        <NumberFieldDecrementButton aria-label='Decrease discount by 0.5%' />
        <NumberFieldInput id={id} aria-describedby={`${id}-price`} />
        <Text size={3} aria-hidden style={{ color: 'var(--label-secondary)' }}>%</Text>
        <NumberFieldIncrementButton aria-label='Increase discount by 0.5%' />
      </NumberField>
      <Text id={`${id}-price`} size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        Annual plan: {currency.format(price)} instead of {currency.format(LIST_PRICE)}
      </Text>
    </div>
  );
}
