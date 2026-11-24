# WheelPicker Styling

## Overview

The columns bend into one drum: each option sits on a face that turns away from the band, shrinks with the distance and fades out towards the edges. Where the browser has scroll-driven animations each face turns and fades on the compositor, so the drum keeps up with a fast swipe; elsewhere a scroll handler writes the position. A press or a key scrolls the column to the option for `--wheel-picker-duration` with `--wheel-picker-easing`. The geometry follows from the row height, the number of rows and the depth, so change those and the drum follows; its edge always meets the edge of the column.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--wheel-picker-row` | `WheelPicker` | Height of one row and of the band, set by `size`. |
| `--wheel-picker-rows` | `WheelPicker` | Number of visible rows; `rows` sets it. |
| `--wheel-picker-depth` | `WheelPicker` | Distance of the viewer in radii of the drum, `2` by default: a smaller number bends the wheel more strongly, a larger one flattens it. |
| `--wheel-picker-duration` | `WheelPicker` | Duration of the turn to an option the user presses or picks with a key, `--duration-spring` by default. |
| `--wheel-picker-easing` | `WheelPicker` | Easing of that turn, `--ease-smooth` by default. |
| `--wheel-picker-band-color` | `WheelPicker` | Background of the selection band. |
| `--wheel-picker-band-radius` | `WheelPicker` | Corner radius of the band and of the focus ring of a column. |

## Part-Level Variables

- `WheelPicker` sets the font of the options by `size`: `font-size` and `color` on it change every column.
- `WheelPickerColumn` is at least `3em` wide and as wide as its widest option; give it `min-inline-size` for text options.
- `WheelPickerOption` centers its `WheelPickerFace` and keeps it on one line; style the text through `className` or `style` on the face.

## State And Variant Interaction

- `[data-size]` on `WheelPicker` sets the row height and the text: `xs` 32px and `sm` 36px rows with `--text-font-size-2`, `md` 42px with `--text-font-size-3`, `lg` 48px and `xl` 52px with `--text-font-size-4`, like the fields of the same size.
- `[data-disabled]` on an option dims it with the disabled label color.
- `[data-disabled]` on a column dims all its options; `[data-disabled]` and `[data-readonly]` stop the column from scrolling.
- `:focus-visible` on a column draws the focus ring around it.

## Examples

Pass `className='strongBand'` to `WheelPicker` for a stronger band; for smaller rows pass `size='sm'` or `size='xs'`:

<!-- example: wheel-picker/styling-examples.css -->
```css
.strongBand {
  --wheel-picker-band-color: var(--fills-primary);
  --wheel-picker-band-radius: var(--radius-2);
}
```
<!-- /example -->

## Do Not Override

- Do not set `transform`, `opacity` or `animation` on `WheelPickerOption` or `WheelPickerFace`: the face carries the drum, and the column measures the rows.
- Do not give the rows different heights: the snapping and the cylinder count in rows of `--wheel-picker-row`.
- Do not hide the band: it is the only sign which row is selected.
