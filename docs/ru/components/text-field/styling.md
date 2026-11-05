# TextField: стилизация

## Обзор

Стили `TextField` разделены между обёрткой и инпутом. Корень управляет высотой контейнера и состоянием поверхности, а `TextFieldInput` — отступами, типографикой и стилем плейсхолдера.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--input-height` | обёртка и дочерние элементы | общая высота поля |
| `--input-br-ratio` | обёртка | коэффициент скругления |
| `--fills-tertiary` | обёртка | поверхность поля по умолчанию |
| `--fills-tertiary-hover` | обёртка | поверхность при наведении |
| `--color-primary-500` | обёртка | контур фокуса |
| `--color-error` | обёртка | контур ошибки |
| `--disable-background-color` | обёртка | поверхность в отключённом состоянии |

## Переменные частей

### Корень

Обёртка задаёт `--input-height` по размеру и применяет состояния поверхности, фокуса, ошибки и отключённости.

### Инпут

`TextFieldInput` наследует скругление обёртки и использует текстовые токены для отступов, размера шрифта, цвета текста и цвета плейсхолдера.

## Взаимодействие состояний и вариантов

- размер задаёт `--input-height` и типографику инпута
- наведение на обёртку управляется через `:has(input:hover)`
- фокус управляется через `:has(input:focus-visible)`
- отключённое состояние управляется через `:has(input:disabled)`

## Примеры

### Размеры поля

Каждый `size` задаёт `--input-height` и типографику инпута. Подбирайте тот же размер соседней `Button`, чтобы строка выровнялась.

<!-- example: text-field/field-sizes.tsx -->
```tsx
import { Button, TextField, TextFieldInput } from '@vega-ui/react';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function FieldSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <TextField size={size} style={{ flex: 1 }}>
            <TextFieldInput aria-label={`Coupon code, size ${size}`} placeholder={`Coupon code (${size})`} />
          </TextField>
          <Button size={size} variant='secondary' appearance='ghost'>Apply</Button>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Чего не переопределять

- не нарушайте соотношение высоты обёртки и инпута
- не переопределяйте цвета отключённого состояния так, чтобы отключённые поля выглядели интерактивными
- не добавляйте элементы префикса или суффикса, не проверив фокус и отступы
