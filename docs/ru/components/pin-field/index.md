# PinField

## Профиль документа

`advanced interactive`

## Кратко

`PinField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для кодов фиксированной длины, таких как одноразовые коды (OTP) и PIN. Визуально скрытый инпут хранит настоящее значение, а видимые слоты рендерят каждую позицию символа, поэтому сегментированный ввод кода — основная модель взаимодействия, а не стилевой эффект.

## Импорт

```tsx
import {
  PinField,
  PinFieldInput,
  PinFieldSeparator,
  PinFieldSlot,
  type PinFieldInputProps,
  type PinFieldProps,
  type PinFieldSeparatorProps,
  type PinFieldSize,
  type PinFieldSlotProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `PinFieldProps`
- `PinFieldInputProps`
- `PinFieldSlotProps`
- `PinFieldSeparatorProps`
- `PinFieldSize`

## Минимальная композиция

<!-- example: pin-field/minimal-composition.tsx -->
```tsx
import { PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <PinField maxLength={4}>
      <PinFieldInput aria-label='Card PIN' autoComplete='off' />
      <PinFieldSlot index={0} />
      <PinFieldSlot index={1} />
      <PinFieldSlot index={2} />
      <PinFieldSlot index={3} />
    </PinField>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyPinField` передаёт свои пропсы в `PinField`, `id`, `name` и `autoComplete` — полю ввода для `Label`, формы и автозаполнения, и рисует по ячейке на каждый символ `maxLength`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: pin-field/recipe.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSlot, type PinFieldProps } from '@vega-ui/react';
import { useId } from 'react';

interface MyPinFieldProps extends PinFieldProps {
  name?: string
  autoComplete?: string
}

export function MyPinField({ id, name, autoComplete, maxLength = 4, ...props }: MyPinFieldProps) {
  const slots = Array.from({ length: maxLength }, (_, index) => index);

  return (
    <PinField maxLength={maxLength} {...props}>
      <PinFieldInput id={id} name={name} autoComplete={autoComplete} />
      {slots.map((index) => <PinFieldSlot key={index} index={index} />)}
    </PinField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from the text message</Label>
      <MyPinField id={id} name='code' autoComplete='one-time-code' maxLength={6} />
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `PinField`: корневой контейнер состояния
- `PinFieldInput`: единственный скрытый инпут, хранящий значение
- `PinFieldSlot`: видимый слот для одного символа

## Необязательные части

- `PinFieldSeparator`: визуальный разделитель групп слотов

## Порядок композиции

1. `PinField`
2. `PinFieldInput`
3. один или несколько `PinFieldSlot`
4. необязательный `PinFieldSeparator`

## Варианты

- Размер: `sm`, `md`, `lg`
- Модель ввода: цифровая, буквенная или буквенно-цифровая маска
- Раскладка: сплошные слоты или группы слотов с разделителями

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

- Поведение вставки и синхронизация каретки — основа удобства использования.
- Порядок слотов должен соответствовать `maxLength`.
- В нативном поведении формы и обработке фокуса участвует именно `PinFieldInput`.
- Правила кода на бэкенде, допустимые символы и клиентская маска должны быть согласованы, а не выводиться независимо друг от друга.

## Частые ошибки

- Забытый `PinFieldInput`.
- Слотов меньше или больше, чем поддерживает задуманная длина кода.
- Маска, которая не соответствует формату кода на бэкенде.
