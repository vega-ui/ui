import { Separator, Text } from '@vega-ui/react';

const items = [
  { name: 'Wireless keyboard', price: '$89.00' },
  { name: 'USB-C hub, 7 ports', price: '$45.00' },
  { name: 'Shipping', price: '$6.50' },
];

export default function HorizontalSectionDivider() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      {items.map((item) => (
        <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>{item.name}</Text>
          <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{item.price}</Text>
        </div>
      ))}
      <Separator />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$140.50</Text>
      </div>
    </div>
  );
}
