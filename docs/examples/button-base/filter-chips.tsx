import { ButtonBase } from '@vega-ui/react';
import { useState } from 'react';

const tasks = [
  { title: 'Draft Q3 roadmap', status: 'open' },
  { title: 'Review onboarding copy', status: 'review' },
  { title: 'Fix billing export', status: 'open' },
  { title: 'Ship dark theme', status: 'done' },
  { title: 'Audit color contrast', status: 'review' },
];

const filters = ['open', 'review', 'done'];

export default function FilterChips() {
  const [active, setActive] = useState<string[]>(['open']);

  const toggle = (filter: string) => {
    if (active.includes(filter)) {
      setActive(active.filter((item) => item !== filter));
      return;
    }

    setActive([...active, filter]);
  };

  const visible = tasks.filter((task) => active.includes(task.status));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='group' aria-label='Task status' style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {filters.map((filter) => {
          const pressed = active.includes(filter);

          return (
            <ButtonBase
              key={filter}
              type='button'
              variant={pressed ? 'primary' : 'secondary'}
              appearance={pressed ? 'fill' : 'ghost'}
              aria-pressed={pressed}
              onClick={() => toggle(filter)}
              style={{
                padding: 'var(--spacing-2) var(--spacing-8)',
                borderRadius: 999,
                fontSize: 'var(--font-size-2)',
                textTransform: 'capitalize',
              }}
            >
              {filter}
            </ButtonBase>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <p role='status' style={{ margin: 0, color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)', fontVariantNumeric: 'tabular-nums' }}>
          {visible.length} of {tasks.length} tasks
        </p>
        <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-10)' }}>
          {visible.map((task) => <li key={task.title}>{task.title}</li>)}
        </ul>
      </div>
    </div>
  );
}
