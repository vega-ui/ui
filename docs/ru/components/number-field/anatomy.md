# NumberField: анатомия

## Обзор

`NumberField` расширяет модель `TextField` числовой маской, границами, поведением шага и необязательными кнопками шага.

## Обязательные части

### `NumberField`

Обязательна. Владеет числовыми ограничениями, производным состоянием границ и поведением шага.

### `NumberFieldInput`

Обязательна. Рендерит сам input и синхронизируется с числовым контекстом.

## Необязательные части

### `NumberFieldIncrementButton`

Необязательна. Увеличивает значение на шаг.

### `NumberFieldDecrementButton`

Необязательна. Уменьшает значение на шаг.

## Порядок композиции

1. `NumberField`
2. необязательная кнопка уменьшения
3. `NumberFieldInput`
4. необязательная кнопка увеличения

## Допустимые варианты композиции

<!-- example: number-field/seat-count.tsx -->
```tsx
import {
  HelperText,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { useId } from 'react';

export default function SeatCount() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <NumberField min={1} max={50} defaultValue={5}>
        <NumberFieldDecrementButton aria-label='Remove a seat' />
        <NumberFieldInput id={id} name='seats' aria-describedby={hintId} />
        <NumberFieldIncrementButton aria-label='Add a seat' />
      </NumberField>
      <HelperText id={hintId}>From 1 to 50 seats on the Team plan.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Кнопки без input

Кнопки шага есть, но редактируемого числового значения нет.

### Внешняя числовая логика, конфликтующая с внутренней моделью границ

Противоречащие друг другу правила ограничения или разбора дают неожиданные значения.

### Допущения о свободном тексте

Элемент управления в первую очередь числовой, и его не стоит рассматривать как обычное текстовое поле.
