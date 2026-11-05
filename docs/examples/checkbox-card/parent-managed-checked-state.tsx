import { useState } from 'react';
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Text,
} from '@vega-ui/react';

const extras = [
  { value: 'storage', title: 'Extra storage', description: '+500 GB for files and backups', price: 12 },
  { value: 'seats', title: '5 more seats', description: 'Invite contractors and guests', price: 40 },
  { value: 'analytics', title: 'Advanced analytics', description: 'Funnels and cohorts', price: 25 },
];

export default function ParentManagedCheckedState() {
  const [selected, setSelected] = useState<string[]>(['storage']);

  const toggle = (value: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, value]);
      return;
    }
    setSelected(selected.filter((item) => item !== value));
  };

  const total = extras
    .filter((extra) => selected.includes(extra.value))
    .reduce((sum, extra) => sum + extra.price, 0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='group' aria-label='Extras' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
        {extras.map((extra) => (
          <CheckboxCard key={extra.value}>
            <CheckboxCardContent>
              <CheckboxCardTitle>{extra.title}</CheckboxCardTitle>
              <CheckboxCardDescription>{extra.description} · ${extra.price}/mo</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput
                checked={selected.includes(extra.value)}
                onChange={(event) => toggle(extra.value, event.currentTarget.checked)}
              />
              <CheckboxIndicator>
                <CheckboxCardControlCheckedIcon />
                <CheckboxCardControlIndeterminateIcon />
              </CheckboxIndicator>
            </CheckboxCardControl>
          </CheckboxCard>
        ))}
      </div>
      <Text size={3} fontWeight={600} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>Extras total: ${total}/mo</Text>
    </div>
  );
}
