# PhoneField: стилизация

## Обзор

Стили `PhoneField` распределены между полем ввода и вложенным семейством выбора страны. Большая часть визуального поведения приходит из общих токенов полей и модели стилизации вложенного select.

## Публичные CSS-переменные

Текущая реализация открывает очень мало явных переменных `--phone-field-*`. Большинство точек стилизации приходит из общих токенов полей и вложенных частей select.

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| общие токены полей | `PhoneFieldInput` | размер поля и стили текста |
| токены отступов | части select | раскладка триггера и вариантов |

## Переменные на уровне частей

### Поле ввода

Поле ввода следует общей модели стилизации полей, как и другие элементы ввода текста.

### Семейство select

`PhoneFieldSelectCombobox`, `PhoneFieldSelectListbox` и `PhoneFieldSelectOption` открывают точки настройки раскладки, которые ближе к семейству `Select`, чем к отдельной поверхности токенов `PhoneField`.

## Взаимодействие состояний и вариантов

- `strictMask` меняет скорее поведение, чем стили
- состояния `error` и `disabled` должны соответствовать общей семантике полей
- собственный рендер выбранной страны влияет на плотность и выравнивание

## Примеры

### Настройка поля на уровне темы

У поля нет переменных `--phone-field-*`, поэтому класс темы перенастраивает общие токены полей для всего, что внутри него.

<!-- example: phone-field/theme-level-field-tuning.css -->
```css
.brand-theme {
  --fills-tertiary: color-mix(in oklch, var(--color-blue-accent-500) 6%, transparent);
  --focus-color: var(--color-blue-accent-400);
}
```
<!-- /example -->

### Заглушка выбора страны и своя иконка

Пока код не выбран, триггер показывает `placeholder` из `PhoneFieldSelectValue`, а дочерние элементы `PhoneFieldSelectIcon` заменяют стандартный шеврон.

<!-- example: phone-field/select-placeholder-and-custom-icon.tsx -->
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
import { ChevronsUpDown } from '@vega-ui/icons';
import { useId } from 'react';

export default function SelectPlaceholderAndCustomIcon() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect name='country' />
          <PhoneFieldSelectCombobox aria-label='Country'>
            <PhoneFieldSelectValue placeholder='Code' />
            <PhoneFieldSelectIcon>
              <ChevronsUpDown />
            </PhoneFieldSelectIcon>
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='ES'>ES</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='IT'>IT</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='PT'>PT</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

## Что не переопределять

- не рассчитывайте на недокументированные переменные `--phone-field-*`
- не стилизуйте вложенный select отдельно от поля ввода настолько агрессивно, что элемент перестаёт восприниматься как одно поле
