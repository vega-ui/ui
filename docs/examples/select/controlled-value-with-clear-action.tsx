import {
  Button,
  Label,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const priorities = [
  { value: 'low', label: 'Low', response: 'within 3 business days' },
  { value: 'normal', label: 'Normal', response: 'within 1 business day' },
  { value: 'urgent', label: 'Urgent', response: 'within 1 hour' },
];

export default function ControlledValueWithClearAction() {
  const id = useId();
  const [priority, setPriority] = useState<string | null>('normal');
  const current = priorities.find((item) => item.value === priority);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Priority</Label>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Select style={{ flex: 1 }} value={priority} onChangeValue={(next) => setPriority(next ?? null)}>
          <SelectCombobox id={id}>
            <SelectValue placeholder='Not set' />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            {priorities.map((item) => (
              <SelectOption key={item.value} value={item.value}>
                {item.label}
              </SelectOption>
            ))}
          </SelectListbox>
        </Select>
        <Button
          variant='secondary'
          appearance='ghost'
          disabled={priority === null}
          onClick={() => setPriority(null)}
        >
          Clear
        </Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-2)' }}>
        {current ? `First response ${current.response}.` : 'No priority: the ticket waits in the general queue.'}
      </Text>
    </div>
  );
}
