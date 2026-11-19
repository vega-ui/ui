---
'@vega-ui/react': major
---

- The AvatarStack types and context are named after the component: `AvatarGroupProps` is `AvatarStackProps`, `AvatarGroupStackItemProps` is `AvatarStackItemProps`, `AvatarGroupSize` is `AvatarStackSize`, `AvatarGroupVariant` is `AvatarStackVariant` and `useAvatarGroupContext` is `useAvatarStackContext`. The context shows as `AvatarStackContext` in React DevTools instead of `CheckboxContext`.
- `SegmentedControl` renders `role='radiogroup'` on its root, so the group is named by its `aria-label` or `aria-labelledby` without passing the role.
- `defaultValue` no longer narrows the type of the value to its literal in `Select`, `Combobox`, `Listbox`, `Grid` and `SegmentedControl`, so `defaultValue='day'` lets `onChangeValue` compare the value with `'week'`; `onChangeValue` of `Slider` gets a `number` or a `number[]`, not the literal of `defaultValue`.
- `PinField` marks no slot active until the field has the focus: an untouched field used to draw the active ring on its first slot.
- `PinField` writes a pasted code over the slots from the selected one, as if it were typed character by character: pasting `1234` into a full field from its first slot used to replace only that slot and drop the rest.
