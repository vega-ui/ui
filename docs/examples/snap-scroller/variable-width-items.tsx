import { SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import { useState } from 'react';

const collections = [
  'New in',
  'Outerwear',
  'Knitwear and cardigans',
  'Shoes',
  'Bags',
  'Accessories',
  'Sale',
];

export default function VariableWidthItems() {
  const [committed, setCommitted] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <SnapScroller
        tabIndex={0}
        aria-label='Collections'
        onScrollSnapChange={(_, index) => setCommitted(index)}
        style={{ gap: 'var(--spacing-4)' }}
      >
        {collections.map((name, index) => (
          <SnapScrollerContent
            key={name}
            index={index}
            style={{
              padding: 'var(--spacing-4) var(--spacing-8)',
              borderRadius: 'var(--radius-8)',
              background: committed === index ? 'var(--fills-primary)' : 'var(--fills-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            <Text size={2}>{name}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Committed item: {collections[committed]}</Text>
    </div>
  );
}
