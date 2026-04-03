# Button API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `—` | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). |
| `size` | `ButtonSize` | `'md'` | No | Defines the size of the button. |
| `fullWidth` | `boolean` | `—` | No | When true, the button expands to fill the width with its container. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

`Button` does not expose public child parts.

## Types

- `ButtonProps`
- `ButtonSize`

## State Model

- `Button` is mostly stateless from the component API perspective.
- Disabled, loading, and visual state are usually driven by the consumer.
- `asChild` changes rendering semantics while preserving VegaUI button styling.
