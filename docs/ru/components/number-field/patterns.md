# NumberField: паттерны

## Счётчик количества

Когда использовать:

- компактной строке нужно точное управление количеством

Заметки по композиции:

- размещайте кнопки уменьшения и увеличения по разные стороны от input
- задавайте реалистичные `min` и `max`

Компромиссы:

- точно и компактно
- плотнее, чем простое текстовое поле

<!-- example: number-field/cart-line-items.tsx -->
```tsx
import {
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

interface LineItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function CartLineItems() {
  const [items, setItems] = useState<LineItem[]>([
    { sku: 'KB-01', name: 'Mechanical keyboard', price: 129, quantity: 1 },
    { sku: 'MS-02', name: 'Wireless mouse', price: 49, quantity: 2 },
    { sku: 'HB-07', name: 'USB-C hub, 7 ports', price: 64.9, quantity: 1 },
  ]);

  const changeQuantity = (sku: string, quantity: number) => {
    setItems((current) => current.map((item) => (item.sku === sku ? { ...item, quantity } : item)));
  };

  const total = items.reduce((sum, item) => {
    if (Number.isNaN(item.quantity)) return sum;
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--spacing-8)',
        width: '100%',
        padding: 'var(--spacing-8)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--separator-opaque)',
        background: 'var(--surface-primary)',
      }}
    >
      {items.map((item) => (
        <div key={item.sku} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 132px', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={3} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{currency.format(item.price)}</Text>
          </div>
          <NumberField size='sm' min={0} max={20} value={item.quantity} onChangeValue={(quantity) => changeQuantity(item.sku, quantity)}>
            <NumberFieldDecrementButton aria-label={`Remove one ${item.name}`} />
            <NumberFieldInput aria-label={`Quantity of ${item.name}`} />
            <NumberFieldIncrementButton aria-label={`Add one ${item.name}`} />
          </NumberField>
        </div>
      ))}
      <div
        role='status'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBlockStart: 'var(--spacing-8)',
          borderBlockStart: '1px solid var(--separator-opaque)',
        }}
      >
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Subtotal</Text>
        <Text size={3} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(total)}</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Дробная настройка

Когда использовать:

- цены, проценты или измерения требуют малых приращений

Заметки по композиции:

- осознанно задавайте `step` и `maximumFractionDigits`
- проверяйте округление на реальных значениях

Компромиссы:

- точно
- более хрупко, чем сценарии только с целыми числами

<!-- example: number-field/discount-percentage.tsx -->
```tsx
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
```
<!-- /example -->

## Числовая строка, удобная для форм

Когда использовать:

- нативная форма должна отправлять значение напрямую

Заметки по композиции:

- задавайте `name` на `NumberFieldInput`
- явно выбирайте модель значения: по умолчанию или контролируемую

Компромиссы:

- простая нативная отправка
- по-прежнему нужна валидация на бэкенде

<!-- example: number-field/form-submit-and-reset.tsx -->
```tsx
import {
  Button,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function FormSubmitAndReset() {
  const id = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = String(new FormData(event.currentTarget).get('monthlyBudget'));
    const budget = Number(raw.replace(/\s/g, ''));
    setSubmitted(`Field text “${raw}” → number ${budget}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSubmitted('')}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Monthly budget, USD</Label>
        <NumberField min={0} max={1000000} step={500} defaultValue={2500} maximumFractionDigits={0}>
          <NumberFieldDecrementButton aria-label='Decrease budget by 500' />
          <NumberFieldInput id={id} name='monthlyBudget' required />
          <NumberFieldIncrementButton aria-label='Increase budget by 500' />
        </NumberField>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted}</Text>
    </form>
  );
}
```
<!-- /example -->
