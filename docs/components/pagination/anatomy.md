# Pagination Anatomy

## Overview

`Pagination` is a compositional navigation system. The root shares size and variant context, while each list item wraps one visible pagination affordance.

## Required Parts

### `Pagination`

Required. Owns shared size and variant context and renders the outer list.

### `PaginationListItem`

Required in normal composition. Preserves list semantics for each visible pagination element.

### `PaginationItem` or `PaginationTriggerIconButton`

Normally required. These are the main interactive page affordances.

## Optional Parts

### `PaginationEllipsis`

Optional. Indicates truncated ranges.

### `PaginationText`

Optional. Shows compact textual pagination status.

## Composition Order

1. `Pagination`
2. repeated `PaginationListItem`
3. one child part per list item

## Valid Composition Patterns

```tsx
<Pagination>
  <PaginationListItem>
    <PaginationTriggerIconButton />
  </PaginationListItem>
  <PaginationListItem>
    <PaginationItem current>3</PaginationItem>
  </PaginationListItem>
  <PaginationListItem>
    <PaginationEllipsis />
  </PaginationListItem>
</Pagination>
```

## Invalid Composition Patterns

### Interactive pagination parts rendered without `PaginationListItem`

The visuals may still work, but list semantics are weakened.

### Pagination component storing the authoritative page state by itself

Canonical page state belongs to the parent feature or router.

### Ellipsis used as an interactive substitute for real pages

The shipped ellipsis is a visual gap indicator, not page navigation.
