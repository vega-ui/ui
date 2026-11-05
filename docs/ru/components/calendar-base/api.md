# CalendarBase: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `variant` | `CalendarBaseVariant` | `'secondary'` | Нет | Визуальный вариант календаря. Передаётся через `CalendarBaseContext` и используется вложенными элементами управления (кнопками, подписями и т. д.) для единообразной стилизации. |
| `size` | `CalendarBaseSize` | `'xs'` | Нет | Общая шкала размера календаря. Через `CalendarBaseContext` влияет на вложенные элементы управления: кнопки навигации, триггеры пикеров и подписи дней недели. |
| `compact` | `boolean` | — | Нет | Флаг плотности для более компактных раскладок. При `true` корневой элемент получает `data-compact="true"`, чтобы стили могли уменьшить отступы, промежутки и высоту элементов управления для более плотного календаря. При `false` или `undefined` календарь использует обычные интервалы. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `CalendarBaseHeader`
- `CalendarBaseWeekLabels`
- `CalendarBaseWeekLabel`
- `CalendarBasePickerButton`
- `CalendarBaseControlIconButton`

### `CalendarBaseHeader`

<!-- AUTO-GENERATED:PART_API:CalendarBaseHeader:start -->
Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:CalendarBaseHeader:end -->

### `CalendarBaseWeekLabel`

<!-- AUTO-GENERATED:PART_API:CalendarBaseWeekLabel:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | Нет | Визуальный размер текста, обычно соответствует типографической шкале дизайн-системы. |
| `asChild` | `boolean` | — | Нет | Если true, рендерит текст как дочерний компонент через `Slot`. Полезно для совместимости с нативными элементами или другими компонентами. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | Нет | Насыщенность шрифта текста. Распространённые значения: 400: обычный; 500: средний; 600: полужирный; 700: жирный; 900: сверхжирный |
| `ref` | `Ref<HTMLSpanElement>` | — | Нет | Ref на нижележащий `<span>` или элемент в слоте. Полезен для измерений, фокуса или работы с DOM. |

Также принимает все атрибуты `<span>`.
<!-- AUTO-GENERATED:PART_API:CalendarBaseWeekLabel:end -->

### `CalendarBaseWeekLabels`

<!-- AUTO-GENERATED:PART_API:CalendarBaseWeekLabels:start -->
Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:CalendarBaseWeekLabels:end -->

### `CalendarBasePickerButton`

<!-- AUTO-GENERATED:PART_API:CalendarBasePickerButton:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | Нет | Если true, рендерит кнопку как дочерний компонент через `Slot` (например, из Radix UI). Включает полиморфный рендер — полезно, чтобы кнопка работала как ссылка или собственный тег. |
| `size` | `ButtonSize` | — | Нет | Определяет размер кнопки. Влияет на отступы, размер шрифта и общие габариты. |
| `fullWidth` | `boolean` | — | Нет | Если true, кнопка растягивается на всю ширину контейнера. |
| `variant` | `ButtonBaseVariant` | — | Нет | Определяет визуальный стиль кнопки: цветовую схему и акцент. |
| `appearance` | `ButtonBaseAppearance` | — | Нет | Настраивает структурный внешний вид кнопки (фон, рамка и т. д.). |
| `disabled` | `boolean` | — | Нет | Отключает кнопку при true. Запрещает взаимодействие и применяет визуальное отключённое состояние. Не применяется с `asChild`: отключённым состоянием владеет дочерний элемент, например через `aria-disabled` или ссылку без `href`. |
| `className` | `string` | — | Нет | Необязательный собственный CSS-класс для элемента кнопки. Полезен для переопределений дизайн-системы или локальных стилей. |
| `children` | `ReactNode` | — | Нет | Содержимое кнопки — текст, иконка или любой React-узел. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на нативный элемент `<button>`. Даёт прямой доступ к DOM для управления фокусом или измерений. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:CalendarBasePickerButton:end -->

### `CalendarBaseControlIconButton`

<!-- AUTO-GENERATED:PART_API:CalendarBaseControlIconButton:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `IconButtonSize` | — | Нет | Размер контейнера кнопки. Управляет отступами и общей кликабельной областью. |
| `asChild` | `boolean` | — | Нет | Если true, рендерит кнопку как дочерний компонент через `Slot` (например, из Radix UI). Включает полиморфный рендер — полезно, чтобы кнопка работала как ссылка или собственный тег. |
| `variant` | `ButtonBaseVariant` | — | Нет | Определяет визуальный стиль кнопки: цветовую схему и акцент. |
| `appearance` | `ButtonBaseAppearance` | — | Нет | Настраивает структурный внешний вид кнопки (фон, рамка и т. д.). |
| `disabled` | `boolean` | — | Нет | Отключает кнопку при true. Запрещает взаимодействие и применяет визуальное отключённое состояние. Не применяется с `asChild`: отключённым состоянием владеет дочерний элемент, например через `aria-disabled` или ссылку без `href`. |
| `className` | `string` | — | Нет | Необязательный собственный CSS-класс для элемента кнопки. Полезен для переопределений дизайн-системы или локальных стилей. |
| `children` | `ReactNode` | — | Нет | Содержимое кнопки — текст, иконка или любой React-узел. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на нативный элемент `<button>`. Даёт прямой доступ к DOM для управления фокусом или измерений. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:CalendarBaseControlIconButton:end -->

## Типы

- `CalendarBaseProps`
- `CalendarBaseHeaderProps`
- `CalendarBaseWeekLabelsProps`
- `CalendarBaseWeekLabelProps`
- `CalendarBasePickerButtonProps`
- `CalendarBaseControlIconButtonProps`
- `CalendarBaseVariant`
- `CalendarBaseSize`

## Модель состояния

- У `CalendarBase` нет собственного состояния выбора даты.
- Он только передаёт визуальный контекст вложенным частям семейства календаря.
