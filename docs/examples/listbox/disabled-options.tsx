import { Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useId } from 'react';

const sizes = [
  { value: 'xs', label: 'XS', stock: 0 },
  { value: 's', label: 'S', stock: 4 },
  { value: 'm', label: 'M', stock: 12 },
  { value: 'l', label: 'L', stock: 0 },
  { value: 'xl', label: 'XL', stock: 2 },
];

export default function DisabledOptions() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Text id={id} size={3} fontWeight={500}>Size</Text>
      <Listbox aria-labelledby={id} defaultValue='m' style={{ border: '1px solid var(--separator-opaque)' }}>
        {sizes.map((size) => (
          <ListboxOption key={size.value} value={size.value} disabled={size.stock === 0}>
            {size.label}
            <span style={{ marginInlineStart: 'auto', opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}>
              {size.stock === 0 ? 'Sold out' : `${size.stock} left`}
            </span>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  );
}
