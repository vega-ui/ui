# Heading

## Профиль документа

`primitive`

## Кратко

`Heading` — семантический примитив заголовка. Он разделяет уровень заголовка и визуальный размер, чтобы структурой документа и типографической шкалой можно было управлять независимо.

## Импорт

```tsx
import { Heading, type HeadingAs, type HeadingProps, type HeadingSize } from '@vega-ui/react';
```

## Экспортируемые типы

- `HeadingProps`
- `HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`
- `HeadingSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | number`

## Базовое использование

<!-- example: heading/basic-usage.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <Heading as='h2'>Workspace settings</Heading>
      <Text size={3} style={{ color: 'var(--label-secondary)' }}>Manage the name, members and billing of the Acme workspace.</Text>
    </div>
  );
}
```
<!-- /example -->

## Варианты

- Уровень: от `h1` до `h6`
- Размер: визуальная шкала от `1` до `11`
- Насыщенность: `400`, `500`, `600`, `700`, `900`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Визуальный размер и семантический уровень независимы.
- Крупные размеры заголовков всё равно наследуют токены межстрочного интервала заголовков, а не основного текста.
- `as` должен следовать структуре документа, а не только визуальному вкусу.

## Частые ошибки

- Выбор уровня заголовка по размеру вместо структуры документа.
- Использование `Heading` для подписей полей формы.
- Смешивание произвольных размеров шрифта со шкалой заголовков.
