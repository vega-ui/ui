# Heading: паттерны

## Заголовок раздела

Когда использовать:

- странице или панели нужен видимый структурный заголовок

Заметки о композиции:

- сначала выберите `as` по структуре документа
- затем выберите `size` по визуальному ритму

Компромиссы:

- сохраняет и семантику, и визуальную гибкость
- требует дисциплины, когда заголовков несколько

<!-- example: heading/document-outline.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';

export default function DocumentOutline() {
  return (
    <article style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: '60ch' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h1'>Getting started</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Set up your workspace in three steps.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h2'>Invite your team</Heading>
        <Text size={3}>Members get access to every public project.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h3'>Roles and permissions</Heading>
        <Text size={3}>Admins manage billing; editors can create projects.</Text>
      </div>
    </article>
  );
}
```
<!-- /example -->

## Компактная иерархия в плотных панелях

Когда использовать:

- плотной странице настроек нужны визуально меньшие заголовки без смены семантического уровня

Заметки о композиции:

- сохраняйте правильный `as`
- уменьшайте `size`, только если иерархия остаётся понятной

Компромиссы:

- экономит место
- при злоупотреблении может ослабить визуальную иерархию

<!-- example: heading/compact-hierarchy-in-dense-panels.tsx -->
```tsx
import { Card, Heading, Text } from '@vega-ui/react';

const keys = [
  { name: 'Production', created: 'Created Jan 12', lastUsed: 'Used 2 minutes ago' },
  { name: 'CI pipeline', created: 'Created Feb 3', lastUsed: 'Used yesterday' },
];

export default function CompactHierarchyInDensePanels() {
  return (
    <Card asChild size='sm' style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <section aria-labelledby='api-keys-title'>
        <Heading as='h3' size={4} id='api-keys-title'>API keys</Heading>
        {keys.map((key) => (
          <div key={key.name} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Heading as='h4' size={3} fontWeight={500}>{key.name}</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{key.created} · {key.lastUsed}</Text>
          </div>
        ))}
      </section>
    </Card>
  );
}
```
<!-- /example -->

## Заголовок с поясняющим текстом

Когда использовать:

- заголовку раздела нужно короткое описание

Заметки о композиции:

- оставляйте в `Heading` только заголовок
- поясняющий текст размещайте в `Text`

Компромиссы:

- чёткое разделение ролей
- нужен один дополнительный текстовый элемент

`<hgroup>` связывает описание с заголовком, не делая его частью текста заголовка.

<!-- example: heading/heading-with-supporting-copy.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function HeadingWithSupportingCopy() {
  return (
    <hgroup style={{ display: 'grid', gap: 'var(--spacing-2)', width: '100%', margin: 0 }}>
      <Heading as='h2' size={6}>Billing contacts</Heading>
      <Text asChild size={3} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
        <p>Invoices and payment reminders are sent to these people.</p>
      </Text>
    </hgroup>
  );
}
```
<!-- /example -->
