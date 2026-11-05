# Radio: анатомия

## Обзор

`Radio` — один нативный input, а не составной компонент из нескольких частей. Реальный контракт композиции — в том, как несколько радиокнопок группируются через общий `name` и видимые подписи.

## Обязательные части

### `Radio`

Обязательная часть. Рендерит нативный `input[type='radio']` и отвечает за отмеченное и отключённое состояния, размер и вариант.

## Необязательные части

`Radio` не предоставляет дополнительных публичных дочерних частей.

## Порядок композиции

1. видимая обёртка-подпись
2. `Radio`
3. текст подписи

## Допустимые варианты композиции

Два корректных способа дать радиокнопке имя: обернуть её в `<label>` вместе с текстом или задать ей `id` и направить на неё отдельный `Label` через `htmlFor`. Обе радиокнопки используют один `name`, поэтому образуют одну группу.

<!-- example: radio/valid-composition-patterns.tsx -->
```tsx
import { Label, Radio } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio name='density' value='comfortable' defaultChecked />
        Comfortable
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio id='density-compact' name='density' value='compact' />
        <Label htmlFor='density-compact'>Compact</Label>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Радиокнопки без общего `name`

Это ломает поведение взаимоисключающей группы.

### Radio как самостоятельный булев переключатель

Если выбор независимый, а не взаимоисключающий, используйте `Checkbox` или `Switch`.

### Текст подписи отделён от контрола

Из-за этого радиокнопку сложнее понять и сложнее нажать.
