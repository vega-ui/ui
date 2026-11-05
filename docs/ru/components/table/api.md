# Table: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `dataAlign` | `'start' \| 'center' \| 'end' \| 'between'` | `'between'` | Нет | Определяет стратегию выравнивания ячеек данных таблицы. 'start': выравнивает содержимое по левому краю; 'center': центрирует содержимое; 'end': выравнивает содержимое по правому краю; 'between': равномерно распределяет пространство между ячейками |
| `edgePadded` | `boolean` | `false` | Нет | Добавляет горизонтальные отступы по краям контейнера таблицы. Полезно, когда таблица не должна растягиваться до края области просмотра. |
| `fullWidth` | `boolean` | — | Нет | Растягивает таблицу на всю ширину контейнера. |
| `fullHeight` | `boolean` | — | Нет | Растягивает таблицу на всю высоту контейнера. Полезно для раскладок с прокручиваемыми или закреплёнными областями. |
| `ref` | `Ref<HTMLTableElement>` | — | Нет | Ref на нативный HTML-элемент `<table>`. Полезен для фокуса, измерений или императивного доступа. |

Также принимает все атрибуты `<table>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `TableHead`: семантическая секция заголовка.
- `TableBody`: семантическая секция тела.
- `TableFoot`: семантическая секция подвала.
- `TableRow`: структура строки.
- `TableHeading`: ячейка заголовка.
- `TableData`: ячейка данных.

### `TableBody`

<!-- AUTO-GENERATED:PART_API:TableBody:start -->
Также принимает все атрибуты `<tbody>`.
<!-- AUTO-GENERATED:PART_API:TableBody:end -->

### `TableData`

<!-- AUTO-GENERATED:PART_API:TableData:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `dataAlign` | `TableProps['dataAlign']` | — | Нет | Управляет горизонтальным выравниванием содержимого ячейки. Наследуется от TableProps и обычно влияет на выравнивание текста или flex-раскладку. 'start' \| 'center' \| 'end' \| 'between' |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:TableData:end -->

### `TableFoot`

<!-- AUTO-GENERATED:PART_API:TableFoot:start -->
Также принимает все атрибуты `<tbody>`.
<!-- AUTO-GENERATED:PART_API:TableFoot:end -->

### `TableHead`

<!-- AUTO-GENERATED:PART_API:TableHead:start -->
Также принимает все атрибуты `<tbody>`.
<!-- AUTO-GENERATED:PART_API:TableHead:end -->

### `TableRow`

<!-- AUTO-GENERATED:PART_API:TableRow:start -->
Также принимает все атрибуты `<tr>`.
<!-- AUTO-GENERATED:PART_API:TableRow:end -->

### `TableHeading`

<!-- AUTO-GENERATED:PART_API:TableHeading:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `dataAlign` | `TableProps['dataAlign']` | — | Нет | Управляет горизонтальным выравниванием содержимого заголовка. Наследуется от TableProps и обычно влияет на выравнивание текста или раскладки. 'start' \| 'center' \| 'end' \| 'between' |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:TableHeading:end -->

## Типы

- `TableProps`
- `TableHeadProps`
- `TableBodyProps`
- `TableFootProps`
- `TableRowProps`
- `TableHeadingProps`
- `TableDataProps`

## Модель состояния

- `Table` не владеет интерактивным состоянием строк, как это делает `DataGrid`.
- Корень передаёт частям-ячейкам контекст выравнивания и краевых отступов.
- `useTableContext` доступен для продвинутых обёрток и собственных композиций.
