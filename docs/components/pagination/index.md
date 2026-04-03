# Pagination

## Doc Profile

`advanced interactive`

## Summary

`Pagination` is a [compound component](../../glossary.md#compound-component) for paged navigation. It coordinates page items, trigger buttons, ellipsis placeholders, and optional supporting text while leaving the canonical page state in the parent feature.

## Imports

```tsx
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationText,
  PaginationTriggerIconButton,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationListItemProps,
  type PaginationProps,
  type PaginationSize,
  type PaginationTextProps,
  type PaginationTriggerIconButtonProps,
  type PaginationVariant,
} from '@vega-ui/react';
```

## Exported Types

- `PaginationProps`
- `PaginationItemProps`
- `PaginationTriggerIconButtonProps`
- `PaginationEllipsisProps`
- `PaginationListItemProps`
- `PaginationTextProps`
- `PaginationSize`
- `PaginationVariant`

## Minimal Composition

```tsx
<Pagination>
  <PaginationListItem>
    <PaginationTriggerIconButton />
  </PaginationListItem>
  <PaginationListItem>
    <PaginationItem current>1</PaginationItem>
  </PaginationListItem>
  <PaginationListItem>
    <PaginationTriggerIconButton />
  </PaginationListItem>
</Pagination>
```

## Required Parts

- `Pagination`: root context and list container
- `PaginationListItem`: list wrapper for each visible item
- one of `PaginationItem`, `PaginationTriggerIconButton`, `PaginationEllipsis`, or `PaginationText`

## Optional Parts

- `PaginationText`: compact textual summary such as `Page 3 of 20`
- `PaginationEllipsis`: gap indicator for truncated page ranges

## Composition Order

1. `Pagination`
2. repeated `PaginationListItem`
3. inside each item, one pagination child part

## Variants

- Size: inherited from button/icon-button sizing
- Variant: `primary` or `secondary`
- Interaction model: link-based or button-based pagination

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- First and last page behavior should be explicit.
- The pagination UI should not become the source of truth for data state.
- Ellipsis should preserve current-page context rather than hiding it entirely.

## Common Mistakes

- Forgetting disabled behavior at page boundaries.
- Treating pagination visuals as the only state model.
- Using pagination when infinite scroll or filtering is a better fit for the data.
