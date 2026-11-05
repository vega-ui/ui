# SegmentedControl API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | No | Disables all segments, preventing user interaction. |
| `size` | `SegmentedControlSize` | `'md'` | No | Visual size of the segmented control. |
| `variant` | `SegmentedControlVariant` | `'secondary'` | No | Visual style variant of the segmented control. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root container element. Useful for measuring or controlling focus. |
| `value` | `SegmentedControlValue` | — | No | The currently selected value of the segmented control |
| `defaultValue` | `SegmentedControlValue` | `''` | No | The initial selected value when the component is used in an uncontrolled mode |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | — | No | Fired when the selected segment changes. This event mirrors the native `change` event of a radio input and can be used to integrate with forms or listen for user selection. The event target is the underlying hidden `<input type="radio">`. |
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

- `SegmentedControl` can be uncontrolled through `defaultValue` or controlled through `value` and `onChange`.
- In uncontrolled mode the native radio group owns the selection: clicks, keyboard, form reset and programmatic `checked` changes all apply without React state.
- `SegmentedControlIndicator` is anchored to the checked segment in CSS, so it follows any of those changes.
- `useSegmentedControlContext` is available for advanced wrappers and custom compositions.
