# IconButton API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `size` | `IconButtonSize` | `'md'` | No | Size of the button container. |
| `asChild` | `boolean` | `—` | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

`IconButton` does not expose public child parts.

## Types

- `IconButtonProps`
- `IconButtonSize`

## State Model

- `IconButton` is mostly stateless from the component API perspective.
- Disabled and icon-state behavior are usually driven by the consumer.
- Accessible naming is the consumer’s responsibility because visible text is absent.
