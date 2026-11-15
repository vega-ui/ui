---
"@vega-ui/react": major
---

`Slider` runs on a `@vega-ui/core` widget with the same markup, look and native range inputs: each `SliderThumbInput` is a root of the widget, which keeps the thumbs between their neighbours, steps them by the arrows, PageUp and PageDown the same in every browser, and restores the default value on a form reset.

- Safari mirrors the horizontal arrows in a right-to-left slider
- Firefox moves by a hundredth of the range on the arrows with `step='any'` instead of jumping to the end
- A key the slider steps fires `input` and `change` on the thumb, like the native input, so `onChange` on a thumb and on a form sees it
- **Breaking for custom parts:** `useSliderContext()` returns `handle` instead of `changeThumb`
