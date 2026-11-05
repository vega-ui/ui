# TimeField: анатомия

## Обзор

`TimeField` — небольшая составная обёртка вокруг `TextField`. Корень предоставляет контекст формата и границ, а `TimeFieldInput` применяет поведение маски.

## Обязательные части

### `TimeField`

Обязателен. Отвечает за контекст `format`, `min`, `max` и `step`.

### `TimeFieldInput`

Обязателен. Рендерит само поле ввода с маской.

## Необязательные части

Кроме поля ввода, дополнительных публичных частей нет.

## Порядок композиции

1. `TimeField`
2. `TimeFieldInput`

## Корректные варианты композиции

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

## Некорректные варианты композиции

### Границы, не соответствующие формату

Пример: `format='HH:mm'` с `max`, содержащим секунды.

### Обёртка без `TimeFieldInput`

Корень рендерится, но контрола с маской нет.
