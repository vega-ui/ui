# TimeField

## Профиль документа

`advanced interactive`

## Кратко

`TimeField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для ввода времени по маске. Он построен на `TextField` и добавляет ограничения формата, min/max и шага для строк времени, когда продуктовое значение — только время.

## Импорты

```tsx
import {
  TimeField,
  TimeFieldInput,
  type TimeFieldInputProps,
  type TimeFieldProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `TimeFieldProps`
- `TimeFieldInputProps`

## Минимальная композиция

<!-- example: time-field/minimal-composition.tsx -->
```tsx
import { TimeField, TimeFieldInput } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <TimeField>
      <TimeFieldInput aria-label='Reminder time' placeholder='hh:mm' />
    </TimeField>
  );
}
```
<!-- /example -->

## Обязательные части

- `TimeField`: корень, предоставляющий ограничения времени и формат
- `TimeFieldInput`: текстовое поле ввода с маской

## Необязательные части

- кроме поля ввода, дополнительных публичных частей нет

## Порядок композиции

1. `TimeField`
2. `TimeFieldInput`

## Варианты

- Формат: `HH:mm` или `HH:mm:ss`
- Границы: необязательные `min` и `max`
- Состояние: контролируемое или неконтролируемое `value` на корне, отключение через пропсы поля ввода

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

- Формат, `min` и `max` должны согласовываться друг с другом.
- Частично введённые значения не следует слишком рано считать полным временем.
- В текстах продукта пользователям нужно ясно сообщать, что ожидается 24-часовой формат.
- Если функция на самом деле хранит временную метку, `DateTimeField` обычно понятнее, чем разделять правила для даты и времени вручную.

## Частые ошибки

- Полагаться на форматирование по локали вместо того, чтобы описать ожидаемую маску.
- Передавать границы, не соответствующие выбранному формату.
- Считать неполный текст в маске валидными данными для отправки.
