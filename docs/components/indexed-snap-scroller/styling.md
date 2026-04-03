# IndexedSnapScroller Styling

## Overview

`IndexedSnapScroller` inherits its styling contract from `SnapScroller` and `SnapScrollerContent`. It does not define additional component-local CSS, so most styling decisions should happen in the base scroller layer or at the rendered page content.

## Public CSS Variables

There are no dedicated component-local CSS variables in the current implementation.

For global theming guidance, see [Themes](../../styling/themes.md) and [CSS Variables](../../styling/css-variables.md).

## Part-Level Variables

### Root

Uses the `SnapScroller` scroll-snap container and its existing scroll, gap, and snap behavior.

### Content

Uses `SnapScrollerContent` behavior through `IndexedSnapScrollerContent`.

Any visual shell inside the page still belongs to the rendered child subtree, not to `IndexedSnapScroller` itself.

## State And Variant Interaction

- Styling is structural and inherited from the base snap scroller.
- Indexed behavior changes content identity and paging, not the visual contract.
- `preserveScroll`, `size`, and `shift` affect paging behavior rather than exposing new design tokens.

## Examples

### Default indexed snap surface

```tsx
<IndexedSnapScroller>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Do Not Override

- inventing indexed-scroller CSS APIs that do not exist in source
- treating the component as visually different from the base snap scroller without product intent
