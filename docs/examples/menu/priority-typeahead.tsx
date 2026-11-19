import { useState } from 'react';
import { Badge, Button, Menu, MenuContent, MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuTrigger } from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';

const priorities = [
  { value: 'urgent', label: 'Urgent', code: 'P1', variant: 'error' },
  { value: 'high', label: 'High', code: 'P2', variant: 'warning' },
  { value: 'medium', label: 'Medium', code: 'P3', variant: 'info' },
  { value: 'low', label: 'Low', code: 'P4', variant: 'info' },
];

export default function PriorityTypeahead() {
  const [priority, setPriority] = useState('medium');
  const current = priorities.find((item) => item.value === priority);

  return (
    <Menu size='sm'>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Priority: {current?.label}</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuRadioGroup aria-label='Priority' value={priority} onChangeValue={setPriority}>
          {priorities.map((item) => (
            <MenuRadioItem key={item.value} value={item.value} label={item.label}>
              <Badge size='xs' variant={item.variant} appearance='ghost' aria-hidden='true' style={{ fontVariantNumeric: 'tabular-nums' }}>{item.code}</Badge>
              {item.label}
              <MenuItemIndicator style={{ marginInlineStart: 'auto' }}><CheckIcon /></MenuItemIndicator>
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
