# MonthPicker: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `year` | `string` | — | Нет | Год, месяцы которого показываются, — строка `YYYY-MM-DD` любого дня в нём. По умолчанию — текущий год. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | Нет | Календарная система, к которой относятся месяцы, — она определяет, сколько месяцев в году. По умолчанию — григорианский календарь. |
| `locale` | `string` | `getDefaultLocale()` | Нет | Локаль BCP 47 для названий месяцев, например `de-DE`. По умолчанию — локаль среды выполнения, как у `Intl`. |
| `size` | `DataGridPickerSize` | `'xs'` | Нет | Управляет визуальным размером элемента. Полезно для адаптации пикера к компактным или крупным раскладкам. |
| `variant` | `DataGridPickerVariant` | — | Нет | Предустановка внешнего вида пикера. |
| `selection` | `S` | `'single'` | Нет | Режим выбора. `'single'` — одновременно можно выбрать только одну ячейку; `'multiple'` — независимый множественный выбор (переключение по ячейке); `'range'` — выбор диапазона между двумя точками (Shift + стрелки или перетаскивание указателем) |
| `disabled` | `DataGridDisabled<string>` | — | Нет | Предикат или набор отключённых ячеек. Может быть: функцией `(key) => boolean`; массивом отключённых ключей; одним ключом. Отключённые ячейки нельзя выбрать или сфокусировать. |
| `excludeDisabled` | `boolean` | — | Нет | — |
| `expandable` | `boolean` | `true` | Нет | Включает расширение диапазонов выбора (Shift + стрелка или перетаскивание мышью). |
| `defaultActive` | `string` | — | Нет | Неконтролируемая начальная активная ячейка. |
| `active` | `string` | — | Нет | Контролируемая активная ячейка. |
| `selected` | `S extends "single" ? string \| null : string[]` | — | Нет | Контролируемые выбранные ячейки. В режиме `'single'` значение `null` означает контролируемое состояние без выбора. |
| `defaultSelected` | `S extends "single" ? string : string[]` | — | Нет | Неконтролируемые изначально выбранные ячейки. |
| `from` | `string` | — | Нет | Границы диапазона. Если заданы, ограничивают выбор ячейками между `from` и `to` на основе функции `compare`. |
| `to` | `string` | — | Нет | — |
| `resolveRange` | `(start: DataGridResolveValue<K>, end: DataGridResolveValue<K>, grid: Grid<HTMLElement, K>) => K[]` | — | Нет | Собственная логика построения диапазона для `selection="range"`. По начальному и конечному значениям возвращает список ключей, образующих диапазон. |
| `equals` | `(start: K \| undefined, end: K \| undefined) => boolean` | — | Нет | Собственная функция сравнения двух ключей ячеек на равенство. По умолчанию — строгое равенство (`===`). |
| `compare` | `(a: K, b: K) => -1 \| 0 \| 1` | — | Нет | Собственная функция упорядочивания двух ключей ячеек. Должна возвращать `-1`, `0` или `1`. |
| `onSelectCell` | `(value: S extends 'single' ? K : K[]) => void` | — | Нет | Вызывается, когда пользователь выбирает ячейку. Получает список ключей выбранных ячеек. |
| `onChangeActive` | `(active: K) => void` | — | Нет | Вызывается при изменении активной (сфокусированной) ячейки. |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref на корневой элемент сетки. |
| `apiRef` | `Ref<DataGridApiRef<string>>` | — | Нет | Ref на императивный API сетки. Предоставляет низкоуровневые структуры для сложных сценариев: `grid` — помощник навигации по матрице; `keyMap` — Map`<K, [row, col]>` для быстрого поиска |
| `wrap` | `DataGridWrap` | — | Нет | Режим зацикливания навигации. 'horizontal' — переход по столбцам в пределах строки; 'vertical' — переход по строкам в пределах столбца; 'both' — оба поведения; undefined — без зацикливания |
| `exclude` | `DataGridExclude<string>` | — | Нет | Исключает ячейки из обхода фокусом. Может быть: одним ключом; массивом ключей; предикатом `(key) => boolean` |
| `rowDelta` | `number` | — | Нет | Шаг навигации по строкам для PageUp/PageDown. `undefined` — переход к первой/последней строке; `number` — сдвиг на N строк относительно текущей |
| `onArrow` | `(e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, K>, prevNode: MatrixNode<HTMLElement, K>) => void` | — | Нет | Вызывается на каждом шаге навигации стрелками после смены фокуса |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `MonthPickerLayout`
- `MonthPickerRowGroup`
- `MonthPickerRow`
- `MonthPickerItem`
- `MonthPickerCell`

### `MonthPickerItem`

<!-- AUTO-GENERATED:PART_API:MonthPickerItem:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `range` | `DataGridPickerItemRangePosition` | — | Нет | Необязательный визуальный индикатор положения ячейки в диапазоне. Одно из: `"start" \| "between" \| "end"`. Если не задан, компонент вычисляет его автоматически по контексту выбора. |
| `size` | `DataGridPickerSize` | — | Нет | Управляет визуальным размером элемента. Полезно для адаптации пикера к компактным или крупным раскладкам. |
| `value` | `DataGridCellKey` | — | Нет | Логическое значение, связанное с этой ячейкой сетки. Используется как уникальный ключ выбора ячейки. |
| `variant` | `DataGridPickerVariant` | — | Нет | Предустановка внешнего вида пикера. |
| `disabled` | `boolean` | — | Нет | Отключает выбор кликом и с клавиатуры. Переопределяет значение из корневого DataGrid |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Внешний ref на корневой элемент ячейки. Объединяется с внутренней регистрацией `itemRef([row, col], key)`, если ячейка не исключена. |
| `col` | `number` | — | Да | Индекс столбца ячейки (с 0). Вместе с индексом строки из контекста строки образует координаты сетки: `[row, col]`. |
| `asChild` | `boolean` | `false` | Нет | Если `true`, рендерит дочерние элементы через `Slot` и передаёт пропсы и ref дочернему элементу вместо использования нативного `<div>`. |
| `excluded` | `boolean` | — | Нет | Исключает ячейки из обхода фокусом. Переопределяет значение из корневого DataGrid |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:MonthPickerItem:end -->

### `MonthPickerCell`

<!-- AUTO-GENERATED:PART_API:MonthPickerCell:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `DataGridPickerSize` | — | Нет | Управляет визуальным размером элемента. Полезно для адаптации пикера к компактным или крупным раскладкам. |
| `range` | `DataGridPickerItemRangePosition` | — | Нет | Необязательный визуальный индикатор положения ячейки в диапазоне. Одно из: `"start" \| "between" \| "end"`. Если не задан, компонент вычисляет его автоматически по контексту выбора. |
| `variant` | `DataGridPickerVariant` | — | Нет | Предустановка внешнего вида пикера. |
| `disabled` | `boolean` | — | Нет | Отключает выбор кликом и с клавиатуры. Переопределяет значение из корневого DataGrid |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Внешний ref на корневой элемент ячейки. Объединяется с внутренней регистрацией `itemRef([row, col], key)`, если ячейка не исключена. |
| `asChild` | `boolean` | `false` | Нет | Если `true`, рендерит дочерние элементы через `Slot` и передаёт пропсы и ref дочернему элементу вместо использования нативного `<div>`. |
| `excluded` | `boolean` | — | Нет | Исключает ячейки из обхода фокусом. Переопределяет значение из корневого DataGrid |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:MonthPickerCell:end -->

### `MonthPickerRow`

<!-- AUTO-GENERATED:PART_API:MonthPickerRow:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Да | Индекс строки (с нуля) для всех дочерних ячеек. Передаётся потомкам через контекст. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:MonthPickerRow:end -->

### `MonthPickerRowGroup`

<!-- AUTO-GENERATED:PART_API:MonthPickerRowGroup:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `scope` | `DataGridScope` | — | Нет | Проп `scope` обязателен и идентифицирует логическую группу ячеек, которые рендерит эта группа строк. При использовании с `DataGridIndexedSnapScroller` scope обычно совпадает с текущим индексом или страницей. Scope позволяет DataGrid вернуть фокус на первую доступную ячейку, когда индекс меняется и рендерятся новые ячейки. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:MonthPickerRowGroup:end -->

### `MonthPickerLayout`

<!-- AUTO-GENERATED:PART_API:MonthPickerLayout:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Да | Шаблон ячейки месяца, рендерится один раз для каждого месяца года. Месяц читается через `useMonthPickerCellContext()`; обычно `<MonthPickerCell />`. |
| `cols` | `number` | `3` | Нет | Количество столбцов; строки добавляются по мере необходимости, чтобы вместить все месяцы года. |
| `locale` | `string` | — | Нет | Локаль для форматирования названий месяцев. По умолчанию — локаль пикера. |
| `format` | `Intl.DateTimeFormatOptions['month']` | `'long'` | Нет | Формат отображения месяца (из `Intl.DateTimeFormatOptions`). |
| `scope` | `DataGridScope` | — | Нет | Проп `scope` обязателен и идентифицирует логическую группу ячеек, которые рендерит эта группа строк. При использовании с `DataGridIndexedSnapScroller` scope обычно совпадает с текущим индексом или страницей. Scope позволяет DataGrid вернуть фокус на первую доступную ячейку, когда индекс меняется и рендерятся новые ячейки. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:MonthPickerLayout:end -->

## Типы

- `MonthPickerProps`
- `MonthPickerLayoutProps`
- `MonthPickerRowGroupProps`
- `MonthPickerRowProps`
- `MonthPickerItemProps`
- `MonthPickerCellProps`
- `MonthPickerCellContextData`

## Модель состояния

- Поведение выбора и границ унаследовано от `DataGridPicker`.
- Ключ месяца — его первый день в виде строки `YYYY-MM-DD`; `selected`, `from`, `to` и `disabled` используют те же строки.
- Корень передаёт видимый `year` (его первый день) и `calendar` через `useMonthPickerContext`.
- `createMonthPickerGrid({ year, calendar, cols })` строит строки из месяцев года: 12 или 13 в високосные годы еврейского календаря.
- `MonthPickerLayout` форматирует метки через `Intl.DateTimeFormat` в календарной системе пикера.
- Children у `MonthPickerLayout` — шаблон ячейки, который рендерится по одному разу на месяц внутри контекста ячейки. Children обязательны, обычно это `<MonthPickerCell />`, который показывает отформатированную метку.
- `useMonthPickerCellContext()` возвращает `{ col, date, fields, label }`; `date` — первый день месяца. Номер месяца берите из `label` или `fields`, но никогда из ISO-строки `date`.
- `locale` и `calendar` — пропсы корня; раскладки принимают собственное переопределение `locale`.
