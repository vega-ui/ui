# Label API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `LabelSize` | `'md'` | No | Visual size of the label text. Typically maps to type scale values in a design system. |
| `htmlFor` | `string` | — | No | Associates the label with an input by its `id`. Enables native focus and screen reader linking. |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | `500` | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |

Also accepts all `<label>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `Label` is a single exported primitive.

## Types

- `LabelProps`

## State Model

- `Label` has no controlled state.
- Click behavior is delegated to native label semantics and the associated control.
