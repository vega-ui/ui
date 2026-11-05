# Heading API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `as` | `HeadingAs` | — | No | The HTML heading tag to render (e.g., 'h1', 'h2'). Defines semantic structure and accessibility level. |
| `size` | `HeadingSize` | — | No | Visual size of the heading, independent of the `as` tag. Typically mapped to a design system's type scale. Accepts values from 1 (smallest) to 11 (largest). |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight of the heading text. 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLHeadingElement>` | — | No | Ref to the native HTML heading element. Useful for DOM access or focus management. |

Also accepts all `<h1>–<h6>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `Heading` is a single exported primitive.

## Types

- `HeadingProps`
- `HeadingAs`
- `HeadingSize`

## State Model

- `Heading` has no controlled state.
- Semantics come from `as`; visuals come from `size` and `fontWeight`.
