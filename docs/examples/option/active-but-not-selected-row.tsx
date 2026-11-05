import { Option } from '@vega-ui/react';
import { useId } from 'react';

export default function ActiveButNotSelectedRow() {
  const id = useId();

  return (
    <div
      role='listbox'
      tabIndex={0}
      aria-label='Sort by'
      aria-activedescendant={`${id}-oldest`}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
    >
      <Option id={`${id}-newest`} selected>Newest first</Option>
      <Option id={`${id}-oldest`} active>Oldest first</Option>
      <Option id={`${id}-popular`}>Most popular</Option>
      <Option id={`${id}-price`} disabled>Price, low to high</Option>
    </div>
  );
}
