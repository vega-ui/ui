# Pagination Anatomy

## Overview

`Pagination` is a `<nav>` landmark with a list of links to pages. The root shares `size` and `variant` with the parts inside, `PaginationList` lays out the row, each `PaginationItem` holds one link or status text, and `PaginationEllipsis` marks skipped pages.

## Required Parts

### `Pagination`

Required. Renders the `<nav>` and shares `size` and `variant` with the links and ellipses. Name it with `aria-label`; the library does not set one.

### `PaginationList`

Required. Renders the `<ul>` and lays the items out in a row, without the browser list margin and padding.

### `PaginationItem`

Required around every link or status text. Renders the `<li>`; put `className` or `style` on it to hide an item or move it in the row.

### `PaginationLink`

Required for every page and arrow. Renders an `<a>` styled as a square `Button`. `current` marks the current page with `aria-current='page'`. With `asChild` it renders the child instead: a router link, or a `<button type='button'>` when pages have no address.

## Optional Parts

### `PaginationEllipsis`

Optional. Renders an `<li aria-hidden>` with `…`, as wide as a link of the same size. It goes directly in `PaginationList`, not inside a `PaginationItem`, and is not interactive.

### `Text`

Optional. `Text` from `@vega-ui/react` shows a status such as `Page 3 of 20`, inside a `PaginationItem` or outside the list.

## Composition Order

1. `Pagination`
2. `PaginationList`
3. repeated `PaginationItem`, each with one `PaginationLink` or `Text` inside
4. `PaginationEllipsis` directly in `PaginationList`, between the items where pages are skipped

## Valid Composition Patterns

The items come from a local `getPageItems`: every number becomes a `PaginationItem` with a `PaginationLink`, every ellipsis marker becomes a `PaginationEllipsis`. The pages and arrows are buttons rendered through `asChild`.

<!-- example: pagination/button-based-pagination.tsx -->
```tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from '@vega-ui/react';
import { useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return [...Array(to - from + 1).keys()].map((offset) => from + offset);
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
    <Pagination aria-label='Search results pages' size='sm'>
      <PaginationList>
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeftIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
        {getPageItems(page, total, 0).map((item) => {
          if (typeof item === 'string') {
            return <PaginationEllipsis key={item} />;
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink asChild current={item === page}>
                <button type='button' aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                  {item}
                </button>
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
              <Icon><ChevronRightIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### A link placed directly in `PaginationList`

A `<ul>` may hold only `<li>`. Wrap every link and status text in `PaginationItem`.

### `PaginationEllipsis` wrapped in `PaginationItem`

`PaginationEllipsis` already renders an `<li>`, so the wrapper nests one list item inside another.

### Pagination component storing the authoritative page state by itself

`Pagination` keeps no page state. The current page belongs to the parent feature or the router.

### An ellipsis rendered as a link or a button

The ellipsis is a gap indicator, not page navigation. Use `PaginationEllipsis`; to let users reach a hidden page, add a page jump form or first and last links.
