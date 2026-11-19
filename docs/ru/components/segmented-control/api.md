# SegmentedControl: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | Нет | Отключает все сегменты, запрещая взаимодействие. |
| `size` | `SegmentedControlSize` | `'md'` | Нет | Визуальный размер сегментированного контрола. |
| `variant` | `SegmentedControlVariant` | `'secondary'` | Нет | Вариант визуального стиля сегментированного контрола. |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref на корневой элемент-контейнер. Полезен для измерений или управления фокусом. |
| `value` | `Value` | — | Нет | Текущее выбранное значение сегментированного контрола |
| `defaultValue` | `NoInfer<Value>` | — | Нет | Начальное выбранное значение, когда компонент используется в неконтролируемом режиме |
| `onChangeValue` | `(value: Value) => void` | — | Нет | Вызывается со значением сегмента, который выбрал пользователь. Как и нативное событие `change`, всплывающее к корню, не вызывается, если `onChange` у `SegmentedControlItemInput` останавливает всплытие. `preventDefault` не отменяет выбор, потому что радиокнопка отмечается до `change`: чтобы отклонить выбор, оставьте прежний `value` в контролируемом режиме. Собственный `onChange` корня — это нативное событие `change`, которое всплывает от радиокнопки. |
| `name` | `string` | — | Да | Имя нижележащей группы радиокнопок. Все элементы `SegmentedControlItemInput` используют это имя, поэтому сегментированный контрол ведёт себя как одна нативная группа радиокнопок для отправки формы и доступности. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `SegmentedControlItem`: видимый выбираемый сегмент.
- `SegmentedControlIndicator`: анимированная поверхность выбранного состояния.
- `SegmentedControlItemInput`: нативный радиоинпут для каждого элемента.

### `SegmentedControlItem`

<!-- AUTO-GENERATED:PART_API:SegmentedControlItem:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | Нет | Отключает элемент, запрещая выбор и фокус. |
| `size` | `SegmentedControlSize` | — | Нет | Управляет размером элемента. Влияет на отступы, размер шрифта и интервалы. |
| `variant` | `SegmentedControlVariant` | — | Нет | Вариант визуального стиля элемента. |
| `value` | `SegmentedControlValue` | — | Да | Уникальное значение, связанное с этим сегментом |
| `ref` | `Ref<HTMLLabelElement>` | — | Нет | Ref, передаваемый на нижележащий элемент `<label>`. |

Также принимает все атрибуты `<label>`.
<!-- AUTO-GENERATED:PART_API:SegmentedControlItem:end -->

### `SegmentedControlIndicator`

<!-- AUTO-GENERATED:PART_API:SegmentedControlIndicator:start -->
Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:SegmentedControlIndicator:end -->

### `SegmentedControlItemInput`

<!-- AUTO-GENERATED:PART_API:SegmentedControlItemInput:start -->
Также принимает все атрибуты `<input>`.
<!-- AUTO-GENERATED:PART_API:SegmentedControlItemInput:end -->

## Типы

- `SegmentedControlProps`
- `SegmentedControlItemProps`
- `SegmentedControlIndicatorProps`
- `SegmentedControlItemInputProps`
- `SegmentedControlSize`
- `SegmentedControlVariant`

## Модель состояния

- `SegmentedControl` может быть неконтролируемым через `defaultValue` или контролируемым через `value` и `onChangeValue`.
- `onChange` у `SegmentedControlItemInput` срабатывает раньше `onChange` корня, как нативное событие `change`, всплывающее от радиокнопки к группе; `event.stopPropagation()` в нём не даёт сработать `onChange` корня.
- В неконтролируемом режиме выбором владеет нативная группа радиокнопок: клики, клавиатура, сброс формы и программные изменения `checked` применяются без состояния React.
- `SegmentedControlIndicator` привязан к отмеченному сегменту через CSS, поэтому следует за любым из этих изменений.
- Для продвинутых обёрток и кастомных композиций доступен `useSegmentedControlContext`.
