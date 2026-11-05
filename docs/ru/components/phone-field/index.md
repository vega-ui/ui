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
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectValue,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
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

## Обязательные части

- `PhoneField`: состояние поля на уровне корня и контекст форматирования
- `PhoneFieldInput`: собственно поле ввода номера телефона

## Необязательные части

- `PhoneFieldSelect*`: вложенное семейство выбора кода страны на том же контракте подсистемы select
- `PhoneFieldSelectHiddenSelect`: нативное [участие в форме](../../glossary.md#участие-в-форме-form-participation) для кода страны

## Порядок композиции

Типичная композиция:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `PhoneFieldSelectHiddenSelect`
4. `PhoneFieldSelectCombobox`
5. `PhoneFieldSelectListbox`
6. `PhoneFieldSelectOption`
7. `PhoneFieldInput`

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
