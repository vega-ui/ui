# SegmentedControl API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | `—` | No | Disables all segments, preventing user interaction. |
| `size` | `SegmentedControlSize` | `'md'` | No | Visual size of the segmented control. |
| `variant` | `SegmentedControlVariant` | `'secondary'` | No | Visual style variant of the segmented control. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref to the root container element. |
| `value` | `SegmentedControlValue` | `—` | No | currently selected value of the segmented control |
| `defaultValue` | `SegmentedControlValue` | `''` | No | initial selected value when the component is used in an uncontrolled mode |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | `—` | No | Fired when the selected segment changes. |
| `name` | `string` | `—` | Yes | name of the underlying radio group. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SegmentedControlItem`: visible selectable segment.
- `SegmentedControlIndicator`: animated selected-state surface.
- `SegmentedControlItemHiddenInput`: native radio input for each item.

## Types

- `SegmentedControlProps`
- `SegmentedControlItemProps`
- `SegmentedControlIndicatorProps`
- `SegmentedControlItemHiddenInputProps`
- `SegmentedControlSize`
- `SegmentedControlVariant`

## State Model

- `SegmentedControl` can be uncontrolled through `defaultValue` or controlled through `value` and `onChange`.
- The root measures item width and offset to position `SegmentedControlIndicator`.
- `useSegmentedControlContext` is available for advanced wrappers and custom compositions.
