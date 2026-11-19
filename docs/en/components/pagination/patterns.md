# Pagination Patterns

## Link-Based Pagination

When to use:

- pages are real navigable destinations with their own address

Composition notes:

- `PaginationLink` renders `<a>`, so pass `href`
- for a router, put its `Link` inside `PaginationLink asChild`, with the address on the child; mark the current page with `current`
- at the boundaries, render the arrow without `href` and with `aria-disabled='true'`
- keep href generation in the parent feature

Trade-offs:

- strong navigation semantics: pages open in a new tab, can be shared and are visible to search engines
- routing complexity stays outside the component

<!-- example: pagination/link-based-pagination.tsx -->
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
import { useEffect, useState } from 'react';

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

const total = 24;

function getHref(page: number) {
  return `?page=${page}`;
}

export const layout = 'wide';

export default function LinkBasedPagination() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fromUrl = Number(new URLSearchParams(window.location.search).get('page'));
    if (Number.isInteger(fromUrl) && fromUrl >= 1 && fromUrl <= total) {
      setPage(fromUrl);
    }
  }, []);

  const isFirst = page === 1;
  const isLast = page === total;

  return (
    <Pagination aria-label='Blog archive pages' size='sm'>
      <PaginationList>
        <PaginationItem>
          {isFirst ? (
            <PaginationLink aria-label='Previous page' aria-disabled='true'><Icon><ChevronLeftIcon /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page - 1)} rel='prev' aria-label='Previous page'><Icon><ChevronLeftIcon /></Icon></PaginationLink>
          )}
        </PaginationItem>
        {getPageItems(page, total, 0).map((item) => {
          if (typeof item === 'string') {
            return <PaginationEllipsis key={item} />;
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink href={getHref(item)} current={item === page} aria-label={`Page ${item}`}>{item}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          {isLast ? (
            <PaginationLink aria-label='Next page' aria-disabled='true'><Icon><ChevronRightIcon /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page + 1)} rel='next' aria-label='Next page'><Icon><ChevronRightIcon /></Icon></PaginationLink>
          )}
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
```
<!-- /example -->

## Button-Based Pagination

When to use:

- page state is entirely local or client-controlled, and pages have no address

Composition notes:

- render `<button type='button'>` through `PaginationLink asChild`
- keep the current page in parent state
- disable the boundary arrows with `disabled` on the `<button>`

Trade-offs:

- simple local control
- pages cannot be opened in a new tab or shared
- the parent feature must still own the canonical page state

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

## Truncated Large Range

When to use:

- the page count is large and showing every page is noisy

Composition notes:

- compute the items yourself: the first and last pages, the current page with its siblings, and an ellipsis marker for each gap; the example's `getPageItems` is a starting point
- render each number as a `PaginationItem` with a `PaginationLink`, and each ellipsis marker as a `PaginationEllipsis` directly in `PaginationList`
- add first and last arrows, or a page jump form, when users need to reach distant pages

Trade-offs:

- compact and scalable; the row keeps the same number of items as the page moves
- users lose direct access to every page

<!-- example: pagination/truncated-large-range.tsx -->
```tsx
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '@vega-ui/icons';
import {
  Button,
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  Text,
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

const totals = [7, 20, 1000];
const siblingOptions = [0, 1, 2];

export const layout = 'wide';

export default function TruncatedLargeRange() {
  const [total, setTotal] = useState(1000);
  const [siblings, setSiblings] = useState(1);
  const [page, setPage] = useState(500);

  const changeTotal = (next: number) => {
    setTotal(next);
    setPage(Math.min(page, next));
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-12)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-4) var(--spacing-12)' }}>
        <div role='group' aria-label='Total pages' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)', marginInlineEnd: 'var(--spacing-2)' }}>Pages</Text>
          {totals.map((item) => (
            <Button key={item} size='xs' variant={item === total ? 'primary' : 'secondary'} appearance='ghost' aria-pressed={item === total} onClick={() => changeTotal(item)}>
              {item}
            </Button>
          ))}
        </div>
        <div role='group' aria-label='Siblings' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)', marginInlineEnd: 'var(--spacing-2)' }}>Siblings</Text>
          {siblingOptions.map((item) => (
            <Button key={item} size='xs' variant={item === siblings ? 'primary' : 'secondary'} appearance='ghost' aria-pressed={item === siblings} onClick={() => setSiblings(item)}>
              {item}
            </Button>
          ))}
        </div>
      </div>
      <Pagination aria-label='Log pages' size='xs'>
        <PaginationList style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='First page' disabled={page === 1} onClick={() => setPage(1)}>
                <Icon><ChevronsLeftIcon /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
                <Icon><ChevronLeftIcon /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
          {getPageItems(page, total, siblings).map((item) => {
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
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='Last page' disabled={page === total} onClick={() => setPage(total)}>
                <Icon><ChevronsRightIcon /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
        </PaginationList>
      </Pagination>
    </div>
  );
}
```
<!-- /example -->
