# Pagination

## Doc Profile

`advanced interactive`

## Summary

`Pagination` is a [compound component](../../glossary.md#compound-component) for paged navigation: a `<nav>` landmark with a list of links to the pages of content. It shares `size` and `variant` with the links and ellipses inside and keeps no page state: the app owns the current page, in the URL or in React state. Which pages to show when there are too many to list is up to the app.

## Imports

```tsx
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationLinkProps,
  type PaginationListProps,
  type PaginationProps,
  type PaginationSize,
  type PaginationVariant,
} from '@vega-ui/react';
```

## Exported Types

- `PaginationProps`
- `PaginationListProps`
- `PaginationItemProps`
- `PaginationLinkProps`
- `PaginationEllipsisProps`
- `PaginationSize`
- `PaginationVariant`

## Minimal Composition

`Pagination` renders the `<nav>`, named with `aria-label`; `PaginationList` renders the `<ul>`, and each `PaginationItem` is one `<li>` around a `PaginationLink`. Here the pages have no address, so the parent keeps the page in React state and each `PaginationLink asChild` renders a `<button type='button'>`; `current` marks the current page. The arrow buttons need their own `aria-label` and take `disabled` themselves at the boundaries. When pages have an address, pass `href` to `PaginationLink` instead and it renders an `<a>`.

<!-- example: pagination/minimal-composition.tsx -->
```tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from '@vega-ui/react';
import { useState } from 'react';

export default function MinimalComposition() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];

  return (
    <Pagination aria-label='Pagination'>
      <PaginationList>
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeftIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink asChild current={item === page}>
              <button type='button' onClick={() => setPage(item)}>{item}</button>
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Next page' disabled={page === pages.length} onClick={() => setPage(page + 1)}>
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

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyPagination` passes its props to `Pagination`, builds the links for `page` of `total` with the addresses from `getHref` and `siblings` pages on each side of the current one, and names the arrow links with `previousLabel` and `nextLabel`. See [Component recipes](../../recipes.md).

<!-- example: pagination/recipe.tsx -->
```tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  type PaginationProps,
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

interface MyPaginationProps extends PaginationProps {
  page: number
  total: number
  getHref: (page: number) => string
  siblings?: number
  previousLabel: string
  nextLabel: string
}

export function MyPagination({ page, total, getHref, siblings = 1, previousLabel, nextLabel, ...props }: MyPaginationProps) {
  const isFirst = page === 1;
  const isLast = page === total;

  return (
    <Pagination {...props}>
      <PaginationList>
        <PaginationItem>
          {isFirst ? (
            <PaginationLink aria-label={previousLabel} aria-disabled='true'><Icon><ChevronLeftIcon /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page - 1)} rel='prev' aria-label={previousLabel}><Icon><ChevronLeftIcon /></Icon></PaginationLink>
          )}
        </PaginationItem>
        {getPageItems(page, total, siblings).map((item) => {
          if (typeof item === 'string') {
            return <PaginationEllipsis key={item} />;
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink href={getHref(item)} current={item === page}>{item}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          {isLast ? (
            <PaginationLink aria-label={nextLabel} aria-disabled='true'><Icon><ChevronRightIcon /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page + 1)} rel='next' aria-label={nextLabel}><Icon><ChevronRightIcon /></Icon></PaginationLink>
          )}
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}

const total = 24;

function getHref(page: number) {
  return `?page=${page}`;
}

export const layout = 'wide';

export default function Recipe() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fromUrl = Number(new URLSearchParams(window.location.search).get('page'));
    if (Number.isInteger(fromUrl) && fromUrl >= 1 && fromUrl <= total) {
      setPage(fromUrl);
    }
  }, []);

  return (
    <MyPagination
      aria-label='Blog archive pages'
      size='sm'
      page={page}
      total={total}
      getHref={getHref}
      siblings={0}
      previousLabel='Previous page'
      nextLabel='Next page'
    />
  );
}
```
<!-- /example -->

## Required Parts

- `Pagination`: the `<nav>` landmark, named with `aria-label`, and the shared `size` and `variant`
- `PaginationList`: the `<ul>` that lays the items out in a row
- `PaginationItem`: the `<li>` around each link or status text
- `PaginationLink`: a link to a page, or with `asChild` a router link or a `<button>`

## Optional Parts

- `PaginationEllipsis`: an `<li aria-hidden>` that marks skipped pages in a truncated range; it goes directly in `PaginationList`
- `Text` from `@vega-ui/react` for a status such as `Page 3 of 20`, inside a `PaginationItem` or outside the list

## Composition Order

1. `Pagination`
2. `PaginationList`
3. repeated `PaginationItem`, each with one `PaginationLink` or `Text` inside
4. `PaginationEllipsis` directly in `PaginationList`, between the items where pages are skipped

## Variants

- Size: `xs`, `sm`, `md`, `lg` or `xl` on the `Button` scale, `md` by default
- Variant: `primary` or `secondary`, `primary` by default
- `size` and `variant` are set on `Pagination` and can be overridden on each `PaginationLink` and `PaginationEllipsis`
- Appearance: `fill` for the current page and `transparent` for the others; `appearance` on `PaginationLink` overrides it
- Interaction model: `<a href>` by default, a router link or a `<button type='button'>` through `asChild`

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

- First and last page behavior should be explicit: a boundary link loses its `href` and gets `aria-disabled='true'`, a boundary button gets `disabled`.
- The pagination UI should not become the source of truth for data state: render it from the page in the URL or in state.
- A page read from the URL or left over after filtering can fall outside the range. Clamp it once and use the same value for `current` and for the data slice.
- A truncated range that keeps the same number of items as the page moves keeps the controls from shifting. An ellipsis that hides a single page saves no space: show that page instead.
- With no pages, decide whether to render pagination at all.

## Common Mistakes

- Leaving `Pagination` or icon-only links without `aria-label`.
- Putting a `PaginationLink` directly in `PaginationList` without `PaginationItem`.
- Wrapping `PaginationEllipsis` in `PaginationItem`: it already renders its own `<li>`.
- Giving the address to `PaginationLink` when it renders a router link through `asChild`: the address goes on the child.
- Rendering a `<button>` through `asChild` without `type='button'` inside a form.
- Forgetting disabled behavior at page boundaries.
- Using pagination when infinite scroll or filtering is a better fit for the data.
