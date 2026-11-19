---
'@vega-ui/react': minor
'@vega-ui/widgets': minor
---

New `Toolbar`, `Toggle`, `ToggleGroup` and `ToggleGroupToggle`, following the WAI-ARIA toolbar pattern.

- `Toolbar` is a `role="toolbar"` with `aria-orientation` that takes one Tab stop: the arrow keys of its `orientation` move the focus between its items and wrap around the ends, Home and End jump to the first and last item, and Tab comes back to the item that had the focus last. Name it with `aria-label`.
- `ToolbarItem` makes a control one of the items: a `<button>`, or your own `Button`, `MenuTrigger`, `Toggle` or text field with `asChild`. `disabled` on it disables the child and the arrows skip it. A text field keeps its arrows for the caret, and a menu opened from an item keeps the arrows inside the menu.
- `Toggle` is a button that stays pressed, with `aria-pressed`, `pressed`, `defaultPressed` and `onChangePressed`; a click, Enter or Space turns it on and off. It is a `Button` that takes `square` for one icon, or your own element with `asChild`, transparent when released and tinted in the primary color when pressed.
- `ToggleGroup` holds the `value`, `defaultValue` and `onChangeValue` of the `ToggleGroupToggle`s inside it, each with its own required `value`: one pressed button at a time as a `radiogroup` of `radio` buttons with `aria-checked`, or each button by itself with `multiple`, with `aria-pressed` and an array value. The arrow keys of both axes move the focus without pressing, and Tab enters on the pressed button. Inside a `Toolbar` its buttons join the arrows and the one Tab stop of the toolbar. `ToggleGroupToggle` is a `Button` that takes `square` and `asChild` like `Toggle`, and `disabled`, which the arrows skip; `size` and `disabled` on the group apply to every toggle in it.
- `@vega-ui/widgets/toolbar`, `@vega-ui/widgets/toggle` and `@vega-ui/widgets/toggle-group` are the framework-free widgets behind them.
