# MeterStack Patterns

## Segmented Health Indicator

When to use:

- a status metric is easier to read as several component parts

Composition notes:

- keep segment ordering meaningful
- keep nearby labels if colors alone are insufficient

Trade-offs:

- expressive
- harder to interpret than a single bar without context

<!-- example: meter-stack/service-health-by-period.tsx -->
```tsx
import { Button, MeterStack, MeterStackSegment, Text } from '@vega-ui/react';
import { CSSProperties, useId, useState } from 'react';

type Period = '24h' | '7d' | '30d';

const minutesByPeriod: Record<Period, { healthy: number, degraded: number, outage: number }> = {
  '24h': { healthy: 1380, degraded: 52, outage: 8 },
  '7d': { healthy: 9640, degraded: 410, outage: 30 },
  '30d': { healthy: 42310, degraded: 690, outage: 200 },
};

const periods: Period[] = ['24h', '7d', '30d'];

export default function ServiceHealthByPeriod() {
  const titleId = useId();
  const [period, setPeriod] = useState<Period>('24h');

  const { healthy, degraded, outage } = minutesByPeriod[period];
  const total = healthy + degraded + outage;
  const uptime = ((healthy / total) * 100).toFixed(2);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='group' aria-label='Period' style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        {periods.map((item) => (
          <Button
            key={item}
            size='sm'
            variant={item === period ? 'primary' : 'secondary'}
            appearance='ghost'
            aria-pressed={item === period}
            onClick={() => setPeriod(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={titleId} size={2} fontWeight={500}>Checkout API</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{uptime}% healthy</Text>
        </div>
        <MeterStack value={total} max={total} role='group' aria-labelledby={titleId} fullWidth>
          <MeterStackSegment
            value={healthy}
            aria-label='Healthy'
            aria-valuetext={`${healthy} minutes`}
            style={{ '--meter-stack-segment-color': 'var(--color-green-500)' } as CSSProperties}
          />
          <MeterStackSegment
            value={degraded}
            aria-label='Degraded'
            aria-valuetext={`${degraded} minutes`}
            style={{ '--meter-stack-segment-color': 'var(--color-amber-500)' } as CSSProperties}
          />
          <MeterStackSegment
            value={outage}
            aria-label='Outage'
            aria-valuetext={`${outage} minutes`}
            style={{ '--meter-stack-segment-color': 'var(--color-red-500)' } as CSSProperties}
          />
        </MeterStack>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          Degraded {degraded} min · Outage {outage} min
        </Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Password Strength Breakdown

When to use:

- a score is represented as discrete segments

Composition notes:

- keep the segment count stable
- pair with textual strength labeling

Trade-offs:

- intuitive segment-based feedback
- can be mistaken for exact validation without copy

<!-- example: meter-stack/password-strength-breakdown.tsx -->
```tsx
import { Button, HelperText, Label, MeterStack, MeterStackSegment, TextField, TextFieldInput } from '@vega-ui/react';
import { CSSProperties, FormEvent, useId, useState } from 'react';

const levels = [
  { label: 'Too weak', color: 'var(--color-red-500)' },
  { label: 'Weak', color: 'var(--color-red-500)' },
  { label: 'Fair', color: 'var(--color-orange-500)' },
  { label: 'Good', color: 'var(--color-amber-500)' },
  { label: 'Strong', color: 'var(--color-green-500)' },
];

export default function PasswordStrengthBreakdown() {
  const fieldId = useId();
  const strengthId = useId();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const checks = [
    password.length >= 12,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const level = levels[score];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = String(data.get('password'));
    setMessage(`Saved, ${value.length} characters`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={fieldId}>New password</Label>
        <TextField>
          <TextFieldInput
            id={fieldId}
            type='password'
            name='password'
            autoComplete='new-password'
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby={strengthId}
          />
        </TextField>
        <MeterStack value={score} max={checks.length} aria-hidden='true' size='sm' fullWidth>
          {checks.slice(0, score).map((_, index) => (
            <MeterStackSegment
              key={index}
              value={1}
              style={{ '--meter-stack-segment-color': level.color } as CSSProperties}
            />
          ))}
        </MeterStack>
        <HelperText id={strengthId}>
          Strength: {level.label}. Use 12+ characters, mixed case, a digit and a symbol.
        </HelperText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Button type='submit' size='sm'>Set password</Button>
        <HelperText role='status'>{message}</HelperText>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Revenue Or Quota Split

When to use:

- one total should be shown as several contributing parts

Composition notes:

- make segment values sum to the intended total
- use color intentionally

Trade-offs:

- good comparative summary
- tiny segments may need labels outside the component

<!-- example: meter-stack/revenue-split-summary.tsx -->
```tsx
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
```
<!-- /example -->
