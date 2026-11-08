# Select: стилизация

## Обзор

Этот файл описывает контракт стилизации `Select` и его дочерних частей через CSS-переменные.

## Публичные CSS-переменные

Эти переменные напрямую используются текущей реализацией и являются самыми реалистичными точками переопределения для стилизации на уровне продукта.

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--select-size` | корень, combobox, listbox | Общая база высоты и радиуса компонента |
| `--select-br-ratio` | корень, combobox, listbox | Общий коэффициент радиуса скругления |
| `--select-combobox-br-ratio` | `SelectCombobox` | Переопределение коэффициента радиуса для триггера |
| `--select-combobox-gap` | `SelectCombobox` | Отступ между значением и иконкой, по умолчанию зависит от размера |
| `--select-listbox-br-ratio` | `SelectListbox` | Переопределение коэффициента радиуса для панели |
| `--select-value-color` | `SelectValue` | Цвет текста выбранного значения |
| `--select-placeholder-color` | `SelectValue` | Цвет текста плейсхолдера |
| `--select-icon-color` | `SelectIcon` | Цвет иконки триггера |

## Переменные уровня частей

Стилизация `Select` распределена так:

- переменные размера корня в `Select`
- переменные триггера в `SelectCombobox`
- переменные цвета значения и плейсхолдера в `SelectValue`
- переменные цвета иконки в `SelectIcon`
- переменные поверхности панели в `SelectListbox`

### Корень

Определены в `packages/ui/src/Select/style.module.css`:

- `--select-size`
- `--select-br-ratio`

Поведение по умолчанию:

- `sm` сопоставляет `--select-size` с `var(--spacing-21)`
- `md` сопоставляет `--select-size` с `var(--spacing-24)`
- `lg` сопоставляет `--select-size` с `var(--spacing-27)`

### Combobox

`SelectCombobox` использует:

- `--select-combobox-br-ratio`
- `--select-combobox-gap`
- `--select-icon-color`
- `--select-placeholder-color`
- `--select-value-color`

Поведение состояний в исходниках:

- вариант `field` использует `--fills-tertiary` и `--fills-tertiary-hover`
- состояния фокуса и открытия используют `--color-primary-500`
- отключённое состояние переназначает цвета иконки, плейсхолдера и значения на токены отключённого состояния

### Значение

`SelectValue` вычисляет:

- `--select-value-color` с запасным вариантом `var(--text-color)`
- `--select-placeholder-color` с запасным вариантом `var(--label-tertiary)`

Благодаря этому стили значения и плейсхолдера можно безопасно переопределять, не переписывая весь дочерний компонент.

### Иконка

`SelectIcon` определяет:

- `--select-icon-color`

Иконка поворачивается в открытом состоянии и наследует цвет из этой переменной.

### Listbox

`SelectListbox` использует:

- `--select-listbox-br-ratio`
- общие `--select-size` и `--select-br-ratio`

Также он зависит от глобальных токенов поверхности:

- `--surface-secondary`
- `--surface-shadow`

## Взаимодействие состояний и вариантов

В текущей реализации варианты `field` и `inline` не предоставляют отдельных переменных `--select-*` для вариантов. Их поведение в основном определяется:

- `data-variant`
- глобальными токенами поверхности
- токенами фокуса и отключённого состояния

Это значит:

- настройка размера и цвета текста проста
- перестилизация на уровне вариантов всё ещё частично зависит от глобальных токенов темы, а не от локальных переменных компонента

## Примеры

### Переопределение размера корня

`--select-size` и `--select-br-ratio` на корне меняют высоту триггера и скругление триггера и списка.

<!-- example: select/root-size-override.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function RootSizeOverride() {
  return (
    <Select
      defaultValue='newest'
      style={{ '--select-size': '44px', '--select-br-ratio': 0.5, width: 200 } as CSSProperties}
    >
      <SelectCombobox aria-label='Sort orders by'>
        <SelectValue />
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='newest'>Newest first</SelectOption>
        <SelectOption value='oldest'>Oldest first</SelectOption>
        <SelectOption value='total'>Highest total</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->

### Переопределение цвета значения и плейсхолдера

Оба цвета читаются с запасным значением, поэтому достаточно задать их на корне. Плейсхолдер должен заметно отличаться от выбранного значения.

<!-- example: select/value-and-placeholder-color-override.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function ValueAndPlaceholderColorOverride() {
  return (
    <Select
      style={{
        '--select-value-color': 'var(--color-primary-700)',
        '--select-placeholder-color': 'var(--label-secondary)',
        width: 200,
      } as CSSProperties}
    >
      <SelectCombobox aria-label='Status'>
        <SelectValue placeholder='Any status' />
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='open'>Open</SelectOption>
        <SelectOption value='in-progress'>In progress</SelectOption>
        <SelectOption value='done'>Done</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->

### Переопределение иконки и списка

Задайте `--select-icon-color` и `--select-listbox-br-ratio` на корне, чтобы изменить все части, или на самих `SelectIcon` и `SelectListbox`, чтобы переопределить только их.

<!-- example: select/icon-and-listbox-override.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function IconAndListboxOverride() {
  return (
    <Select defaultValue='week' style={{ width: 200 }}>
      <SelectCombobox aria-label='Date range'>
        <SelectValue />
        <SelectIcon style={{ '--select-icon-color': 'var(--color-primary-600)' } as CSSProperties} />
      </SelectCombobox>
      <SelectListbox style={{ '--select-listbox-br-ratio': 0.5 } as CSSProperties}>
        <SelectOption value='today'>Today</SelectOption>
        <SelectOption value='week'>Last 7 days</SelectOption>
        <SelectOption value='month'>Last 30 days</SelectOption>
        <SelectOption value='quarter'>This quarter</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->

## Что не переопределять

- не полагайтесь на внутренние коэффициенты как на стабильный публичный API, не задокументировав их в дизайн-системе
- не переопределяйте стили так, что ломается видимость фокуса
- не делайте плейсхолдер и выбранный текст визуально неразличимыми
- не меняйте высоту и радиус независимо, не проверив согласованность триггера и списка
