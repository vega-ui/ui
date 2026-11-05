# Separator

## Профиль документа

`primitive`

## Кратко

`Separator` — примитив визуального разделения для горизонтальных и вертикальных границ между соседними областями интерфейса.

## Импорты

```tsx
import { Separator, type SeparatorProps } from '@vega-ui/react';
```

## Экспортируемые типы

- `SeparatorProps`

## Базовое использование

<!-- example: separator/basic-usage.tsx -->
```tsx
import { Heading, Separator, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Notifications</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Email me when someone mentions me or assigns me a task.</Text>
      </div>
      <Separator />
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Privacy</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Only workspace members can see my profile and activity.</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Варианты

- Ориентация: `horizontal` или `vertical`
- Раскладка: горизонтальная линия на всю ширину или вертикальный разделитель на всю высоту

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

- Вертикальным разделителям нужна явная высота от родительской раскладки.
- Компонент визуальный; отступы по-прежнему определяет окружающая раскладка.
- Декоративные разделители не должны заменять настоящие заголовки или группировку через fieldset.

## Частые ошибки

- Вертикальный разделитель рендерится без заданной высоты родителя.
- Разделители используются там, где на самом деле нужна семантическая группировка.
- От `Separator` ожидают, что он сам создаст отступы в раскладке.
