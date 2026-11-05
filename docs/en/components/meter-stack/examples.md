# MeterStack Examples

## Basic

### Basic: storage breakdown with a legend

One total split into categories on a real scale (`max` is the device capacity in gigabytes). Each segment gets its color through `--meter-stack-segment-color`, its own `aria-label` and a readable `aria-valuetext`, and the root is a named group. The legend repeats the numbers in text so the split does not depend on color.

<!-- example: meter-stack/storage-breakdown.tsx -->
```tsx
import { MeterStack, MeterStackSegment, Text } from '@vega-ui/react';
import { CSSProperties, useId } from 'react';

const categories = [
  { id: 'apps', label: 'Apps', gb: 82, color: 'var(--color-blue-500)' },
  { id: 'photos', label: 'Photos', gb: 64, color: 'var(--color-purple-500)' },
  { id: 'messages', label: 'Messages', gb: 18, color: 'var(--color-green-500)' },
  { id: 'system', label: 'System', gb: 31, color: 'var(--color-gray-500)' },
];

export default function StorageBreakdown() {
  const titleId = useId();
  const capacity = 256;
  const used = categories.reduce((sum, category) => sum + category.gb, 0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={titleId} size={2} fontWeight={500}>iPhone storage</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{used} GB of {capacity} GB used</Text>
        </div>
        <MeterStack value={used} max={capacity} role='group' aria-labelledby={titleId} fullWidth>
          {categories.map((category) => (
            <MeterStackSegment
              key={category.id}
              value={category.gb}
              aria-label={category.label}
              aria-valuetext={`${category.gb} GB`}
              style={{ '--meter-stack-segment-color': category.color } as CSSProperties}
            />
          ))}
        </MeterStack>
      </div>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4) var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {categories.map((category) => (
          <li key={category.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: category.color }} />
            <Text size={2}>{category.label}</Text>
            <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{category.gb} GB</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: service health by period

The parent owns the selected period and derives the segment values from it. Switching between 24 hours, 7 days and 30 days animates the segment widths, and the uptime percentage above the bar is computed from the same numbers.

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

## Form/Integration

### Form/Integration: password strength

A password field in a real form drives four checks; each passed check adds one equal segment, and all segments take the color of the current level. The bar is decorative here (`aria-hidden`), while the strength text is linked to the input with `aria-describedby`, so a screen reader hears it on focus. The submit handler reads the value with `FormData`.

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

## Layout/Overlay

### Layout/Overlay: revenue split in a card

A card summary with a large stack and a description list underneath: amount and share per channel. The heading names the group, and currency formatting comes from `Intl.NumberFormat`, the same values feeding both the bar and the list.

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

## Error

### Error: seats over the plan limit

When the segments add up to more than `max`, the stack clips the overflow, so the bar alone looks merely full. The example compares the sum with the limit, recolors the overflowing segment and links an error `HelperText` to the group with `aria-describedby`; removing guests clears the error.

<!-- example: meter-stack/overloaded-quota-breakdown.tsx -->
```tsx
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
```
<!-- /example -->

## Edge

### Edge: many tiny segments grouped into “Other”

Segments under 2% of the total are too thin to see or to label. The example merges them into one “Other” segment, keeps the segment count small and lists the merged items in text.

<!-- example: meter-stack/many-small-segments.tsx -->
```tsx
import { MeterStack, MeterStackSegment, Text } from '@vega-ui/react';
import { CSSProperties, useId } from 'react';

const languages = [
  { name: 'TypeScript', bytes: 812400 },
  { name: 'CSS', bytes: 146900 },
  { name: 'MDX', bytes: 61300 },
  { name: 'JavaScript', bytes: 18200 },
  { name: 'Shell', bytes: 4100 },
  { name: 'HTML', bytes: 2600 },
  { name: 'Dockerfile', bytes: 900 },
  { name: 'Makefile', bytes: 400 },
];

const colors = ['var(--color-blue-500)', 'var(--color-purple-500)', 'var(--color-orange-500)', 'var(--color-amber-500)'];

export default function ManySmallSegments() {
  const titleId = useId();
  const total = languages.reduce((sum, language) => sum + language.bytes, 0);
  const minShare = 0.02;

  const visible = languages.filter((language) => language.bytes / total >= minShare);
  const hidden = languages.filter((language) => language.bytes / total < minShare);
  const otherBytes = hidden.reduce((sum, language) => sum + language.bytes, 0);

  const segments = visible.map((language, index) => ({ label: language.name, bytes: language.bytes, color: colors[index] }));
  if (otherBytes > 0) {
    segments.push({ label: `Other (${hidden.length})`, bytes: otherBytes, color: 'var(--color-gray-500)' });
  }

  const percent = (bytes: number) => `${((bytes / total) * 100).toFixed(1)}%`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id={titleId} size={2} fontWeight={500}>Languages</Text>
        <MeterStack value={total} max={total} role='group' aria-labelledby={titleId} fullWidth>
          {segments.map((segment) => (
            <MeterStackSegment
              key={segment.label}
              value={segment.bytes}
              aria-label={segment.label}
              aria-valuetext={percent(segment.bytes)}
              style={{ '--meter-stack-segment-color': segment.color } as CSSProperties}
            />
          ))}
        </MeterStack>
      </div>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4) var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {segments.map((segment) => (
          <li key={segment.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: segment.color }} />
            <Text size={2}>{segment.label}</Text>
            <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{percent(segment.bytes)}</Text>
          </li>
        ))}
      </ul>
      <Text size={1} style={{ color: 'var(--label-tertiary)' }}>
        Other: {hidden.map((language) => language.name).join(', ')}
      </Text>
    </div>
  );
}
```
<!-- /example -->
