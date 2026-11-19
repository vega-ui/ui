# SegmentedControl API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | No | Disables all segments, preventing user interaction. |
| `size` | `SegmentedControlSize` | `'md'` | No | Visual size of the segmented control. |
| `variant` | `SegmentedControlVariant` | `'secondary'` | No | Visual style variant of the segmented control. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root container element. Useful for measuring or controlling focus. |
| `value` | `Value` | — | No | The currently selected value of the segmented control |
| `defaultValue` | `NoInfer<Value>` | — | No | The initial selected value when the component is used in an uncontrolled mode |
| `onChangeValue` | `(value: Value) => void` | — | No | Called with the value of the item the user selects. Like the native `change` event bubbling to the root, it does not run when the `onChange` of the `SegmentedControlItemInput` stops the propagation. `preventDefault` cannot undo the choice, because the radio is checked before `change`: to turn a choice down, keep the previous `value` in controlled mode. The root's own `onChange` is the native `change` event that bubbles from the radio input. |
| `name` | `string` | — | Yes | The name of the underlying radio group. All `SegmentedControlItemInput` elements share this name, allowing the segmented control to behave as a single native radio group for form submission and accessibility. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SegmentedControlItem`: visible selectable segment.
- `SegmentedControlIndicator`: animated selected-state surface.
- `SegmentedControlItemInput`: native radio input for each item.

### `SegmentedControlItem`

<!-- AUTO-GENERATED:PART_API:SegmentedControlItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | No | Disables the item, preventing selection and focus. |
| `size` | `SegmentedControlSize` | — | No | Controls the size of the item. Affects padding, font size, and spacing. |
| `variant` | `SegmentedControlVariant` | — | No | Visual style variant of the item. |
| `value` | `SegmentedControlValue` | — | Yes | The unique value associated with this segment |
| `ref` | `Ref<HTMLLabelElement>` | — | No | Ref forwarded to the underlying `<label>` element. |

Also accepts all `<label>` attributes.
<!-- AUTO-GENERATED:PART_API:SegmentedControlItem:end -->

### `SegmentedControlIndicator`

<!-- AUTO-GENERATED:PART_API:SegmentedControlIndicator:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SegmentedControlIndicator:end -->

### `SegmentedControlItemInput`

<!-- AUTO-GENERATED:PART_API:SegmentedControlItemInput:start -->
Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:SegmentedControlItemInput:end -->

## Types

- `SegmentedControlProps`
- `SegmentedControlItemProps`
- `SegmentedControlIndicatorProps`
- `SegmentedControlItemInputProps`
- `SegmentedControlSize`
- `SegmentedControlVariant`

## State Model

- `SegmentedControl` can be uncontrolled through `defaultValue` or controlled through `value` and `onChangeValue`.
- `onChange` of `SegmentedControlItemInput` runs before `onChange` of the root, like a native `change` event bubbling from the radio to the group; `event.stopPropagation()` in it keeps the root's `onChange` from running.
- In uncontrolled mode the native radio group owns the selection: clicks, keyboard, form reset and programmatic `checked` changes all apply without React state.
- `SegmentedControlIndicator` is anchored to the checked segment in CSS, so it follows any of those changes.
- `useSegmentedControlContext` is available for advanced wrappers and custom compositions.
