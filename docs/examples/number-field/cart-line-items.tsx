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
