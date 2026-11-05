# PhoneField: анатомия

## Обзор

`PhoneField` согласует маску ввода, состояние страны и поведение вложенного select между корнем поля и семейством `PhoneFieldSelect*`.

## Обязательные части

### `PhoneField`

Корневой провайдер форматирования телефона и состояния страны.

### `PhoneFieldInput`

Видимое текстовое поле для номера.

## Необязательные части

### `PhoneFieldSelect`

Корень вложенного выбора кода страны.

### `PhoneFieldSelectHiddenSelect`

Нативное [участие в форме](../../glossary.md#участие-в-форме-form-participation) для значения страны.

### `PhoneFieldSelectCombobox`

Видимый триггер выбора страны.

### `PhoneFieldSelectValue`

Текущая выбранная страна или собственное содержимое для её отображения.

### `PhoneFieldSelectIcon`

Визуальная подсказка для триггера страны.

### `PhoneFieldSelectListbox`

Контейнер вариантов стран. Рендерится в верхнем слое через `popover="manual"`, поэтому отдельная часть-портал не нужна.

### `PhoneFieldSelectOption`

Выбираемый вариант страны.

## Порядок композиции

Типичная композиция:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `PhoneFieldSelectCombobox`
4. `PhoneFieldSelectListbox`
5. `PhoneFieldInput`

## Корректные варианты композиции

<!-- example: phone-field/minimal-composition.tsx -->
```tsx
import {
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectValue,
} from '@vega-ui/react';
import { useId } from 'react';

export default function MinimalComposition() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField defaultCode='US'>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect name='country' />
          <PhoneFieldSelectCombobox aria-label='Country'>
            <PhoneFieldSelectValue />
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='GB'>GB</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='DE'>DE</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
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
