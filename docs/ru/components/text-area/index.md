# TextArea

## Профиль документа

`form-control`

## Кратко

`TextArea` — многострочное поле ввода для длинного содержимого в свободной форме. Оно сочетает семантику нативного textarea со стилями размера, полной ширины и ошибки — для случаев, когда значение в продукте намеренно многострочное.

## Импорт

```tsx
import { TextArea, type TextAreaProps, type TextAreaSize } from '@vega-ui/react';
```

## Экспортируемые типы

- `TextAreaProps`
- `TextAreaSize = 'sm' | 'md' | 'lg' | string`

## Базовое использование

<!-- example: text-area/issue-description.tsx -->
```tsx
import { HelperText, Label, TextArea } from '@vega-ui/react';
import { useId } from 'react';

export default function IssueDescription() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>What went wrong?</Label>
      <TextArea
        id={id}
        name='description'
        rows={4}
        fullWidth
        placeholder='Steps to reproduce, what you expected and what happened instead'
        aria-describedby={hintId}
      />
      <HelperText id={hintId}>Include the page URL and the time it happened, if you know it.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Варианты

- Размер: `sm`, `md`, `lg`
- Состояние: по умолчанию, `error`, отключённое
- Раскладка: обычная ширина или `fullWidth`
- Модель значения: контролируемая или неконтролируемая

## Связанные документы

- [Примеры](./examples.md)
- [Анатомия](./anatomy.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Длинное содержимое и изменение размера нужно тестировать в стеснённых раскладках.
- `fullWidth` меняет ширину, но не стратегию высоты.
- Для многострочного содержимого `TextArea` подходит лучше, чем попытки добиться многострочности от `TextField`.
- Валидация, вспомогательный текст и раскладка должны учитывать длинное содержимое, а не только первые видимые строки.

## Частые ошибки

- Использовать `TextArea` для коротких однострочных значений.
- Забывать про вспомогательный текст или подписи вокруг поля для длинного ввода.
- Считать `error` заменой настоящим сообщениям валидации.
