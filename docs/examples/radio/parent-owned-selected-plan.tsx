import { useState } from 'react';
import { Fieldset, FieldsetLegend, Radio, Text } from '@vega-ui/react';

const cycles = [
  { value: 'monthly', label: 'Monthly', perMonth: 15 },
  { value: 'yearly', label: 'Yearly (2 months free)', perMonth: 12.5 },
];

export default function ParentOwnedSelectedPlan() {
  const [cycle, setCycle] = useState('yearly');

  const selected = cycles.find((item) => item.value === cycle) ?? cycles[0];
  const seats = 8;
  const total = selected.perMonth * seats;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Billing cycle</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {cycles.map((item) => (
            <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Radio
                name='billing-cycle'
                value={item.value}
                checked={cycle === item.value}
                onChange={(event) => setCycle(event.currentTarget.value)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </Fieldset>
      <Text size={3} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {seats} seats × ${selected.perMonth.toFixed(2)} = <strong>${total.toFixed(2)}</strong> per month
      </Text>
    </div>
  );
}
