# PhoneField

## Профиль документа

`advanced interactive`

## Кратко

`PhoneField` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который объединяет поле телефона с маской и вложенный `Select` для кода страны. Это готовый слой ввода телефона для потребителя, а не просто свободная пара `Select` и `TextField`.

## Импорт

```tsx
import {
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  SelectHiddenSelect,
  SelectCombobox,
  SelectValue,
  SelectIcon,
  SelectListbox,
  SelectOption,
  type PhoneFieldProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `PhoneFieldProps`
- `PhoneFieldInputProps`
- `PhoneFieldSelectProps`

## Минимальная композиция

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

## Обязательные части

- `PhoneField`: состояние поля на уровне корня и контекст форматирования
- `PhoneFieldInput`: собственно поле ввода номера телефона

## Необязательные части

- `PhoneFieldSelect`: `Select`, привязанный к стране поля; внутрь кладутся части [Select](../select/index.md)
- `SelectHiddenSelect`: нативное [участие в форме](../../glossary.md#участие-в-форме-form-participation) для кода страны

## Порядок композиции

Типичная композиция:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `SelectHiddenSelect`
4. `SelectCombobox`
5. `SelectListbox`
6. `SelectOption`
7. `PhoneFieldInput`

Вместо `PhoneFieldSelect` рядом с полем можно поставить любой свой контрол (обычный `Select`, `Combobox`, кнопки) и управлять им через контролируемые `code` и `onChangeCode`. Когда `code` меняется снаружи, поле само записывает новый телефонный код в поле ввода и сообщает о нём через `onChangeValue`. Как и нативное поле, которому `value` задали из кода, оно при этом не вызывает события `input` и `change`; они срабатывают, только когда страну выбирают в `PhoneFieldSelect`.

## Варианты

- Только поле ввода или полная композиция с выбором страны
- `strictMask` или нестрогий ввод
- Контролируемое значение поля или неконтролируемое использование в форме

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Смена страны может потребовать переформатирования и повторной валидации.
- Тестируйте и строгую маску, и поведение при вставке.
- Сохраняйте каноническое значение на границе функции, а не только отображаемую отформатированную строку.
- Автозаполнение, вставленные значения и частично введённые международные префиксы тестируйте вместе, а не по отдельности.

## Частые ошибки

- Видимую отформатированную строку считают единственным [источником истины](../../glossary.md#источник-истины-source-of-truth).
- Смену страны не учитывают в логике валидации.
- Тестируют только набор с клавиатуры и пропускают вставку и автозаполнение.
