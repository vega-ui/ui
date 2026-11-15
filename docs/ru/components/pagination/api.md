# Pagination: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLElement>` | — | Нет | Ref, передаваемый на нижележащий элемент `<nav>`. |
| `size` | `PaginationSize` | `'md'` | Нет | Размер ссылок и многоточий внутри, если они не задают свой. |
| `variant` | `PaginationVariant` | `'primary'` | Нет | Визуальный вариант ссылок и многоточий внутри, если они не задают свой. |

Также принимает все HTML-атрибуты.
<!-- AUTO-GENERATED:ROOT_API:end -->

`Pagination` рендерит `<nav>` и принимает его атрибуты. Передайте `aria-label`, чтобы дать ориентиру имя.

## Дочерние части

- `PaginationList`: `<ul>` ряда.
- `PaginationItem`: один `<li>` вокруг ссылки или текста статуса.
- `PaginationLink`: ссылка на страницу, по умолчанию `<a>`, а с `asChild` — ссылка роутера или `<button>`.
- `PaginationEllipsis`: `<li aria-hidden>`, который отмечает пропущенные страницы; ставится прямо в `PaginationList`.

### `PaginationList`

<!-- AUTO-GENERATED:PART_API:PaginationList:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLUListElement>` | — | Нет | Ref, передаваемый на нижележащий элемент `<ul>`. |

Также принимает все атрибуты `<ul>`.
<!-- AUTO-GENERATED:PART_API:PaginationList:end -->

### `PaginationItem`

<!-- AUTO-GENERATED:PART_API:PaginationItem:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLLIElement>` | — | Нет | Ref, передаваемый на нижележащий элемент `<li>`. |

Также принимает все атрибуты `<li>`.
<!-- AUTO-GENERATED:PART_API:PaginationItem:end -->

### `PaginationLink`

<!-- AUTO-GENERATED:PART_API:PaginationLink:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLAnchorElement>` | — | Нет | Ref, передаваемый на отрисованный элемент `<a>`. |
| `asChild` | `boolean` | — | Нет | Рендерит дочерний элемент вместо `<a>`, например ссылку роутера или `<button>`. Адрес указывается на дочернем элементе. |
| `current` | `boolean` | — | Нет | Отмечает ссылку как текущую страницу через `aria-current='page'` и выделяет её визуально. |
| `size` | `PaginationSize` | — | Нет | Размер ссылки. По умолчанию — размер `Pagination`. |
| `variant` | `PaginationVariant` | — | Нет | Визуальный вариант ссылки. По умолчанию — вариант `Pagination`. |
| `appearance` | `ButtonProps['appearance']` | — | Нет | Структурный внешний вид ссылки, как у `Button`. По умолчанию `fill` для текущей страницы и `transparent` для остальных. |

Также принимает все атрибуты `<a>`.
<!-- AUTO-GENERATED:PART_API:PaginationLink:end -->

С `asChild` пропсы `PaginationLink` переходят на дочерний элемент, и он сохраняет своё поведение: ссылка роутера принимает адрес (`to`), `<button type='button'>` — `onClick` и `disabled`. У отключённой ссылки нет `href` и есть `aria-disabled='true'`; оба варианта получают отключённый вид `Button`.

### `PaginationEllipsis`

<!-- AUTO-GENERATED:PART_API:PaginationEllipsis:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLLIElement>` | — | Нет | Ref, передаваемый на нижележащий элемент `<li>`. |
| `size` | `PaginationSize` | — | Нет | Размер многоточия. По умолчанию — размер `Pagination`. |
| `variant` | `PaginationVariant` | — | Нет | Визуальный вариант многоточия. По умолчанию — вариант `Pagination`. |

Также принимает все атрибуты `<li>`.
<!-- AUTO-GENERATED:PART_API:PaginationEllipsis:end -->

Содержимое — `…`, если не передать `children`.

## Типы

- `PaginationProps`
- `PaginationListProps`
- `PaginationItemProps`
- `PaginationLinkProps`
- `PaginationEllipsisProps`
- `PaginationSize`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`, шкала размеров `IconButton`
- `PaginationVariant`: `'primary' | 'secondary'`

## Модель состояния

- `Pagination` не владеет состоянием. Он только передаёт `size` и `variant` ссылкам и многоточиям.
- Текущей страницей, границами и маршрутизацией владеет родительская функция: в URL или в состоянии React.
- `PaginationLink current` выставляет `aria-current='page'` и оформление `fill`.
- На границах родитель отключает стрелку: ссылка без `href` и с `aria-disabled='true'` или `disabled` на `<button>`, отрендеренном через `asChild`.
