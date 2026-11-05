# Code API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | No | Defines the font size of the code element. Inherits from the typography system’s `TextSize` type. |
| `ref` | `Ref<HTMLElement>` | — | No | Ref forwarded to the native `<code>` HTML element. Enables direct access for focus, measurement, or custom logic. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `Code` is a single exported primitive.

## Types

- `CodeProps`

## State Model

- `Code` has no controlled state.
- Visual presentation is static unless parent content or styles change.
