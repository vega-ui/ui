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

<!-- example: pagination/button-based-pagination.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
} from '@vega-ui/react';
import { useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function getPageItems(page: number, total: number, siblings: number): PageItem[] {
  const slots = siblings * 2 + 5;

  if (total <= slots) {
    return range(1, total);
  }
  if (page - siblings <= 3) {
    return [...range(1, slots - 2), 'end-ellipsis', total];
  }
  if (page + siblings >= total - 2) {
    return [1, 'start-ellipsis', ...range(total - slots + 3, total)];
  }
  return [1, 'start-ellipsis', ...range(page - siblings, page + siblings), 'end-ellipsis', total];
}

export const layout = 'wide';

export default function ButtonBasedPagination() {
  const total = 12;
  const [page, setPage] = useState(1);

  return (
    <nav aria-label='Search results pages'>
      <Pagination>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
            <Icon><ChevronLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        {getPageItems(page, total, 1).map((item) => {
          if (typeof item === 'string') {
            return <PaginationListItem key={item}><PaginationEllipsis /></PaginationListItem>;
          }

          return (
            <PaginationListItem key={item}>
              <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                {item}
              </PaginationItem>
            </PaginationListItem>
          );
        })}
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
            <Icon><ChevronRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    </nav>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Interactive pagination parts rendered without `PaginationListItem`

The visuals may still work, but list semantics are weakened.

### Pagination component storing the authoritative page state by itself

Canonical page state belongs to the parent feature or router.

### Ellipsis used as an interactive substitute for real pages

The shipped ellipsis is a visual gap indicator, not page navigation.
