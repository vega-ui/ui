# IndexedSnapScroller Accessibility

## Labeling

- The surrounding UI should explain what each logical index represents.

## Keyboard Behavior

- Keyboard behavior still depends on the rendered page content and any external controls.

## Focus Behavior

- Focus behavior depends on the current page content and any explicit navigation UI.
- The root has `tabIndex={-1}` by default, so the scroll container is not a Tab stop in any browser. When the pages have no focusable content and keyboard users should scroll with the arrow keys, pass `tabIndex={0}` together with an `aria-label`.

## Screen Reader Semantics

- Virtual paging is easier to understand when paired with explicit visible step labels or contextual headings.

## Form Semantics

- `IndexedSnapScroller` is a layout/navigation primitive, not form input.

## Accessibility Risks

- virtual index changes with no clear user-facing explanation
- hidden complexity around what the current page index actually means
