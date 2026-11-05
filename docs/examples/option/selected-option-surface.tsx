import { Option } from '@vega-ui/react';
import './examples.css';

export default function SelectedOptionSurface() {
  return (
    <div
      role='listbox'
      aria-label='Delivery speed'
      className='option-brand-list'
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
    >
      <Option>Standard, 5–7 days</Option>
      <Option selected>Express, 2 days</Option>
      <Option>Same day</Option>
    </div>
  );
}
