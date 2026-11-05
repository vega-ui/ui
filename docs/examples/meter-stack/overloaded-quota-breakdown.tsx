import { Button, HelperText, MeterStack, MeterStackSegment, Text } from '@vega-ui/react';
import { CSSProperties, useId, useState } from 'react';

export default function OverloadedQuotaBreakdown() {
  const titleId = useId();
  const errorId = useId();
  const seats = 25;
  const admins = 3;
  const members = 18;
  const [guests, setGuests] = useState(3);

  const used = admins + members + guests;
  const overBy = used - seats;
  const overloaded = overBy > 0;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={titleId} size={2} fontWeight={500}>Team seats</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{used} of {seats}</Text>
        </div>
        <MeterStack
          value={used}
          max={seats}
          role='group'
          aria-labelledby={titleId}
          aria-describedby={overloaded ? errorId : undefined}
          fullWidth
        >
          <MeterStackSegment value={admins} aria-label='Admins' style={{ '--meter-stack-segment-color': 'var(--color-purple-500)' } as CSSProperties} />
          <MeterStackSegment value={members} aria-label='Members' style={{ '--meter-stack-segment-color': 'var(--color-blue-500)' } as CSSProperties} />
          <MeterStackSegment
            value={guests}
            aria-label='Guests'
            style={{ '--meter-stack-segment-color': overloaded ? 'var(--color-red-500)' : 'var(--color-green-500)' } as CSSProperties}
          />
        </MeterStack>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          Admins {admins} · Members {members} · Guests {guests}
        </Text>
        {overloaded && (
          <HelperText id={errorId} error>
            {overBy} {overBy === 1 ? 'seat is' : 'seats are'} over the plan. Remove guests or upgrade before the next invoice.
          </HelperText>
        )}
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setGuests(guests + 1)}>
          Invite guest
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setGuests(guests - 1)} disabled={guests === 0}>
          Remove guest
        </Button>
      </div>
    </div>
  );
}
