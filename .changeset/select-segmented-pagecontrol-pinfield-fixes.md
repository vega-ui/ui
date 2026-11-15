---
"@vega-ui/react": patch
---

- `Select`: Alt+ArrowUp selects the active option before it closes the list, as the select-only combobox pattern says. Before, it only closed the list
- `SegmentedControlItem` with `disabled` disables its input too, so the item can no longer be selected. Before, only `data-disabled` was set
- `PageControlItem` keeps its own `size` over the `size` of `PageControl`
- `PinFieldSlot` shows `•` for each entered character while `PinFieldInput` has `type='password'`
