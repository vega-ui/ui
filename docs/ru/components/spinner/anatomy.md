# Spinner: анатомия

## Обзор

`Spinner` — примитив из одной части. Корень отвечает за анимацию, сопоставление размеров и цвет варианта.

## Обязательные части

### `Spinner`

Обязателен. Рендерит анимированный индикатор загрузки.

## Необязательные части

Экспортируемых дочерних частей нет.

## Порядок композиции

1. `Spinner`

## Корректные варианты композиции

<!-- example: spinner/inline-status-row.tsx -->
```tsx
import { Spinner, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function InlineStatusRow() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
      <Spinner size={2} aria-labelledby={labelId} />
      <Text id={labelId} size={2}>Syncing 128 contacts from Google</Text>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Спиннер без окружающего контекста

Пользователи могут не понять, что загружается.

### Спиннер как постоянное украшение

Компонент должен сообщать о временном состоянии ожидания.
