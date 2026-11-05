import { Badge, Text } from '@vega-ui/react';

const tags = [
  'enterprise-customer-success-escalation-q4',
  'Требует проверки юристом',
  '优先处理',
  'β-tester',
];

export default function LongLabels() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 280, padding: 'var(--spacing-8)', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Ticket #88412 · tags</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        {tags.map((tag) => (
          <Badge
            key={tag}
            size='sm'
            variant='info'
            appearance='outline'
            title={tag}
            style={{ maxWidth: '100%', minWidth: 0, flexShrink: 1 }}
          >
            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{tag}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
