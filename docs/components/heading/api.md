# Heading API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `as` | `HeadingAs` | `—` | No | HTML heading tag to render (e.g., 'h1', 'h2'). |
| `size` | `HeadingSize` | `—` | No | Visual size of the heading, independent of the `as` tag. |
| `fontWeight` | `400 \\| 500 \\| 600 \\| 700 \\| 900` | `—` | No | Font weight of the heading text. |
| `ref` | `Ref<HTMLHeadingElement>` | `—` | No | Ref to the native HTML heading element. |
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
