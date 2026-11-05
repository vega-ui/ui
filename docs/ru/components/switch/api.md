# Switch: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `variant` | `SwitchVariant` | `'primary'` | Нет | Визуальный вариант чекбокса для переключения темы или контекста. |
| `size` | `SwitchSize` | `'md'` | Нет | Размер чекбокса и его визуального маркера. |
| `ref` | `Ref<HTMLLabelElement>` | — | Нет | Ref на нативный элемент label. |

Также принимает все атрибуты `<label>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `SwitchInput`: нативное состояние checked и участие в форме.
- `SwitchIndicator`: видимая поверхность переключателя.

### `SwitchInput`

<!-- AUTO-GENERATED:PART_API:SwitchInput:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | Нет | Ref, передаваемый на нижележащий нативный элемент `<input>` |

Также принимает все атрибуты `<input>`.
<!-- AUTO-GENERATED:PART_API:SwitchInput:end -->

### `SwitchIndicator`

<!-- AUTO-GENERATED:PART_API:SwitchIndicator:start -->
Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:SwitchIndicator:end -->

## Типы

- `SwitchProps`
- `SwitchInputProps`
- `SwitchIndicatorProps`
- `SwitchVariant`
- `SwitchSize`

## Модель состояния

- Видимый корень в основном задаёт контекст размера и варианта.
- Семантика checked и disabled обычно живёт на `SwitchInput`.
- `useSwitchContext` доступен для продвинутых обёрток и собственных композиций.
