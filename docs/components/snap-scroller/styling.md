# SnapScroller Styling

## Overview

`SnapScroller` styling is mostly structural: scroll container layout, snap behavior, and hidden scrollbar treatment. `SnapScrollerContent` adds snap alignment and shrink behavior.

## Public CSS Variables

There are no component-local CSS variables in the current implementation.

## Part-Level Variables

### Root

The root uses flex layout, `scroll-snap-type: x mandatory`, smooth scrolling, and hidden scrollbars.

### Content

Each content item uses `scroll-snap-align: start`, `scroll-snap-stop: always`, and `flex-shrink: 0`.

## State And Variant Interaction

- There are no built-in visual variants.
- Layout behavior depends on container width, gap, and each content item’s width.

## Examples

### Simple snap row

```tsx
<SnapScroller style={{ width: 400, gap: 12 }}>
  <SnapScrollerContent index={0}>0</SnapScrollerContent>
  <SnapScrollerContent index={1}>1</SnapScrollerContent>
</SnapScroller>
```

## Do Not Override

- changing snap alignment casually without revalidating navigation behavior
- relying on unstable item widths if precise snapping is required
