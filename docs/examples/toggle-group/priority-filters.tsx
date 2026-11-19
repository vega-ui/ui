import { useState } from 'react';
import { Button, Text, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';

const priorities = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
];

const tasks = [
  { id: 1, title: 'Fix the checkout timeout', priority: 'urgent' },
  { id: 2, title: 'Renew the SSL certificate', priority: 'urgent' },
  { id: 3, title: 'Review the onboarding copy', priority: 'high' },
  { id: 4, title: 'Update the team page', priority: 'low' },
  { id: 5, title: 'Archive old invoices', priority: 'low' },
];

export default function PriorityFilters() {
  const [filters, setFilters] = useState<string[]>(['urgent']);
  const shown = filters.length === 0 ? tasks : tasks.filter((task) => filters.includes(task.priority));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        <ToggleGroup aria-label='Priority' size='xs' multiple value={filters} onChangeValue={setFilters}>
          {priorities.map((priority) => (
            <ToggleGroupToggle key={priority.value} value={priority.value}>{priority.label}</ToggleGroupToggle>
          ))}
        </ToggleGroup>
        <Button size='xs' variant='secondary' appearance='transparent' style={{ marginInlineStart: 'auto' }} onClick={() => setFilters([])}>Clear</Button>
      </div>
      <ul style={{ display: 'grid', gap: 'var(--spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
        {shown.map((task) => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 'var(--spacing-4)',
              padding: 'var(--spacing-4) var(--spacing-6)',
              borderRadius: 'var(--radius-4)',
              background: 'var(--fills-quaternary)',
            }}
          >
            <Text size={2} style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{task.title}</Text>
            <Text size={2} style={{ flexShrink: 0, color: 'var(--label-secondary)' }}>
              {priorities.find((priority) => priority.value === task.priority)?.label}
            </Text>
          </li>
        ))}
      </ul>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {filters.length === 0 ? `All ${tasks.length} tasks` : `${shown.length} of ${tasks.length} tasks`}
      </Text>
    </div>
  );
}
