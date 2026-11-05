import { useState } from 'react';
import { AvatarFallback, AvatarStack, AvatarStackItem, Button, Text } from '@vega-ui/react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const maxVisible = 4;

export default function LargeTeam() {
  const [total, setTotal] = useState(1248);

  const visibleCount = Math.min(total, maxVisible);
  const rest = total - visibleCount;
  const members = Array.from({ length: visibleCount }, (_, index) => `${letters[index * 3]}${letters[index * 5 + 1]}`);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minHeight: 40 }}>
        <AvatarStack size='sm' role='group' aria-label={`${total.toLocaleString('en-US')} members`}>
          {members.map((initials) => (
            <AvatarStackItem key={initials} aria-hidden='true'>
              <AvatarFallback>{initials}</AvatarFallback>
            </AvatarStackItem>
          ))}
        </AvatarStack>
        <Text size={2} aria-hidden='true' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{rest > 0 ? `+${compact.format(rest)} more` : ''}</Text>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        {[1, 4, 5, 87, 1248, 2400000].map((value) => (
          <Button key={value} size='sm' variant={value === total ? 'primary' : 'secondary'} appearance='ghost' onClick={() => setTotal(value)} style={{ fontVariantNumeric: 'tabular-nums' }}>
            {value.toLocaleString('en-US')}
          </Button>
        ))}
      </div>
    </div>
  );
}
