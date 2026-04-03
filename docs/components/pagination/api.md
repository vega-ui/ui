# Pagination API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLUListElement>` | `—` | No | Ref forwarded to the underlying card element. |
| `size` | `PaginationSize` | `'md'` | No | Visual size of the card, inherited from IconButtonProps. |
| `variant` | `PaginationVariant` | `'primary'` | No | Visual variant of the component. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PaginationItem`: page number item.
- `PaginationTriggerIconButton`: previous/next or jump controls.
- `PaginationEllipsis`: visual gap item.
- `PaginationListItem`: list wrapper.
- `PaginationText`: compact textual status.

## Types

- `PaginationProps`
- `PaginationItemProps`
- `PaginationTriggerIconButtonProps`
- `PaginationEllipsisProps`
- `PaginationListItemProps`
- `PaginationTextProps`
- `PaginationSize`
- `PaginationVariant`

## State Model

- The root only provides shared style context.
- Current page, disabled boundaries, and routing behavior are owned by the parent feature.
- `PaginationItem current` sets `aria-current='page'`.
