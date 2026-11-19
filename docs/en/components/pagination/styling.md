# Pagination Styling

## Overview

`PaginationLink` and `PaginationEllipsis` take their look from `Button`, with `size` and `variant` from `Pagination`. The pagination-specific layer controls the row layout and the square shape of the links and ellipses.

## Public CSS Variables

There are no dedicated `--pagination-*` public variables in the current implementation.

The component primarily relies on:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--spacing-2` | `PaginationList` | gap between items |
| `--padding-inline` | `PaginationLink`, `PaginationEllipsis` | set to `0` so the box is square |
| `--icon-size` | `PaginationLink` | icon size, a third of the button height |

## Part-Level Variables

### `Pagination`

The `<nav>` has no styles of its own. Put layout styles on it when it holds more than the list, for example a status `Text` next to `PaginationList`.

### `PaginationList`

A flex row with `--spacing-2` between the items, without list markers and without the browser margin and padding.

### `PaginationItem`

A flex `<li>` that centers its content vertically. Style it to hide an item or move it in the row, for example `margin-inline-start: auto`.

### `PaginationLink`

A square `Button` with the `transparent` appearance, and `fill` when `current`; `appearance` overrides both. A link with `aria-disabled='true'` and a `<button disabled>` rendered through `asChild` get the disabled look of `Button`.

### `PaginationEllipsis`

A square, `transparent` `Button` box of the same size as the links, so the row does not shift when an ellipsis replaces a page. It ignores pointer events and has no hover or active state.

## State And Variant Interaction

- `size` and `variant` flow from `Pagination` into every `PaginationLink` and `PaginationEllipsis`, which can override them
- the current page changes the link appearance to `fill`
- the ellipsis stays visually passive; a status text is your own `Text`, styled by you

## Examples

### Secondary pagination with a status text

`variant='secondary'` on the root applies to both arrows. The status between them is a `Text` inside a `PaginationItem`, with its own padding and color.

<!-- example: pagination/secondary-pagination-text.tsx -->
```tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

export default function SecondaryPaginationText() {
  const total = 20;
  const [page, setPage] = useState(3);

  return (
    <Pagination aria-label='Gallery pages' variant='secondary'>
      <PaginationList>
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeftIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Text size={3} fontWeight={500} aria-live='polite' style={{ paddingInline: 'var(--spacing-8)', color: 'var(--color-secondary-500)', whiteSpace: 'nowrap' }}>
            Page {page} of {total}
          </Text>
        </PaginationItem>
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

## Do Not Override

- styling the ellipsis like an interactive page item
- making page links non-square without product intent
- removing the visual difference between the current page and the others
