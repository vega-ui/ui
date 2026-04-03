# Pagination Accessibility

## Labeling

- The pagination region should have a meaningful accessible label when several navigation groups exist on the page.

## Keyboard Behavior

- Keyboard behavior comes from the composed buttons or links.

## Focus Behavior

- Focus lands on the interactive child items, not on the root list.

## Screen Reader Semantics

- `PaginationItem current` exposes `aria-current='page'`.
- Link-based pagination often provides the clearest semantics when pages are routeable destinations.

## Form Semantics

- Pagination is navigation, not form input.

## Accessibility Risks

- current page not exposed semantically
- ellipsis used as if it were a real page action
- previous/next boundaries not clearly disabled
