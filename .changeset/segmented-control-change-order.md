---
"@vega-ui/react": major
---

- **Breaking:** `onChange` of `SegmentedControlItemInput` runs before `onChange` of `SegmentedControl`, like a native `change` event bubbling from the radio to the group, and `event.stopPropagation()` in it keeps the root's `onChange` from running. The root's `onChange` used to run first.
