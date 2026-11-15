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
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
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
              <Icon><ChevronLeft /></Icon>
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
              <Icon><ChevronRight /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
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

- Size: `xs`, `sm`, `md`, `lg` or `xl` on the `IconButton` scale, `md` by default
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
