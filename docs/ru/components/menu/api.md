# Menu: API

## Пропсы корня

<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Нет | MenuTrigger и MenuContent этого меню. |
| `open` | `boolean` | — | Нет | Показано ли меню. Если задано, компонент становится контролируемым. |
| `defaultOpen` | `boolean` | — | Нет | Показано ли меню при монтировании. |
| `onChangeOpen` | `(open: boolean) => void` | — | Нет | Вызывается, когда меню показывается или скрывается. |
| `placement` | `Placement` | `'bottom-start'` | Нет | Предпочтительное расположение меню относительно триггера. Если места не хватает, меню переходит на противоположную сторону. |
| `size` | `MenuSize` | `'md'` | Нет | Размер пунктов меню. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `MenuTrigger`: кнопка меню.
- `MenuContent`: поповер с `role="menu"`.
- `MenuItem`: действие или ссылка.
- `MenuCheckboxItem`: пункт, который отмечается и снимается.
- `MenuRadioGroup`: группа, которая хранит значение своих радиопунктов.
- `MenuRadioItem`: один вариант группы радиопунктов.
- `MenuGroup`: группа связанных пунктов.
- `MenuItemIndicator`: галочка пункта-флажка или радиопункта.
- `MenuSubmenu`: вложенное меню без своего элемента.
- `MenuSubmenuTrigger`: пункт, который открывает вложенное меню.

### `MenuTrigger`

<!-- AUTO-GENERATED:PART_API:MenuTrigger:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | Нет | Рендерит триггером единственный дочерний элемент вместо `<button>`, например вашу Button. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый элементу триггера. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:MenuTrigger:end -->

### `MenuContent`

<!-- AUTO-GENERATED:PART_API:MenuContent:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref, передаваемый элементу `<div role="menu">`. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:MenuContent:end -->

- Нативный элемент `popover="auto"`: он всегда отрендерен и скрыт, пока меню закрыто. Браузер закрывает его по щелчку снаружи и когда открывается другой поповер.
- Привязан к триггеру через CSS anchor positioning и переходит на противоположную сторону, когда не хватает места.
- Ограничивает свою высоту значением `--menu-max-height` (по умолчанию 320px) и прокручивает пункты, если они не помещаются.

### `MenuItem`

<!-- AUTO-GENERATED:PART_API:MenuItem:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | Нет | Рендерит пунктом единственный дочерний элемент вместо `<button>`, например `<a>` для перехода. |
| `label` | `string` | — | Нет | Простой текст пункта для поиска при наборе; используется вместо текста его содержимого. |
| `disabled` | `boolean` | `false` | Нет | Оставляет пункт фокусируемым через aria-disabled, как требует паттерн меню, но никогда его не выполняет. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый элементу пункта. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:MenuItem:end -->

### `MenuCheckboxItem`

<!-- AUTO-GENERATED:PART_API:MenuCheckboxItem:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `checked` | `boolean` | — | Нет | Отмечен ли пункт. Если задано, компонент становится контролируемым. |
| `defaultChecked` | `boolean` | — | Нет | Отмечен ли пункт при монтировании. |
| `onChangeChecked` | `(checked: boolean) => void` | — | Нет | Вызывается с новым состоянием, когда пользователь отмечает или снимает пункт. |
| `label` | `string` | — | Нет | Простой текст пункта для поиска при наборе; используется вместо текста его содержимого. |
| `keepOpen` | `boolean` | `true` | Нет | Оставляет меню открытым, когда щелчок или Enter переключает пункт, как это делает пробел. Поставьте false, чтобы пункт закрывал меню, как обычный. |
| `disabled` | `boolean` | `false` | Нет | Оставляет пункт фокусируемым через aria-disabled, как требует паттерн меню, но никогда его не отмечает. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый элементу `<button role="menuitemcheckbox">`. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:MenuCheckboxItem:end -->

### `MenuRadioGroup`

<!-- AUTO-GENERATED:PART_API:MenuRadioGroup:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | Нет | Значение отмеченного MenuRadioItem. Если задано, компонент становится контролируемым. |
| `defaultValue` | `string` | — | Нет | Значение MenuRadioItem, отмеченного при монтировании. |
| `onChangeValue` | `(value: string) => void` | — | Нет | Вызывается со значением MenuRadioItem, который отметил пользователь. |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref, передаваемый элементу `<div role="group">`. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:MenuRadioGroup:end -->

### `MenuRadioItem`

<!-- AUTO-GENERATED:PART_API:MenuRadioItem:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | Да | Значение пункта, которое получает MenuRadioGroup, когда пользователь его отмечает. |
| `label` | `string` | — | Нет | Простой текст пункта для поиска при наборе; используется вместо текста его содержимого. |
| `keepOpen` | `boolean` | `true` | Нет | Оставляет меню открытым, когда щелчок или Enter отмечает пункт, как это делает пробел. Поставьте false, чтобы пункт закрывал меню, как обычный. |
| `disabled` | `boolean` | `false` | Нет | Оставляет пункт фокусируемым через aria-disabled, как требует паттерн меню, но никогда его не отмечает. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый элементу `<button role="menuitemradio">`. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:MenuRadioItem:end -->

### `MenuGroup`

<!-- AUTO-GENERATED:PART_API:MenuGroup:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref, передаваемый элементу `<div role="group">`. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:MenuGroup:end -->

### `MenuItemIndicator`

<!-- AUTO-GENERATED:PART_API:MenuItemIndicator:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | Нет | Предопределённый токен размера иконки. Может быть переопределён явными шириной и высотой. |
| `ref` | `Ref<SVGSVGElement>` | — | Нет | Ref на SVG-элемент |
| `strokeWidth` | `number` | — | Нет | Толщина обводки линий и фигур SVG (в px или pt). |
| `children` | `ReactNode` | — | Нет | Содержимое иконки. Принимает: иконки из `@vega-ui/icons`; собственный встроенный SVG; компоненты иконок сторонних библиотек (например, Lucide, Tabler) |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:PART_API:MenuItemIndicator:end -->

- Её размер следует размеру меню: `xs` в меню `sm`, `sm` в меню `md`, `md` в меню `lg`. Чтобы изменить его, передайте `size`.
- Без дочерних элементов рендерит галочку; другую иконку, например точку для радиопунктов, передайте дочерним элементом.

### `MenuSubmenu`

<!-- AUTO-GENERATED:PART_API:MenuSubmenu:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Нет | MenuSubmenuTrigger и MenuContent этого вложенного меню. |
| `open` | `boolean` | — | Нет | Показано ли вложенное меню. Если задано, компонент становится контролируемым. |
| `defaultOpen` | `boolean` | — | Нет | Показано ли вложенное меню при монтировании. |
| `onChangeOpen` | `(open: boolean) => void` | — | Нет | Вызывается, когда вложенное меню показывается или скрывается. |
<!-- AUTO-GENERATED:PART_API:MenuSubmenu:end -->

### `MenuSubmenuTrigger`

<!-- AUTO-GENERATED:PART_API:MenuSubmenuTrigger:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `label` | `string` | — | Нет | Простой текст пункта для поиска при наборе; используется вместо текста его содержимого. |
| `disabled` | `boolean` | `false` | Нет | Оставляет пункт фокусируемым через aria-disabled, как требует паттерн меню, но никогда не открывает вложенное меню. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый элементу `<button role="menuitem" aria-haspopup="menu">`. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:MenuSubmenuTrigger:end -->

## Типы

- `MenuProps`
- `MenuTriggerProps`
- `MenuContentProps`
- `MenuItemProps`
- `MenuCheckboxItemProps`
- `MenuRadioGroupProps`
- `MenuRadioItemProps`
- `MenuGroupProps`
- `MenuItemIndicatorProps`: пропсы [Icon](../icon/)
- `MenuSubmenuProps`
- `MenuSubmenuTriggerProps`
- `MenuSize`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `Placement`, тип `placement`: сторона (`'top' | 'right' | 'bottom' | 'left'`), за которой может идти `-start` или `-end`

## Модель состояния

- `Menu` может быть неконтролируемым через `defaultOpen` или [контролируемым](../../glossary.md#контролируемый-controlled) через `open` и `onChangeOpen`. `onChangeOpen` вызывается, когда меню показывается или скрывается по любой причине: из-за триггера, пункта, Escape, Tab или щелчка снаружи.
- Закрытие, которое сделали меню или браузер (выполнен пункт, Escape, Tab, щелчок снаружи, открылся другой поповер), окончательно, потому что нативный поповер нельзя удержать открытым: контролируемое меню остаётся скрытым, пока не изменится `open`, поэтому ставьте `open={false}` в `onChangeOpen`. Открытие с триггера окончательно так же, поэтому ставьте `open={true}` в `onChangeOpen`.
- Когда контролирующий родитель ставит `open` в `true`, меню открывается с фокусом на первом пункте.
- `MenuCheckboxItem` неконтролируемый через `defaultChecked` или контролируемый через `checked` и `onChangeChecked`. `MenuRadioGroup` неконтролируемая через `defaultValue` или контролируемая через `value` и `onChangeValue`; отключённый радиопункт никогда не отмечается.
- Пункты получают `id`, `role`, `tabIndex`, `aria-disabled` и `aria-checked` от меню; `id` не является пропсом ни триггера, ни содержимого, ни пунктов.
- `aria-expanded` и `data-open` отмечают триггер показанного меню, `data-checked` и `aria-checked` — отмеченный пункт, `data-size` — содержимое и пункты, а `data-side` и `data-align` — содержимое.

## Заметки по интеграции

- Триггер и пункты — кнопки с `type="button"`, поэтому они никогда не отправляют форму вокруг себя.
- `onClick` пункта выполняется раньше, чем реагирует меню. Вызовите в нём `event.preventDefault()`, чтобы меню осталось открытым, например чтобы пользователь мог нажать один и тот же пункт несколько раз.
- Пункт-ссылка через `asChild` сохраняет нативный переход: меню закрывается, а браузер переходит по ссылке. Пробел тоже её открывает.
