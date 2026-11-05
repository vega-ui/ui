# Card: паттерны

## Поверхность настроек

Когда использовать:

- Небольшой набор связанных настроек должен находиться на одной поверхности.

Заметки по композиции:

- Явно задавайте заголовки и внутренние отступы.
- Поверхность отвечает за группировку, а не за каждое решение об отступах.

Компромиссы:

- Сильная визуальная группировка.
- Легко злоупотребить ею как универсальной обёрткой с отступами.

<!-- example: card/settings-form-card.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import { Button, Card, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';

export default function SettingsFormCard() {
  const [saved, setSaved] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Saved “${data.get('workspace')}” at ${data.get('slug')}.vega.app`);
  };

  return (
    <Card asChild style={{ width: '100%', maxWidth: 420, gap: 'var(--spacing-12)' }}>
      <form aria-labelledby='workspace-card-title' onSubmit={submit} onReset={() => setSaved('')}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading id='workspace-card-title' as='h3' size={4} fontWeight={600}>Workspace</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shown in invitations and in the browser tab.</Text>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-8)', alignSelf: 'stretch' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='workspace-card-name'>Name</Label>
            <TextField>
              <TextFieldInput id='workspace-card-name' name='workspace' defaultValue='Northwind Studio' required />
            </TextField>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='workspace-card-slug'>URL</Label>
            <TextField>
              <TextFieldInput id='workspace-card-slug' name='slug' defaultValue='northwind' pattern='[a-z0-9-]{3,32}' required />
            </TextField>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)', alignSelf: 'stretch' }}>
          <Button type='submit' size='sm'>Save</Button>
          <Button type='reset' size='sm' variant='secondary' appearance='ghost'>Reset</Button>
          <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved}</Text>
        </div>
      </form>
    </Card>
  );
}
```
<!-- /example -->

## Поверхность метрик или сводки

Когда использовать:

- Дашборду или экрану оплаты нужно сгруппированное сводное содержимое.

Заметки по композиции:

- Делайте ключевые метрики визуально заметными внутри карточки.
- Используйте иерархию содержимого, а не только оформление поверхности.

Компромиссы:

- Хорошо подходит для сводок и сгруппированных метаданных.
- Плохо подходит, когда содержимое на деле — одна встроенная метка.

<!-- example: card/metrics-card.tsx -->
```tsx
import { useState } from 'react';
import { Button, Card, Heading, Spinner, Text } from '@vega-ui/react';

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function MetricsCard() {
  const [revenue, setRevenue] = useState(48210.4);
  const [updatedAt, setUpdatedAt] = useState('09:00');
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      const now = new Date();
      setRevenue((current) => current + Math.round(Math.random() * 90000) / 100);
      setUpdatedAt(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setLoading(false);
    }, 900);
  };

  return (
    <Card aria-labelledby='revenue-title' aria-busy={loading} style={{ width: '100%', maxWidth: 300, gap: 'var(--spacing-2)' }}>
      <Heading id='revenue-title' as='h3' size={2} fontWeight={500} style={{ color: 'var(--label-secondary)' }}>Revenue this month</Heading>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minHeight: 36 }}>
        <Text size={7} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{formatter.format(revenue)}</Text>
        {loading && <Spinner size={3} aria-label='Refreshing revenue' />}
      </div>
      <Text size={2} style={{ color: 'var(--label-tertiary)', fontVariantNumeric: 'tabular-nums' }}>Updated at {updatedAt}</Text>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={loading} onClick={refresh} style={{ marginBlockStart: 'var(--spacing-6)' }}>Refresh</Button>
    </Card>
  );
}
```
<!-- /example -->

## Навигационная поверхность

Когда использовать:

- Одна сгруппированная поверхность должна вести на более глубокий экран.

Заметки по композиции:

- Используйте `asChild` с настоящей ссылкой или ссылкой роутера.
- Из содержимого карточки должно быть понятно, куда она ведёт.

Компромиссы:

- Хорошо подходит для точек входа на дашборде.
- При злоупотреблении легко смешать семантику раскладки и навигации.

<!-- example: card/link-cards.tsx -->
```tsx
import { Card, Heading, Text } from '@vega-ui/react';
import './examples.css';

const destinations = [
  { href: '#billing', title: 'Billing', description: 'Plan, invoices and payment methods.' },
  { href: '#members', title: 'Members', description: '18 members, 3 pending invitations.' },
  { href: '#security', title: 'Security', description: 'Two-factor authentication, sessions and SSO.' },
];

export default function LinkCards() {
  return (
    <nav aria-label='Workspace settings' style={{ width: '100%' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 'var(--spacing-6)' }}>
        {destinations.map((destination) => (
          <li key={destination.href} style={{ display: 'grid' }}>
            <Card asChild size='sm' className='linkCard'>
              <a href={destination.href} style={{ color: 'inherit', textDecoration: 'none', gap: 'var(--spacing-2)' }}>
                <Heading as='h3' size={3} fontWeight={600}>{destination.title}</Heading>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{destination.description}</Text>
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```
<!-- /example -->
