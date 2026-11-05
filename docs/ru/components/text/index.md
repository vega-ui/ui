# Text

## Профиль документа

`primitive`

## Кратко

`Text` — базовый примитив основной типографики. Он управляет размером и начертанием и допускает семантическую композицию через `asChild`.

## Импорты

```tsx
import { Text, type TextProps, type TextSize } from '@vega-ui/react';
```

## Экспортируемые типы

- `TextProps`
- `TextSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11`

## Базовое использование

<!-- example: text/basic-usage.tsx -->
```tsx
import { Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Text asChild size={3}>
      <p style={{ maxWidth: '60ch' }}>
        Your trial ends in 5 days. Add a payment method to keep your projects, history and integrations.
      </p>
    </Text>
  );
}
```
<!-- /example -->

## Варианты

- Размер: от `1` до `11`
- Начертание: `400`, `500`, `600`, `700`, `900`
- Композиция: элемент по умолчанию или `asChild`

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

- `asChild` меняет отрендеренный элемент, но сохраняет контракт стилей текста.
- `white-space: pre-line` сохраняет переносы строк из строк содержимого.
- Очень крупные размеры текста всё равно нужно проверять на раскладке и длине строки.

## Частые ошибки

- Использовать `Text` там, где заголовки документа должны быть семантическими `Heading`.
- Переопределять начертание и размер вручную вместо дизайн-шкалы.
- Забывать, что в многострочном содержимом сохраняются переносы строк.
