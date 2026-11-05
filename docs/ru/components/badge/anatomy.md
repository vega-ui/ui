# Badge: анатомия

## Обзор

`Badge` — единая компактная поверхность для короткого текста статуса, категории или счётчика.

## Обязательные части

### `Badge`

Обязательна. Отвечает за размер, внешний вид и стилизацию семантического варианта.

## Необязательные части

`Badge` не предоставляет публичных дочерних частей.

## Порядок композиции

1. `Badge`
2. короткая подпись или счётчик

## Допустимые паттерны композиции

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

## Недопустимые паттерны композиции

### Длинный поясняющий текст внутри бейджа

Бейджи предназначены для коротких метаданных, а не для полноценных сообщений.

### Бейдж как единственный способ сообщить статус

Если статус важен, его всё равно должны объяснять окружающий текст или структура.
