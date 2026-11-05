import { Option } from '@vega-ui/react';

const folders = [
  'Inbox',
  'Projects / 2026 / Northwind logistics / Contracts and signed amendments',
  'Receipts',
  'Archive / Customer support / Escalations that were resolved after the SLA deadline',
];

export default function LongLabel() {
  return (
    <div role='listbox' aria-label='Move to folder' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
      {folders.map((folder) => (
        <Option key={folder} title={folder} selected={folder === 'Receipts'}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{folder}</span>
        </Option>
      ))}
    </div>
  );
}
