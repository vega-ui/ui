# NumberField

## Профиль документа

`advanced interactive`

## Кратко

`NumberField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для ввода чисел с необязательными кнопками шага, границами, маской и изменением значения колесом или клавиатурой. Он предназначен для точных числовых значений, а не для любого текста, в котором есть цифры.

## Импорты

```tsx
import {
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  type NumberFieldDecrementProps,
  type NumberFieldIncrementProps,
  type NumberFieldInputProps,
  type NumberFieldProps,
  type NumberFieldSize,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `NumberFieldProps`
- `NumberFieldInputProps`
- `NumberFieldIncrementProps`
- `NumberFieldDecrementProps`
- `NumberFieldSize`

## Минимальная композиция

<!-- example: number-field/seat-count.tsx -->
```tsx
import {
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function SeatCount() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <NumberField min={1} max={50} defaultValue={5}>
        <NumberFieldDecrementButton square aria-label='Remove a seat'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
        <NumberFieldInput id={id} name='seats' aria-describedby={hintId} />
        <NumberFieldIncrementButton square aria-label='Add a seat'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
      </NumberField>
      <HelperText id={hintId}>From 1 to 50 seats on the Team plan.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyNumberField` передаёт свои пропсы в `NumberField`, `id` и `name` — полю ввода, а кнопки шага называет через `decrementLabel` и `incrementLabel`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: number-field/recipe.tsx -->
```tsx
import {
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  type NumberFieldProps,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyNumberFieldProps extends NumberFieldProps {
  name?: string
  decrementLabel: string
  incrementLabel: string
}

export function MyNumberField({ id, name, decrementLabel, incrementLabel, ...props }: MyNumberFieldProps) {
  return (
    <NumberField {...props}>
      <NumberFieldDecrementButton square aria-label={decrementLabel}><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
      <NumberFieldInput id={id} name={name} />
      <NumberFieldIncrementButton square aria-label={incrementLabel}><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
    </NumberField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <MyNumberField id={id} name='seats' min={1} max={50} defaultValue={5} decrementLabel='Remove a seat' incrementLabel='Add a seat' />
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `NumberField`: корневой контейнер состояния
- `NumberFieldInput`: числовое текстовое поле

## Необязательные части

- `NumberFieldIncrementButton`: кнопка увеличения на шаг
- `NumberFieldDecrementButton`: кнопка уменьшения на шаг

## Порядок композиции

1. `NumberField`
2. `NumberFieldDecrementButton`
3. `NumberFieldInput`
4. `NumberFieldIncrementButton`

## Варианты

- Размер: `sm`, `md`, `lg`
- Модель значения: контролируемая или неконтролируемая
- Взаимодействие: ввод с клавиатуры, кнопки шага, стрелки, необязательное колесо мыши

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

- Во время редактирования введённое значение может быть временно пустым или незавершённым.
- Кнопки шага, ввод и логика границ должны оставаться синхронизированными.
- Изменение колесом мыши может быть неожиданным в плотных формах, если включить его необдуманно.
- Ввод, шаг, ограничение и валидация должны подчиняться одной числовой политике, а не вести себя каждый по-своему.

## Частые ошибки

- Считать каждое промежуточное введённое значение валидным итоговым числом.
- Забывать про обработку границ, когда есть кнопки шага.
- Использовать компонент там, где понятнее было бы поле свободного текста.
