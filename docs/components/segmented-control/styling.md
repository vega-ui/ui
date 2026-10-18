# SegmentedControl Styling

## Overview

`SegmentedControl` styling is split across the root track, item-level content, and the animated indicator. The indicator follows the checked segment through CSS anchor positioning — no JS measurement.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--segmented-control-height` | `SegmentedControl` | Overall control height. |
| `--segmented-control-background-color` | `SegmentedControl` | Track background. |

## Part-Level Variables

- `SegmentedControl`: root track, size model, and focus outline.
- `SegmentedControlItem`: label sizing, padding, and active or disabled text treatment. The active segment is the one whose radio is checked — target it with `:has(input:checked)`.
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

- Do not hard-code indicator geometry: `left` and `width` come from the checked segment's anchor.
- Browsers without CSS anchor positioning hide the indicator and paint the checked segment's own background instead.
- Do not weaken root focus visibility.
- Do not force very uneven item padding if labels already vary in length.
