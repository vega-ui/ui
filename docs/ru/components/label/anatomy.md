# Label: анатомия

## Обзор

`Label` — примитив из одной части. Он рендерит семантический `<label>` и заимствует типографику у `Text`.

## Обязательные части

### `Label`

Обязательна. Это одновременно семантический корень и видимая подпись.

## Необязательные части

Экспортируемых дочерних частей нет.

## Порядок композиции

1. `Label`
2. содержимое подписи

## Допустимые варианты композиции

<!-- example: label/field-label.tsx -->
```tsx
import { Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldLabel() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Company name</Label>
      <TextField>
        <TextFieldInput id={id} name='company' autoComplete='organization' />
      </TextField>
    </div>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Плейсхолдер вместо подписи

Так пропадает постоянная видимая подпись.

### Несколько несвязанных элементов управления в одной подписи

Поведение клика и семантика становятся неясными.
