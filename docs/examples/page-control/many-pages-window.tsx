import { PageControl, PageControlItem, Text } from '@vega-ui/react';
import { useState } from 'react';

const total = 30;
const windowSize = 7;

export default function ManyPagesWindow() {
  const [active, setActive] = useState(0);

  const half = Math.floor(windowSize / 2);
  const first = Math.min(Math.max(active - half, 0), total - windowSize);
  const visible = Array.from({ length: windowSize }, (_, offset) => first + offset);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>Photo {active + 1} of {total}</Text>
      <PageControl active={active} onChangeActive={setActive} aria-label={`Photos, ${total} in total`}>
        {visible.map((index) => (
          <PageControlItem
            key={index}
            index={index}
            aria-label={`Photo ${index + 1} of ${total}`}
          />
        ))}
      </PageControl>
      <Text size={1} style={{ color: 'var(--label-secondary)' }}>Use the arrow keys to move through all {total} photos.</Text>
    </div>
  );
}
