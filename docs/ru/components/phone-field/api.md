# PhoneField: API

## API корня

`PhoneField` владеет полем телефона и моделью форматирования по стране.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | Нет | Контролируемый номер телефона в виде текста поля. |
| `defaultValue` | `string` | `''` | Нет | Начальный номер телефона для неконтролируемого использования. По умолчанию `''`. Его страна выбирается, если не задан `code`. |
| `onChangeValue` | `(value: string) => void` | — | Нет | Вызывается с номером телефона при его изменении. |
| `code` | `CountryCode` | — | Нет | Код страны ISO 3166-1 alpha-2, по которому определяется формат маски телефона. Пример: 'US', 'RU', 'FR'. |
| `defaultCode` | `CountryCode` | `''` | Нет | Код страны ISO 3166-1 alpha-2, по которому определяется формат маски телефона. Пример: 'US', 'RU', 'FR'. |
| `onChangeCode` | `(code: CountryCode) => void` | — | Нет | Код страны ISO 3166-1 alpha-2, по которому определяется формат маски телефона. Пример: 'US', 'RU', 'FR'. |
| `strictMask` | `boolean` | `true` | Нет | Если true, маска телефона применяется строго — допускаются только корректные символы на своих позициях. |
| `size` | `TextFieldSize` | — | Нет | Визуальный размер текстового поля. Влияет на отступы, размер шрифта и общую высоту. 'sm': компактное поле; 'md': по умолчанию; 'lg': просторная раскладка |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref, передаваемый на элемент-обёртку. Полезен для программного управления, фокуса или интеграции. |
| `error` | `boolean` | — | Нет | Показывает поле ввода в состоянии ошибки. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## API дочерних частей

## `PhoneFieldInput`

Видимое текстовое поле для номера телефона.

<!-- AUTO-GENERATED:PART_API:PhoneFieldInput:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | Нет | Ref, передаваемый на нижележащий нативный элемент `<input>`. |

Также принимает все атрибуты `<input>`.
<!-- AUTO-GENERATED:PART_API:PhoneFieldInput:end -->

## `PhoneFieldSelect*`

Вложенное семейство выбора страны, построенное вокруг того же состояния поля.

- `PhoneFieldSelect`
- `PhoneFieldSelectHiddenSelect`
- `PhoneFieldSelectCombobox`
- `PhoneFieldSelectValue`
- `PhoneFieldSelectIcon`
- `PhoneFieldSelectListbox`
- `PhoneFieldSelectOption`

## `PhoneFieldSelect`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelect:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `SelectSize` | — | Нет | Визуальный размер элемента выбора. |
| `variant` | `SelectVariant` | — | Нет | Вариант визуального стиля элемента выбора. |
| `disabled` | `boolean` | — | Нет | Отключён ли select. Запрещает взаимодействие и применяет стиль отключённого состояния. |
| `onChangeValue` | `(value: V \| undefined) => void` | — | Нет | Колбэк, вызываемый при выборе варианта. |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref на корневой элемент. |
| `readOnly` | `boolean` | — | Нет | Если true, значение select нельзя изменить, но он остаётся фокусируемым. |
| `typeahead` | `boolean` | `true` | Нет | Включает переход к варианту при наборе начала его подписи. |
| `open` | `boolean` | — | Нет | Управляет состоянием открытия выпадающего списка Select. Если задан, Select становится контролируемым компонентом и по этому значению определяет, открыт список или закрыт. |
| `onChangeOpen` | `(open: boolean) => void` | — | Нет | Колбэк, вызываемый при изменении состояния открытия. Вызывается со следующим состоянием открытия (`true` или `false`) каждый раз, когда пользователь открывает или закрывает Select. Полезен для синхронизации состояния Select с внешней логикой. |
| `defaultOpen` | `boolean` | — | Нет | Задаёт начальное состояние открытия Select в неконтролируемом режиме. Применяется только при первом рендере и дальше игнорируется. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelect:end -->

## `PhoneFieldSelectHiddenSelect`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectHiddenSelect:start -->
Также принимает все атрибуты `<select>`.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectHiddenSelect:end -->

## `PhoneFieldSelectCombobox`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectCombobox:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref на нижележащий элемент `<button>`. Полезен для управления фокусом, позиционирования и императивного доступа. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectCombobox:end -->

## `PhoneFieldSelectValue`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectValue:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `placeholder` | `string` | — | Нет | Текст-заполнитель, который показывается, когда не выбран ни один вариант. Отображается, когда значение select пустое или undefined. После выбора значения заполнитель заменяется содержимым выбранного варианта. |
| `ref` | `Ref<HTMLSpanElement>` | — | Нет | Ref, передаваемый на корневой элемент span. |

Также принимает все атрибуты `<span>`.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectValue:end -->

## `PhoneFieldSelectIcon`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectIcon:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | Нет | Предопределённый токен размера иконки. Может быть переопределён явными шириной и высотой. |
| `ref` | `Ref<SVGSVGElement>` | — | Нет | Ref на SVG-элемент |
| `strokeWidth` | `number` | — | Нет | Толщина обводки линий и фигур SVG (в px или pt). |
| `children` | `ReactNode` | — | Нет | Содержимое иконки (обязательно). Принимает: иконки из `~/icons`; собственный встроенный SVG; компоненты иконок сторонних библиотек (например, Lucide, Tabler) |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectIcon:end -->

## `PhoneFieldSelectOption`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectOption:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `value` | `CountryCode` | — | Да | Значение этого варианта, которое передаётся в колбэк изменения при его выборе. |
| `label` | `string` | — | Нет | Простой текст варианта для поиска при наборе; используется вместо текста его содержимого. |
| `children` | `ReactNode` | — | Нет | Содержимое, отображаемое для этого варианта. Может включать текст, иконки или сложную разметку. |
| `size` | `OptionSize` | — | Нет | Размер варианта для визуальной стилизации. |
| `disabled` | `boolean` | — | Нет | Отключает весь Option. |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref, передаваемый на корневой div варианта. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectOption:end -->

## `PhoneFieldSelectListbox`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectListbox:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref на элемент-контейнер списка. Можно использовать для императивного доступа, например для измерений. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectListbox:end -->

## Хуки

## `usePhoneFieldContext`

Продвинутый хук для собственных обёрток и интеграций.

## Типы

| Тип | Определение | Примечания |
| --- | --- | --- |
| `PhoneFieldProps` | Тип пропсов корня | Основная поверхность интеграции поля. |
| `PhoneFieldInputProps` | Тип пропсов поля ввода | Поведение ввода номера. |
| `PhoneFieldSelectProps` | Тип пропсов корня select | Поверхность вложенного выбора страны. |

## Модель состояния

- Состояние корня согласует страну и форматирование поля.
- Строгая и нестрогая маска влияют на терпимость ввода.
- Вложенную композицию select всё равно нужно рассматривать как одно семейство поля.

## Заметки по интеграции

- Валидируйте и нормализуйте каноническое значение вне слоя представления.
- Перепроверяйте вставку и автозаполнение, а не только посимвольный набор.
- Держите смену страны и логику валидации синхронизированными.
