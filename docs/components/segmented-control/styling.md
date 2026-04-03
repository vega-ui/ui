# SegmentedControl Styling

## Overview

`SegmentedControl` styling is split across the root track, item-level content, and the animated indicator. The root owns measured indicator geometry through CSS variables.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--segmented-control-height` | `SegmentedControl` | Overall control height. |
| `--segmented-control-background-color` | `SegmentedControl` | Track background. |
| `--segmented-control-indicator-offset` | `SegmentedControlIndicator` | Indicator x-position. |
| `--segmented-control-indicator-size` | `SegmentedControlIndicator` | Indicator width. |

## Part-Level Variables

- `SegmentedControl`: root track, size model, and focus outline.
- `SegmentedControlItem`: label sizing, padding, and active or disabled text treatment.
- `SegmentedControlIndicator`: animated selected-state surface.
- `SegmentedControlItemHiddenInput`: semantic carrier for native radio-group behavior.

## State And Variant Interaction

- `size` changes height, font size, and padding model.
- `variant` changes the indicator color family.
- Disabled state affects both the item styling and the indicator appearance.

## Examples

```css
.compactSegments {
  --segmented-control-height: 32px;
}
```

```css
.brandSegments {
  --segmented-control-background-color: var(--fills-secondary);
}
```

## Do Not Override

- Do not hard-code indicator geometry that conflicts with measured item widths.
- Do not weaken root focus visibility.
- Do not force very uneven item padding if labels already vary in length.
