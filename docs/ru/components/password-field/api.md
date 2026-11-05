# PasswordField: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | Нет | Отключает поле пароля. Запрещает ввод и взаимодействие и применяет визуальное отключённое состояние. |
| `shown` | `boolean` | — | Нет | Управляет тем, показывается ли пароль открытым текстом. Если задан, компонент становится контролируемым. |
| `defaultShown` | `boolean` | `false` | Нет | Начальная видимость для неконтролируемого использования. |
| `onChangeShown` | `(shown: boolean) => void` | — | Нет | Вызывается при переключении видимости. |
| `size` | `TextFieldSize` | — | Нет | Визуальный размер текстового поля. Влияет на отступы, размер шрифта и общую высоту. 'sm': компактное поле; 'md': по умолчанию; 'lg': просторная раскладка |
| `error` | `boolean` | — | Нет | Показывает поле ввода в состоянии ошибки. |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref, передаваемый на элемент-обёртку. Полезен для программного управления, фокуса или интеграции. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `PasswordFieldInput`: поле ввода пароля или текста с учётом контекста.
- `PasswordFieldToggleIconButton`: кнопка, переключающая состояние видимости.
- `PasswordFieldShownIcon`: иконка состояния «показан».
- `PasswordFieldHiddenIcon`: иконка состояния «скрыт».

### `PasswordFieldInput`

<!-- AUTO-GENERATED:PART_API:PasswordFieldInput:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | Нет | Ref, передаваемый на нижележащий нативный элемент `<input>`. |

Также принимает все атрибуты `<input>`.
<!-- AUTO-GENERATED:PART_API:PasswordFieldInput:end -->

### `PasswordFieldHiddenIcon`

<!-- AUTO-GENERATED:PART_API:PasswordFieldHiddenIcon:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | Нет | Предопределённый токен размера иконки. Может быть переопределён явными шириной и высотой. |
| `ref` | `Ref<SVGSVGElement>` | — | Нет | Ref на SVG-элемент |
| `strokeWidth` | `number` | — | Нет | Толщина обводки линий и фигур SVG (в px или pt). |
| `children` | `ReactNode` | — | Нет | Содержимое иконки (обязательно). Принимает: иконки из `~/icons`; собственный встроенный SVG; компоненты иконок сторонних библиотек (например, Lucide, Tabler) |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:PasswordFieldHiddenIcon:end -->

### `PasswordFieldShownIcon`

<!-- AUTO-GENERATED:PART_API:PasswordFieldShownIcon:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | Нет | Предопределённый токен размера иконки. Может быть переопределён явными шириной и высотой. |
| `ref` | `Ref<SVGSVGElement>` | — | Нет | Ref на SVG-элемент |
| `strokeWidth` | `number` | — | Нет | Толщина обводки линий и фигур SVG (в px или pt). |
| `children` | `ReactNode` | — | Нет | Содержимое иконки (обязательно). Принимает: иконки из `~/icons`; собственный встроенный SVG; компоненты иконок сторонних библиотек (например, Lucide, Tabler) |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:PasswordFieldShownIcon:end -->

### `PasswordFieldToggleIconButton`

<!-- AUTO-GENERATED:PART_API:PasswordFieldToggleIconButton:start -->
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
<!-- AUTO-GENERATED:PART_API:PasswordFieldToggleIconButton:end -->

## Типы

- `PasswordFieldProps`
- `PasswordFieldInputProps`
- `PasswordFieldToggleIconButtonProps`
- `PasswordFieldShownIconProps`
- `PasswordFieldHiddenIconProps`

## Модель состояния

- Видимостью можно управлять через `shown` и `onChangeShown` или оставить её неконтролируемой с `defaultShown`.
- `PasswordFieldInput` меняет свой `type` в зависимости от контекста.
- Кнопка-переключатель меняет видимость и оставляет фокус там, куда его поместил браузер, как нативная кнопка; видимость она сообщает через `aria-pressed`.
- Собственный `onClick` на переключателе выполняется после переключения и не заменяет его.
