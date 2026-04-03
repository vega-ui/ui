# PageControl Styling

## Overview

`PageControl` styling is driven by size-specific dot dimensions and item-level background tokens. `PageControlProgress` extends the same dot model with width animation.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--page-control-item-size` | items and progress | base dot size |
| `--page-item-background-color` | items/progress | default background |
| `--page-item-background-color-hover` | items | hover state |
| `--page-item-background-color-active` | items/progress | active state |
| `--duration` | progress item | animation duration |
| `--focus-color` | items | focus outline |

## Part-Level Variables

### Root

The root sets row layout, gap, and `touch-action: none`.

### Item

`PageControlItem` maps size to circular dot dimensions and active background.

### Progress Item

`PageControlProgress` expands width when active and animates its fill through the `::after` pseudo-element.

## State And Variant Interaction

- size controls dot diameter
- active state changes the base background
- progress items use `--duration` to control the animated fill

## Examples

### Large page control

```tsx
<PageControl size='lg'>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
</PageControl>
```

## Do Not Override

- removing focus visibility from items
- using progress width animation when the product does not actually advance over time
