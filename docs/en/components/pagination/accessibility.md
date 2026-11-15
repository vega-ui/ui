# Pagination Accessibility

## Labeling

- `Pagination` renders a `<nav>` landmark. Name it with `aria-label`, for example `aria-label='Search results pages'`; the library does not set one. With several navigation landmarks on the page, the name tells them apart.
- Icon-only links, such as previous and next arrows, need their own `aria-label`.
- A page link labeled only with its number is announced as just the number. An `aria-label` such as `Page 3` makes it clearer out of context.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus through the previous and next links and the page links in order. Ellipses and disabled links are not focusable. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the focused link natively: buttons react to both keys, links only to Enter. The current page carries `aria-current='page'`. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- Focus lands on the links or buttons, not on `Pagination`, `PaginationList` or `PaginationItem`.
- A link without `href` is not focusable, so a disabled arrow rendered with `aria-disabled='true'` and no `href` drops out of the tab order. A `<button disabled>` rendered through `asChild` drops out the same way.
- `PaginationEllipsis` is not focusable.
- `Pagination` does not move focus. With link-based pagination, the browser or the router decides where focus goes after navigation.

## Screen Reader Semantics

- `PaginationLink current` sets `aria-current='page'`, so the current page is announced as current.
- `PaginationList` and `PaginationItem` expose list semantics, so screen readers announce the number of items.
- `PaginationEllipsis` is `aria-hidden`, so it is not announced and not counted. The links around it name their pages.
- A status such as `Page 3 of 12` is plain `Text`. Give it `aria-live='polite'` or `role='status'` when the change should be announced without moving focus.

## Form Semantics

- Pagination is navigation, not form input. Inside a form, a page rendered as `<button>` through `asChild` needs `type='button'` so it does not submit the form.

## Accessibility Risks

- `Pagination` without `aria-label`, so the landmark has no name
- icon links without `aria-label`
- the current page not marked with `current`
- an ellipsis rendered as a link or a button
- previous and next left active at the boundaries
