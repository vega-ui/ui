# Fieldset: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `appearance` | `FieldsetAppearance` | `'transparent'` | Нет | Внешний вид контейнера fieldset. |

Также принимает все атрибуты `<fieldset>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `FieldsetLegend`: семантическая legend группы.
- `FieldsetHeader`: необязательный описательный блок под legend.

### `FieldsetLegend`

<!-- AUTO-GENERATED:PART_API:FieldsetLegend:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | Нет | Визуальный размер текста, обычно соответствует типографической шкале дизайн-системы. |
| `asChild` | `boolean` | — | Нет | Если true, рендерит текст как дочерний компонент через `Slot`. Полезно для совместимости с нативными элементами или другими компонентами. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | Нет | Насыщенность шрифта текста. Распространённые значения: 400: обычный; 500: средний; 600: полужирный; 700: жирный; 900: сверхжирный |
| `ref` | `Ref<HTMLSpanElement>` | — | Нет | Ref на нижележащий `<span>` или элемент в слоте. Полезен для измерений, фокуса или работы с DOM. |

Также принимает все атрибуты `<span>`.
<!-- AUTO-GENERATED:PART_API:FieldsetLegend:end -->

### `FieldsetHeader`

<!-- AUTO-GENERATED:PART_API:FieldsetHeader:start -->
Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:FieldsetHeader:end -->

## Типы

- `FieldsetAppearance = 'transparent' | 'outlined' | string`
- `FieldsetProps`
- `FieldsetLegendProps`
- `FieldsetHeaderProps`

## Модель состояния

- Сам `Fieldset` не управляет контролируемым состоянием.
- Нативный `disabled` на корне отключает вложенные элементы формы по семантике браузера.
- Состояния валидации, выбора и значения принадлежат элементам управления внутри группы.
