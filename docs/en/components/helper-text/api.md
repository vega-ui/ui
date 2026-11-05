# HelperText API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `HelperTextSize` | `'md'` | No | Visual size of the helper text. Adjusts font size and spacing relative to form element size. |
| `error` | `boolean` | — | No | Displays the helper text in an error state. Changes color to red. |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `HelperText` is a single exported primitive.

## Types

- `HelperTextProps`

## State Model

- `HelperText` has no controlled state.
- `error` is a visual semantic toggle, not validation logic by itself.
