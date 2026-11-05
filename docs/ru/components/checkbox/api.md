# Checkbox: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `variant` | `CheckboxVariant` | `'primary'` | Нет | Визуальный вариант чекбокса для переключения темы или контекста. |
| `size` | `CheckboxSize` | `'md'` | Нет | Размер чекбокса и его визуального маркера. |
| `ref` | `Ref<HTMLLabelElement>` | — | Нет | Ref на нативный элемент label. |

Также принимает все атрибуты `<label>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `CheckboxInput`: нативный `<input type="checkbox">`. Принимает `checked`, `defaultChecked`, `onChange`, `disabled`, `name`, `value` и `indeterminate`.
- `CheckboxIndicator`: видимая поверхность чекбокса.
- `CheckboxCheckedIcon`: необязательная иконка отмеченного состояния.
- `CheckboxIndeterminateIcon`: необязательная иконка неопределённого состояния.

### `CheckboxInput`

<!-- AUTO-GENERATED:PART_API:CheckboxInput:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `indeterminate` | `boolean` | — | Нет | Задаёт нативное свойство `indeterminate` поля. Часто используется, когда выбраны только некоторые вложенные элементы. У него нет HTML-атрибута, поэтому оно применяется императивно. |
| `ref` | `Ref<HTMLInputElement>` | — | Нет | Необязательный `ref` даёт прямой доступ к нижележащему элементу `<input type="checkbox">` для сложных сценариев, например управления фокусом или императивной проверки состояния. |

Также принимает все атрибуты `<input>`.
<!-- AUTO-GENERATED:PART_API:CheckboxInput:end -->

### `CheckboxIndicator`

<!-- AUTO-GENERATED:PART_API:CheckboxIndicator:start -->
Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:CheckboxIndicator:end -->

### `CheckboxCheckedIcon`

<!-- AUTO-GENERATED:PART_API:CheckboxCheckedIcon:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | Нет | Предопределённый токен размера иконки. Может быть переопределён явными шириной и высотой. |
| `ref` | `Ref<SVGSVGElement>` | — | Нет | Ref на SVG-элемент |
| `strokeWidth` | `number` | — | Нет | Толщина обводки линий и фигур SVG (в px или pt). |
| `children` | `ReactNode` | — | Нет | Содержимое иконки (обязательно). Принимает: иконки из `~/icons`; собственный встроенный SVG; компоненты иконок сторонних библиотек (например, Lucide, Tabler) |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:CheckboxCheckedIcon:end -->

### `CheckboxIndeterminateIcon`

<!-- AUTO-GENERATED:PART_API:CheckboxIndeterminateIcon:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | Нет | Предопределённый токен размера иконки. Может быть переопределён явными шириной и высотой. |
| `ref` | `Ref<SVGSVGElement>` | — | Нет | Ref на SVG-элемент |
| `strokeWidth` | `number` | — | Нет | Толщина обводки линий и фигур SVG (в px или pt). |
| `children` | `ReactNode` | — | Нет | Содержимое иконки (обязательно). Принимает: иконки из `~/icons`; собственный встроенный SVG; компоненты иконок сторонних библиотек (например, Lucide, Tabler) |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:CheckboxIndeterminateIcon:end -->

## Типы

- `CheckboxProps`
- `CheckboxInputProps`
- `CheckboxIndicatorProps`
- `CheckboxCheckedIconProps`
- `CheckboxIndeterminateIconProps`
- `CheckboxVariant`
- `CheckboxSize`

## Модель состояния

- Состояние отметки живёт на `CheckboxInput`, как у нативного чекбокса: неконтролируемое через `defaultChecked`, контролируемое через `checked` и `onChange`.
- `indeterminate` на `CheckboxInput` задаёт нативное свойство `indeterminate`. Обычно это визуальное состояние частичного выбора.
- `Checkbox` отвечает только за `size` и `variant`; `useCheckboxContext` передаёт их собственным частям.
