import { Option } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div role='listbox' aria-label='Issue status' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
      <Option>Backlog</Option>
      <Option selected>In progress</Option>
      <Option>In review</Option>
      <Option>Done</Option>
    </div>
  );
}
