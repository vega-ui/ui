# NumberField: стилизация

## Обзор

`NumberField` переиспользует поверхность `TextField` и добавляет числовое выравнивание и квадратные кнопки шага, привязанные к общей высоте поля ввода.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--input-height` | кнопки шага | сохраняет кнопки квадратными относительно поля |
| `--text-color` | кнопки шага | цвет иконки |
| `--fills-quaternary-hover` | кнопки шага | состояние наведения |
| `--fills-quaternary-active` | кнопки шага | активное состояние |
| `--button-color` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Цвет иконки кнопки. |
| `--button-color-hover` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Цвет иконки кнопки при наведении. |
| `--button-color-active` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Цвет иконки кнопки при нажатии. |
| `--button-background-color` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Фон кнопки. |
| `--button-background-color-hover` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Фон кнопки при наведении. |
| `--button-background-color-active` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Фон кнопки при нажатии. |

## Переменные уровня частей

### Корень

Корень добавляет выравнивание текста по центру через `.numberTextField`.

### Кнопки

Кнопки увеличения и уменьшения сопоставляют `--icon-button-size` с `--input-height`.

### Поле ввода

`NumberFieldInput` переиспользует контракт `TextFieldInput` и добавляет числовые атрибуты и центрированный вид.

## Взаимодействие состояний и вариантов

- размер берётся из унаследованных размеров текстового поля
- отключённое поведение выводится из контекста корня
- состояние min/max обычно влияет на отключение кнопок, а не меняет поверхность корня

## Примеры

### Размеры

`size` на корне задаёт `--input-height`, а кнопки шага следуют за ним и остаются квадратными при любом размере.

<!-- example: number-field/stepper-sizes.tsx -->
```tsx
import {
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function StepperSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 220 }}>
      {SIZES.map((size) => (
        <NumberField key={size} size={size} min={0} max={10} defaultValue={3}>
          <NumberFieldDecrementButton aria-label={`Decrease, size ${size}`} />
          <NumberFieldInput aria-label={`Guests, size ${size}`} />
          <NumberFieldIncrementButton aria-label={`Increase, size ${size}`} />
        </NumberField>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Собственные иконки кнопок шага

Дочерние элементы `NumberFieldDecrementButton` и `NumberFieldIncrementButton` заменяют их иконки по умолчанию. У кнопок с одной иконкой нет встроенного имени, поэтому передайте каждой `aria-label`.

<!-- example: number-field/custom-stepper-icons.tsx -->
```tsx
import {
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function CustomStepperIcons() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 200 }}>
      <Label htmlFor={id}>Font size, px</Label>
      <NumberField min={8} max={72} defaultValue={16}>
        <NumberFieldDecrementButton aria-label='Smaller'>
          <Icon><ChevronDownIcon /></Icon>
        </NumberFieldDecrementButton>
        <NumberFieldInput id={id} />
        <NumberFieldIncrementButton aria-label='Larger'>
          <Icon><ChevronUpIcon /></Icon>
        </NumberFieldIncrementButton>
      </NumberField>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не нарушайте квадратное соотношение между высотой поля и кнопками шага
- не стилизуйте кнопки шага как посторонние icon button с несовпадающим размером
