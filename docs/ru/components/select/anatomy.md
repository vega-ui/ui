# Select: анатомия

## Обзор

`Select` — составной компонент. Корень отвечает за состояние открытия, состояние выбора, регистрацию вариантов, навигацию с клавиатуры и поиск при наборе. Экспортируемые дочерние части используют этот общий контекст.

## Обязательные части

### `Select`

Корневой провайдер всей композиции.

- Обязательна: да
- Отвечает за: выбранное значение, состояние открытия, активный вариант, взаимодействие с клавиатуры
- Должна оборачивать все остальные части `Select*`

### `SelectCombobox`

Видимая поверхность триггера, открывающая и закрывающая список.

- Обязательна: да
- Типичные дочерние элементы: `SelectValue`, `SelectIcon`
- Должна оставаться внутри `Select`

### `SelectValue`

Рендерит текущее значение или плейсхолдер.

- Обязательна: фактически да в большинстве интерфейсов
- Принимает собственные дочерние элементы, когда выбранное значение нужно отрендерить богаче
- Должна оставаться внутри `SelectCombobox`

### `SelectIcon`

Необязательный визуальный индикатор триггера.

- Обязательна: нет
- Обычно размещается после `SelectValue`

### `SelectListbox`

Контейнер для выбираемых вариантов.

- Обязательна: да
- Должна содержать один или несколько дочерних `SelectOption`
- Рендерится в top layer через `popover="auto"`, поэтому отдельная часть-портал не нужна
- Сама управляет фокусом: стрелки перемещают фокус по вариантам, а при закрытии списка фокус возвращается на `SelectCombobox`

### `SelectOption`

Выбираемый элемент, регистрируемый в модели вариантов корня.

- Обязательна: да
- Должна рендериться внутри `SelectListbox`
- Тип значения должен соответствовать `string | number`

## Необязательные части

### `SelectHiddenSelect`

Скрытый нативный select для отправки формы и браузерной семантики форм.

- Обязательна: нет
- Рекомендуется: да, для нативных форм
- Опускайте, только когда компонент используется вне обычной отправки формы

### `SelectIcon`

Необязательный визуальный индикатор триггера.

- Обязательна: нет
- Обычно размещается после `SelectValue`

## Порядок композиции

Типичная композиция:

1. `Select`
2. `SelectHiddenSelect`
3. `SelectCombobox`
4. `SelectListbox`
5. `SelectOption`

## Корректные варианты композиции

<!-- example: select/minimal-composition.tsx -->
```tsx
import {
  Label,
  Select,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Interface language</Label>
      <Select defaultValue='en'>
        <SelectHiddenSelect name='language' />
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a language' />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='en'>English</SelectOption>
          <SelectOption value='de'>Deutsch</SelectOption>
          <SelectOption value='es'>Español</SelectOption>
          <SelectOption value='ja'>日本語</SelectOption>
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

Все части на своих местах: `Label` называет триггер через его `id`, а `SelectHiddenSelect` с `name` отправляет значение вместе с формой. Опускайте только скрытый select, если значение никогда не проходит через форму.

## Некорректные варианты композиции

### `SelectOption` вне `SelectListbox`

Это ломает регистрацию вариантов и навигацию с клавиатуры.

### `SelectValue` вне `SelectCombobox`

Это нарушает контракт композиции триггера и делает размещение выбранного значения неоднозначным.

### Дочерние части вне `Select`

Публичные части опираются на контекст корня. Рендер вне `Select` ломает поведение.

### Поле поиска без отключения поиска при наборе

Если внутри `SelectListbox` рендерится текстовое поле, встроенный поиск при наборе обычно стоит отключить через `typeahead={false}`.
