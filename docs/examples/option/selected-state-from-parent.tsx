import { Option, Text } from '@vega-ui/react';
import { KeyboardEvent, useId, useState } from 'react';

const statuses = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'progress', label: 'In progress' },
  { value: 'review', label: 'In review' },
  { value: 'done', label: 'Done' },
];

export default function SelectedStateFromParent() {
  const id = useId();
  const [selected, setSelected] = useState('review');
  const [active, setActive] = useState<string | null>(null);
  const current = statuses.find((status) => status.value === selected);

  const moveActive = (step: number) => {
    const index = statuses.findIndex((status) => status.value === active);
    const next = Math.min(Math.max(index + step, 0), statuses.length - 1);
    setActive(statuses[next].value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActive(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(-1);
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (active === null) return;

    event.preventDefault();
    setSelected(active);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 260 }}>
      <div
        role='listbox'
        tabIndex={0}
        aria-label='Issue status'
        aria-activedescendant={active === null ? undefined : `${id}-${active}`}
        onKeyDown={onKeyDown}
        onFocus={() => setActive(selected)}
        onBlur={() => setActive(null)}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
      >
        {statuses.map((status) => (
          <Option
            key={status.value}
            id={`${id}-${status.value}`}
            selected={status.value === selected}
            active={status.value === active}
            onClick={() => setSelected(status.value)}
          >
            {status.label}
          </Option>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Status: {current?.label}</Text>
    </div>
  );
}
