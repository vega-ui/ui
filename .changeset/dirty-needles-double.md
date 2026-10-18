---
"@vega-ui/react": minor
---

`SegmentedControl`: selection is owned by the native radio group; the indicator follows the checked segment through CSS anchor positioning

The component no longer mirrors the value in React state and no longer measures segments in a layout effect or `ResizeObserver`. In uncontrolled mode the hidden radios own the selection, and the active segment and the indicator follow `:checked` in CSS. In controlled mode React keeps `checked` on the radios, so a change the parent does not accept is rolled back.

- native form reset restores `defaultValue`, and the indicator follows it
- programmatic selection (`input.checked = true`, `form.reset()`) moves the indicator without any events
- the indicator follows layout changes (resize, font loading, label changes) without JS
- several controls on one page keep independent indicators
- without anchor positioning support the checked segment paints its own background instead of the sliding indicator
- Firefox moves the indicator without the slide animation

Breaking:

- removed `data-active` from `SegmentedControlItem`; target the checked segment with `:has(input[type='radio']:checked)`
- removed the `--segmented-control-indicator-offset` and `--segmented-control-indicator-size` CSS variables
