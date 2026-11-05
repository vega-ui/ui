# Badge Patterns

## Inline Status Label

When to use:

- A row or card needs one compact status.

Composition notes:

- Keep the text very short.
- Pair with surrounding content that explains the object being labeled.

Trade-offs:

- Very compact.
- Weak fit for explanatory feedback.

<!-- example: badge/basic-usage.tsx -->
```tsx
import { Badge, Text } from '@vega-ui/react';

const releases = [
  { version: 'v2.8.0', date: 'Nov 3, 2026', status: 'Live', variant: 'success' },
  { version: 'v2.8.0-rc.2', date: 'Oct 30, 2026', status: 'Rolling back', variant: 'warning' },
  { version: 'v2.7.4', date: 'Oct 21, 2026', status: 'Failed', variant: 'error' },
  { version: 'v2.7.3', date: 'Oct 14, 2026', status: 'Archived', variant: 'info' },
];

export default function BasicUsage() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      {releases.map((release) => (
        <li key={release.version} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Text size={3} fontWeight={500}>{release.version}</Text>
          <Badge size='sm' variant={release.variant}>{release.status}</Badge>
          <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{release.date}</Text>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

## Metadata Flag

When to use:

- Small supporting metadata should sit next to a heading or field label.

Composition notes:

- Use lower-emphasis appearance for secondary metadata.
- Keep the badge visually subordinate to the main content.

Trade-offs:

- Strong scanability.
- Easy to overuse as visual noise.

<!-- example: badge/heading-flags.tsx -->
```tsx
import { Badge, Heading, Text } from '@vega-ui/react';

export default function HeadingFlags() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-10)', width: '100%', maxWidth: 520 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Heading as='h3' size={4} fontWeight={600}>Usage-based billing</Heading>
          <Badge size='xs' variant='info' appearance='outline'>Beta</Badge>
        </div>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Charge customers for API calls, seats or storage.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Heading as='h3' size={4} fontWeight={600}>Audit log export</Heading>
          <Badge size='xs' variant='warning' appearance='surface'>Enterprise</Badge>
        </div>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Stream every admin action to your SIEM.</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Count Badge

When to use:

- A short numeric or count signal is enough.

Composition notes:

- Prefer very short numeric content.
- Avoid putting large counts or long labels into a tiny badge.

Trade-offs:

- Works well for compact counts.
- Loses clarity when the text grows.

<!-- example: badge/unread-count.tsx -->
```tsx
import { useState } from 'react';
import { Badge, Button, Text, VisuallyHidden } from '@vega-ui/react';

const max = 99;

export default function UnreadCount() {
  const [count, setCount] = useState(7);

  let shown = String(count);
  if (count > max) shown = `${max}+`;

  let label = `${count} unread messages`;
  if (count === 1) label = '1 unread message';

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Text size={3} fontWeight={500}>Inbox</Text>
        {count > 0 && (
          <Badge size='xs' variant='error' appearance='fill' style={{ fontVariantNumeric: 'tabular-nums' }}>
            <span aria-hidden='true'>{shown}</span>
            <VisuallyHidden>{label}</VisuallyHidden>
          </Badge>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setCount(0)}>Mark all read</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setCount(count + 1)}>+1 message</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setCount(count + 100)}>+100 messages</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->
