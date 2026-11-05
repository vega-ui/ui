# Badge

## Профиль документа

`primitive`

## Кратко

`Badge` — компактная метка статуса или категории для счётчиков, состояний и небольших метаданных. Он нужен для небольших встроенных подсказок о статусе, а не для полноценных сообщений обратной связи.

## Импорт

```tsx
import {
  Badge,
  type BadgeProps,
  type BadgeSize,
  type BadgeAppearance,
  type BadgeVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `BadgeProps`
- `BadgeSize`
- `BadgeAppearance`
- `BadgeVariant`

## Базовое использование

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

## Варианты

- Размеры: `xs`, `sm`, `md`, `lg`, `xl`
- Внешний вид: `fill`, `outline`, `ghost`, `surface`
- Варианты: `success`, `error`, `warning`, `info`

## Связанные документы

- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Текст бейджа должен быть коротким: это не контейнер для абзаца в форме таблетки.
- Используйте семантические варианты единообразно во всём продукте.
- Пользовательские строковые токены работают, только если для них есть соответствующие стили.
- Если пользователю нужно объяснение, а не лаконичная метка, обычно лучше подойдёт `Alert` или окружающий основной текст.

## Частые ошибки

- Длинные предложения внутри бейджа.
- Бейдж как единственный индикатор статуса.
- Собственные названия вариантов без соответствующих стилей.
