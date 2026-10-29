---
"@vega-ui/react": major
---

BREAKING: checkbox-like inputs follow the native element.

- `CheckboxHiddenInput`, `SwitchHiddenInput`, `CheckboxCardControlHiddenInput` and `SegmentedControlItemHiddenInput` are renamed to `CheckboxInput`, `SwitchInput`, `CheckboxCardControlInput` and `SegmentedControlItemInput`, together with their prop types. They are the actual interactive inputs, not hidden mirrors.
- `Checkbox` and `CheckboxCard` no longer accept `checked`, `defaultChecked`, `onChangeChecked`, `indeterminate` and `disabled` on the root. Set them on `CheckboxInput` / `CheckboxCardControlInput` like on a native checkbox, using `onChange` instead of `onChangeChecked`. `indeterminate` is a prop of the input.
- `useCheckboxContext` and `useCheckboxCardContext` expose only `size` and `variant`.
