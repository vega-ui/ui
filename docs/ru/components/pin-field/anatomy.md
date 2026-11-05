# PinField: анатомия

## Обзор

`PinField` координирует один визуально скрытый инпут с несколькими видимыми слотами. Корень отвечает за активный индекс, значение, состояние плейсхолдера и необязательное поведение «выделить всё».

## Обязательные части

### `PinField`

Обязательная. Владеет корневым состоянием, включая активный слот и текущее значение.

### `PinFieldInput`

Обязательная. Хранит настоящее значение инпута, обрабатывает выделение и ввод с клавиатуры и сохраняет браузерную семантику.

### `PinFieldSlot`

Обязательная. Рендерит одну видимую позицию символа для конкретного `index`.

## Необязательные части

### `PinFieldSeparator`

Необязательный визуальный разделитель между логическими группами слотов.

## Порядок композиции

1. `PinField`
2. `PinFieldInput`
3. элементы `PinFieldSlot` в порядке индексов
4. необязательные разделители между группами слотов

## Допустимые паттерны композиции

<!-- example: pin-field/grouped-code-with-separator.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function GroupedCodeWithSeparator() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from your authenticator app</Label>
      <PinField maxLength={6}>
        <PinFieldInput id={id} name='totp' autoComplete='one-time-code' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSeparator />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
      </PinField>
    </div>
  );
}
```
<!-- /example -->

`PinFieldInput` идёт первым и хранит весь код, его имя и метку; слоты только рендерят по одному символу по `index`, а `PinFieldSeparator` между ними — лишь визуальная группировка.

## Недопустимые паттерны композиции

### Слоты без `PinFieldInput`

Интерфейс рендерится, но настоящей модели ввода нет.

### Индексы слотов не по порядку

Каретка и соответствие значения слотам начинают сбивать с толку.

### Разделители используются так, будто добавляют места для ввода

Разделители только визуальные и не обозначают дополнительных символов.
