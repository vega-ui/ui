# Badge: примеры

## Базовый

### Базовый: статусы релизов

Каждому статусу соответствует свой вариант, а текст всегда называет состояние, поэтому смысл не зависит только от цвета.

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

### Базовый: метаданные рядом с заголовком

Неакцентные бейджи `outline` и `surface` размера `size='xs'` помечают функцию как Beta или доступную только на тарифе и не спорят с заголовком. Бейдж стоит рядом с заголовком, а не внутри него, поэтому текст заголовка остаётся чистым для скринридера и оглавления.

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

## Контролируемый/с состоянием

### Контролируемый/с состоянием: статус деплоя из состояния

Подпись и вариант вычисляются из текущего этапа, а бейдж находится в области `role='status'`, поэтому каждое изменение озвучивается.

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

## Раскладка/оверлей

### Раскладка/оверлей: колонка статуса в таблице

Бейджи остаются в одну строку внутри ячеек; переносятся длинные имена клиентов в своей колонке. На узких экранах таблица прокручивается по горизонтали.

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

## Ошибка

### Ошибка: статус сбоя со связанной причиной

Бейдж ошибки одним словом говорит, что не так, а полная причина — отдельный текст, связанный с кнопкой повтора через `aria-describedby`. Успешный повтор переключает бейдж на «Healthy».

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

## Пограничный случай

### Пограничный случай: счётчик с ограничением и полной доступной подписью

Числа больше 99 показываются как «99+», ноль скрывает бейдж, а точное число скринридер читает из `VisuallyHidden`, тогда как короткий визуальный текст помечен `aria-hidden`.

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

### Пограничный случай: длинные и нелатинские подписи в узком контейнере

Бейдж не переносит текст. Длинному тегу нужны `max-width`, сжимаемый flex-элемент и многоточие, а полный текст — в `title`; кириллические и китайские подписи сохраняют ту же высоту.

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
