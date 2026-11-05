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

### Three pages per view

Each page takes a third of the viewport minus the gaps. When several pages are visible at once, raise `size` so the window always holds pages beyond the visible ones on both sides.

<!-- example: indexed-snap-scroller/three-days-per-view.tsx -->
```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';

const today = new Date();
const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric' });

function ForecastDay() {
  const { index } = useIndexedSnapScrollerContext();
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);
  const temperature = 14 + Math.abs(index * 5) % 9;

  return (
    <IndexedSnapScrollerContent
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--spacing-2)',
        width: 'calc((100% - 2 * var(--spacing-4)) / 3)',
        paddingBlock: 'var(--spacing-8)',
        borderRadius: 'var(--radius-4)',
        background: index === 0 ? 'var(--fills-primary)' : 'var(--fills-secondary)',
      }}
    >
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{index === 0 ? 'Today' : dayFormat.format(day)}</Text>
      <Text size={5} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{temperature}°</Text>
    </IndexedSnapScrollerContent>
  );
}

export default function ThreeDaysPerView() {
  return (
    <IndexedSnapScroller
      defaultIndex={0}
      size={9}
      tabIndex={0}
      aria-label='Forecast'
      style={{ width: '100%', gap: 'var(--spacing-4)' }}
    >
      <ForecastDay />
    </IndexedSnapScroller>
  );
}
```
<!-- /example -->

## Do Not Override

- inventing indexed-scroller CSS APIs that do not exist in source
- treating the component as visually different from the base snap scroller without product intent
