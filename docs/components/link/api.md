# Link API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `—` | No | Renders the link as a child component using a `Slot` (e.g., Radix UI `asChild`). |
| `ref` | `Ref<HTMLAnchorElement>` | `—` | No | Ref to the underlying anchor (`<a>`) element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

`Link` does not expose public child parts.

## Types

- `LinkProps`

## State Model

- `Link` is stateless from the component API perspective.
- `asChild` lets the consumer preserve link styling while delegating rendering to another link-like component.
