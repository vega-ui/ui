# Spinner API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `SpinnerSize` | `3` | No | Visual size of the spinner. Maps to a scalable design token or type scale. Accepts values from 1 (smallest) to 11 (largest). |
| `variant` | `SpinnerVariant` | `'primary'` | No | Visual color variant of the spinner. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the spinner's root container. Useful for imperative DOM access or measurement. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `Spinner` is a single exported primitive.

## Types

- `SpinnerProps`
- `SpinnerSize`
- `SpinnerVariant`

## State Model

- `Spinner` has no internal state beyond its perpetual animation.
- Meaning comes from surrounding loading state in the parent UI.
