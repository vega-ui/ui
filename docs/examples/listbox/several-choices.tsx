import { Button, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useState } from 'react';

const toppings = [
  { value: 'cheese', label: 'Extra mozzarella', price: 1.5 },
  { value: 'mushrooms', label: 'Mushrooms', price: 1 },
  { value: 'olives', label: 'Black olives', price: 1 },
  { value: 'pepperoni', label: 'Pepperoni', price: 2 },
  { value: 'jalapenos', label: 'Jalapeños', price: 0.5 },
];

export default function SeveralChoices() {
  const [selected, setSelected] = useState<string[]>(['cheese']);
  const total = toppings
    .filter((item) => selected.includes(item.value))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%', maxWidth: 320 }}>
      <Listbox aria-label='Toppings' multiple value={selected} onChangeValue={setSelected} style={{ border: '1px solid var(--separator-opaque)' }}>
        {toppings.map((item) => (
          <ListboxOption key={item.value} value={item.value}>
            {item.label}
          </ListboxOption>
        ))}
      </Listbox>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {selected.length} selected · +${total.toFixed(2)}
        </Text>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={selected.length === 0} onClick={() => setSelected([])}>
          Clear
        </Button>
      </div>
    </div>
  );
}
