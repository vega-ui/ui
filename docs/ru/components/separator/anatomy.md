# Separator: анатомия

## Обзор

`Separator` — примитив из одной части, который рендерит тонкую разделительную линию с `role='separator'`.

## Обязательные части

### `Separator`

Обязательная часть. Отвечает и за семантическую роль разделителя, и за визуальную линию.

## Необязательные части

Экспортируемых дочерних частей нет.

## Порядок композиции

1. `Separator`

## Допустимые варианты композиции

Горизонтальный разделитель между содержимым и подвалом и вертикальный — между действиями подвала. У строки подвала явная высота, потому что вертикальный разделитель берёт `height: 100%` от родителя.

<!-- example: separator/valid-composition-patterns.tsx -->
```tsx
import { Button, Card, Heading, Separator, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Card style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Quarterly report</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Revenue grew 12% compared to the previous quarter.</Text>
      </div>
      <Separator />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', height: 'var(--spacing-16)' }}>
        <Button size='sm' variant='secondary' appearance='ghost'>Download PDF</Button>
        <Separator orientation='vertical' />
        <Button size='sm' variant='secondary' appearance='ghost'>Share</Button>
      </div>
    </Card>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Вертикальный разделитель без высоты родителя

Разделитель схлопывается, потому что у него нет контекста высоты.

### Разделитель как единственная структура раздела

Это создаёт визуальное разделение без семантической подписи.
