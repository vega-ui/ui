import { Card, Heading, MeterStack, MeterStackSegment, Text } from '@vega-ui/react';
import { CSSProperties, useId } from 'react';

const channels = [
  { id: 'web', label: 'Web store', amount: 184200, color: 'var(--color-blue-500)' },
  { id: 'ios', label: 'iOS app', amount: 121700, color: 'var(--color-purple-500)' },
  { id: 'android', label: 'Android app', amount: 64300, color: 'var(--color-green-500)' },
  { id: 'partners', label: 'Partners', amount: 29800, color: 'var(--color-orange-500)' },
];

export default function RevenueSplitSummary() {
  const titleId = useId();
  const total = channels.reduce((sum, channel) => sum + channel.amount, 0);
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading id={titleId} as='h3' size={4} fontWeight={600}>Q3 revenue by channel</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{currency.format(total)} total</Text>
      </div>
      <MeterStack value={total} max={total} role='group' aria-labelledby={titleId} size='lg' fullWidth>
        {channels.map((channel) => (
          <MeterStackSegment
            key={channel.id}
            value={channel.amount}
            aria-label={channel.label}
            aria-valuetext={currency.format(channel.amount)}
            style={{ '--meter-stack-segment-color': channel.color } as CSSProperties}
          />
        ))}
      </MeterStack>
      <dl style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 'var(--spacing-3) var(--spacing-8)', margin: 0 }}>
        {channels.map((channel) => (
          <div key={channel.id} style={{ display: 'contents' }}>
            <dt style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: channel.color }} />
              <Text size={2}>{channel.label}</Text>
            </dt>
            <dd style={{ margin: 0, textAlign: 'end' }}>
              <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(channel.amount)}</Text>
            </dd>
            <dd style={{ margin: 0, textAlign: 'end' }}>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{Math.round((channel.amount / total) * 100)}%</Text>
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
