# HelperText: анатомия

## Обзор

`HelperText` — примитив из одной части. Он рендерит стилизованный абзац через общий контракт `Text`.

## Обязательные части

### `HelperText`

Обязательна. Отвечает за размер вспомогательного текста и приглушённый цвет или цвет ошибки.

## Необязательные части

Экспортируемых дочерних частей нет.

## Порядок композиции

1. `HelperText`
2. короткий поясняющий текст

## Корректные варианты композиции

<!-- example: helper-text/field-hint.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldHint() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Recovery email</Label>
      <TextField>
        <TextFieldInput id={id} type='email' autoComplete='email' aria-describedby={hintId} />
      </TextField>
      <HelperText id={hintId}>Used only if you lose access to your main inbox.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Вспомогательный текст в роли основной подписи

Это ослабляет видимую подпись и семантику.

### Вспомогательный текст для полного текста политики

Компонент слишком лёгкий для длинного поясняющего содержимого.
