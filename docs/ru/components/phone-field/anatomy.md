# PhoneField: анатомия

## Обзор

`PhoneField` согласует маску ввода, состояние страны и поведение вложенного select между корнем поля и `PhoneFieldSelect` с его частями Select.

## Обязательные части

### `PhoneField`

Корневой провайдер форматирования телефона и состояния страны.

### `PhoneFieldInput`

Видимое текстовое поле для номера.

## Необязательные части

### `PhoneFieldSelect`

Выбор кода страны: `Select`, привязанный к стране поля. Выбор опции меняет страну и переводит фокус в поле ввода.

### Части Select

Дочерние элементы `PhoneFieldSelect` — обычные части [Select](../select/anatomy.md):

- `SelectHiddenSelect`: нативное [участие в форме](../../glossary.md#участие-в-форме-form-participation) для значения страны
- `SelectCombobox`: видимый триггер выбора страны
- `SelectValue`: текущая выбранная страна или собственное содержимое для её отображения
- `SelectIcon`: визуальная подсказка для триггера страны
- `SelectListbox`: контейнер вариантов стран, рендерится в верхнем слое через `popover="auto"`
- `SelectOption`: выбираемый вариант страны

## Порядок композиции

Типичная композиция:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `SelectCombobox`
4. `SelectListbox`
5. `PhoneFieldInput`

## Корректные варианты композиции

<!-- example: phone-field/minimal-composition.tsx -->
```tsx
import {
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useId } from 'react';

export default function MinimalComposition() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField defaultCode='US'>
        <PhoneFieldSelect>
          <SelectHiddenSelect name='country' />
          <SelectCombobox aria-label='Country'>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='US'>US</SelectOption>
            <SelectOption value='GB'>GB</SelectOption>
            <SelectOption value='DE'>DE</SelectOption>
          </SelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

`Label` называет поле ввода, у триггера страны свой `aria-label`, а скрытый select отправляет страну вместе с номером. Без `PhoneFieldSelect` поле всё равно форматирует номер по одному `code`.

## Некорректные варианты композиции

### Поле ввода вне `PhoneField`

Это ломает общее форматирование и согласование со страной.

### Вложенный select рассматривается как не связанный с полем ввода

Смена страны всё равно должна согласовываться с маской телефона и моделью валидации.

### Богатый рендер вариантов без сохранения одной выбираемой строки

Это ослабляет поведение клавиатуры и списка (listbox).
