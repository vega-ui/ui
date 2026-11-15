# Pagination API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLElement>` | — | No | Ref forwarded to the underlying `<nav>` element. |
| `size` | `PaginationSize` | `'md'` | No | Size of the links and ellipses inside, unless one sets its own. |
| `variant` | `PaginationVariant` | `'primary'` | No | Visual variant of the links and ellipses inside, unless one sets its own. |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

`Pagination` renders a `<nav>` and takes its attributes. Pass `aria-label` to name the landmark.

## Child Parts

- `PaginationList`: the `<ul>` of the row.
- `PaginationItem`: one `<li>` around a link or a status text.
- `PaginationLink`: a link to a page, `<a>` by default, or with `asChild` a router link or a `<button>`.
- `PaginationEllipsis`: an `<li aria-hidden>` that marks skipped pages, placed directly in `PaginationList`.

### `PaginationList`

<!-- AUTO-GENERATED:PART_API:PaginationList:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLUListElement>` | — | No | Ref forwarded to the underlying `<ul>` element. |

Also accepts all `<ul>` attributes.
<!-- AUTO-GENERATED:PART_API:PaginationList:end -->

### `PaginationItem`

<!-- AUTO-GENERATED:PART_API:PaginationItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLLIElement>` | — | No | Ref forwarded to the underlying `<li>` element. |

Also accepts all `<li>` attributes.
<!-- AUTO-GENERATED:PART_API:PaginationItem:end -->

### `PaginationLink`

<!-- AUTO-GENERATED:PART_API:PaginationLink:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLAnchorElement>` | — | No | Ref forwarded to the rendered `<a>` element. |
| `asChild` | `boolean` | — | No | Renders the child element instead of `<a>`, for example a router link or a `<button>`. The address goes on the child. |
| `current` | `boolean` | — | No | Marks the link as the current page with `aria-current='page'` and applies visual emphasis. |
| `size` | `PaginationSize` | — | No | Size of the link. Defaults to the size of `Pagination`. |
| `variant` | `PaginationVariant` | — | No | Visual variant of the link. Defaults to the variant of `Pagination`. |
| `appearance` | `ButtonProps['appearance']` | — | No | Structural appearance of the link, like on `Button`. Defaults to `fill` for the current page and `transparent` for the others. |

Also accepts all `<a>` attributes.
<!-- AUTO-GENERATED:PART_API:PaginationLink:end -->

With `asChild`, the props of `PaginationLink` go to the child, and the child keeps its own behavior: a router link takes the address (`to`), a `<button type='button'>` takes `onClick` and `disabled`. A disabled link has no `href` and has `aria-disabled='true'`; both get the disabled look of `Button`.

### `PaginationEllipsis`

<!-- AUTO-GENERATED:PART_API:PaginationEllipsis:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLLIElement>` | — | No | Ref forwarded to the underlying `<li>` element. |
| `size` | `PaginationSize` | — | No | Size of the ellipsis. Defaults to the size of `Pagination`. |
| `variant` | `PaginationVariant` | — | No | Visual variant of the ellipsis. Defaults to the variant of `Pagination`. |

Also accepts all `<li>` attributes.
<!-- AUTO-GENERATED:PART_API:PaginationEllipsis:end -->

The content is `…` unless you pass `children`.

## Types

- `PaginationProps`
- `PaginationListProps`
- `PaginationItemProps`
- `PaginationLinkProps`
- `PaginationEllipsisProps`
- `PaginationSize`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`, the `IconButton` size scale
- `PaginationVariant`: `'primary' | 'secondary'`

## State Model

- `Pagination` owns no state. It only shares `size` and `variant` with the links and ellipses.
- The current page, the boundaries and routing are owned by the parent feature: in the URL or in React state.
- `PaginationLink current` sets `aria-current='page'` and the `fill` appearance.
- At the boundaries the parent disables the arrow: a link without `href` and with `aria-disabled='true'`, or `disabled` on a `<button>` rendered through `asChild`.
