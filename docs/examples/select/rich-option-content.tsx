import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const plans = [
  { value: 'starter', name: 'Starter', price: '$0', description: 'Up to 3 projects and 1 GB of storage' },
  { value: 'team', name: 'Team', price: '$12 per seat', description: 'Unlimited projects, shared workspaces' },
  { value: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'SSO, audit log and a dedicated manager' },
];

export default function RichOptionContent() {
  const id = useId();
  const [plan, setPlan] = useState<string | null>('team');
  const selected = plans.find((item) => item.value === plan);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Plan</Label>
      <Select value={plan} onChangeValue={(next) => setPlan(next ?? null)}>
        <SelectHiddenSelect name='plan' />
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a plan'>{selected?.name}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          {plans.map((item) => (
            <SelectOption
              key={item.value}
              value={item.value}
              label={item.name}
              style={{ height: 'auto', paddingBlock: 'var(--spacing-6)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                <Text size={3} fontWeight={500}>
                  {item.name} · {item.price}
                </Text>
                <Text size={2} style={{ opacity: 0.75 }}>{item.description}</Text>
              </div>
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
