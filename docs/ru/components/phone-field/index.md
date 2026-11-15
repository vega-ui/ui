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
      <PhoneField defaultCountry='US'>
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
        <PhoneFieldInput name='phone' id={id} autoComplete='tel' />
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

Вместо `PhoneFieldSelect` рядом с полем можно поставить любой свой контрол (обычный `Select`, `Combobox`, кнопки) и управлять им через контролируемые `country` и `onChangeCountry`. `country` — подсказка: это страна, показанная в `PhoneFieldSelect`, и телефонный код, с которого строгая маска начинает пустое поле. Когда `country` меняется снаружи, поле оставляет номер и текст как есть и не вызывает `onChangeValue`; если номер тоже должен измениться, задайте `value` сами. Выбор в `PhoneFieldSelect` — правка пользователя: поле записывает телефонный код выбранной страны в поле ввода, вызывает `input` и `change` и сообщает `onChangeCountry` и `onChangeValue` (с `''`, потому что один телефонный код — пустой номер) в одном действии, даже когда `country` контролируемый.

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

- Смена страны снаружи никогда не переписывает номер; это делает только выбор в `PhoneFieldSelect`.
- Тестируйте и строгую маску, и поведение при вставке.
- Сохраняйте `value`, номер в E.164, а не отформатированный текст поля ввода.
- Автозаполнение, вставленные значения и частично введённые международные префиксы тестируйте вместе, а не по отдельности.

## Частые ошибки

- Номер читают из видимого отформатированного текста, а не из `value` — [источника истины](../../glossary.md#источник-истины-source-of-truth) в E.164.
- Смену страны не учитывают в логике валидации.
- Тестируют только набор с клавиатуры и пропускают вставку и автозаполнение.
