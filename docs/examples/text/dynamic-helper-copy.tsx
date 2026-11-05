import { Button, Text } from '@vega-ui/react';
import { useState } from 'react';

const totalSeats = 5;
const plural = new Intl.PluralRules('en-US');

export default function DynamicHelperCopy() {
  const [assigned, setAssigned] = useState(3);
  const remaining = totalSeats - assigned;
  const seatWord = plural.select(remaining) === 'one' ? 'seat' : 'seats';

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Text size={3} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {remaining === 0 ? 'All seats are taken. Upgrade to invite more people.' : `${remaining} ${seatWord} left on the Team plan.`}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' disabled={remaining === 0} onClick={() => setAssigned(assigned + 1)}>
          Assign a seat
        </Button>
        <Button
          size='sm'
          variant='secondary'
          appearance='ghost'
          disabled={assigned === 0}
          onClick={() => setAssigned(assigned - 1)}
        >
          Free a seat
        </Button>
      </div>
    </div>
  );
}
