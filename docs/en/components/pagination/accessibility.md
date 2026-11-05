# Pagination Accessibility

## Labeling

- The pagination region should have a meaningful accessible label when several navigation groups exist on the page.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus through the previous and next triggers and the page items in order. Ellipses and disabled triggers are not focusable. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the focused item or trigger natively: buttons react to both keys, links only to Enter. The current page carries `aria-current='page'`. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

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
