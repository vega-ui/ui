# Badge Examples

## Basic

### Basic: release statuses

Each status maps to a variant, and the text always names the state, so the meaning does not depend on color alone.

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

### Basic: metadata next to a heading

Low-emphasis `outline` and `surface` badges at `size='xs'` mark a feature as Beta or plan-limited without competing with the heading. The badge sits next to the heading, not inside it, so the heading text stays clean for screen readers and the outline.

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

## Controlled/Stateful

### Controlled/Stateful: deployment status from state

The label and the variant are derived from the current stage, and the badge sits in a `role='status'` region so each change is announced.

<!-- example: badge/deploy-status.tsx -->
```tsx
import { useEffect, useState } from 'react';
import { Badge, Button, Text } from '@vega-ui/react';

type Stage = 'idle' | 'building' | 'deploying' | 'live';

const stages: Record<Stage, { label: string; variant: string }> = {
  idle: { label: 'Not deployed', variant: 'info' },
  building: { label: 'Building', variant: 'warning' },
  deploying: { label: 'Deploying', variant: 'warning' },
  live: { label: 'Live', variant: 'success' },
};

export default function DeployStatus() {
  const [stage, setStage] = useState<Stage>('idle');

  useEffect(() => {
    if (stage === 'building') {
      const timer = setTimeout(() => setStage('deploying'), 1500);
      return () => clearTimeout(timer);
    }
    if (stage === 'deploying') {
      const timer = setTimeout(() => setStage('live'), 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const busy = stage === 'building' || stage === 'deploying';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', flex: 1, minWidth: 0 }}>
        <Text size={3} fontWeight={500}>checkout-service</Text>
        <span role='status'>
          <Badge size='sm' variant={stages[stage].variant} appearance={stage === 'live' ? 'fill' : 'ghost'}>
            {stages[stage].label}
          </Badge>
        </span>
      </div>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={busy} onClick={() => setStage('building')}>
        {stage === 'live' ? 'Redeploy' : 'Deploy'}
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: status column in a table

Badges stay on one line inside table cells; long customer names wrap in their own column instead. The table scrolls horizontally on narrow screens.

<!-- example: badge/invoices-table.tsx -->
```tsx
import { Badge, Table, TableBody, TableData, TableHead, TableHeading, TableRow, Text } from '@vega-ui/react';

const statusVariant: Record<string, string> = {
  Paid: 'success',
  Overdue: 'error',
  Draft: 'info',
  'Partially paid': 'warning',
};

const invoices = [
  { id: 'INV-2051', customer: 'Northwind Traders', amount: '$4,200.00', status: 'Paid' },
  { id: 'INV-2050', customer: 'Contoso Pharmaceuticals International', amount: '$12,980.50', status: 'Overdue' },
  { id: 'INV-2049', customer: 'Fabrikam', amount: '$860.00', status: 'Partially paid' },
  { id: 'INV-2048', customer: 'Adventure Works', amount: '$1,315.75', status: 'Draft' },
];

export default function InvoicesTable() {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Table aria-label='Recent invoices' fullWidth dataAlign='start'>
        <TableHead>
          <TableRow>
            <TableHeading><Text size={2} style={{ color: 'var(--label-secondary)' }}>Customer</Text></TableHeading>
            <TableHeading dataAlign='end'><Text size={2} style={{ color: 'var(--label-secondary)' }}>Amount</Text></TableHeading>
            <TableHeading dataAlign='end'><Text size={2} style={{ color: 'var(--label-secondary)' }}>Status</Text></TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData>
                <Text size={2} fontWeight={500} asChild><div>{invoice.customer}</div></Text>
                <Text size={1} style={{ color: 'var(--label-secondary)' }}>{invoice.id}</Text>
              </TableData>
              <TableData dataAlign='end'>
                <Text size={2} style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{invoice.amount}</Text>
              </TableData>
              <TableData dataAlign='end'>
                <Badge size='sm' variant={statusVariant[invoice.status]}>{invoice.status}</Badge>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: failing status with the reason linked

The error badge says what is wrong in one word, and the full reason is a separate text linked to the retry button with `aria-describedby`. A successful retry switches the badge to “Healthy”.

<!-- example: badge/webhook-health.tsx -->
```tsx
import { useState } from 'react';
import { Badge, Button, Text } from '@vega-ui/react';

export default function WebhookHealth() {
  const [failing, setFailing] = useState(true);
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setFailing(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>https://hooks.northwind.io/orders</Text>
        <span role='status'>
          <Badge size='sm' variant={failing ? 'error' : 'success'}>{failing ? 'Failing' : 'Healthy'}</Badge>
        </span>
      </div>
      {failing && (
        <>
          <Text id='webhook-error' size={2} style={{ color: 'var(--label-secondary)' }}>
            Last 12 deliveries returned 503 Service Unavailable. Deliveries are paused until the endpoint responds.
          </Text>
          <Button size='sm' variant='secondary' appearance='ghost' aria-describedby='webhook-error' disabled={retrying} onClick={retry} style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>
            {retrying ? 'Retrying…' : 'Retry deliveries'}
          </Button>
        </>
      )}
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: count with a cap and a full accessible label

Counts above 99 are shown as “99+”, zero hides the badge, and the exact number is read by screen readers through `VisuallyHidden` while the short visual text is `aria-hidden`.

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

### Edge: long and non-Latin labels in a narrow container

Badges do not wrap their text. A long tag needs `max-width`, a shrinkable flex item and an ellipsis, with the full text in `title`; Cyrillic and CJK labels keep the same height.

<!-- example: badge/long-labels.tsx -->
```tsx
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
```
<!-- /example -->
