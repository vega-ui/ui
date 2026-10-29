# Card API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `size` | `CardSize` | `'md'` | No | Specifies the size of the card. |
| `appearance` | `CardAppearance` | `'outline'` | No | Defines the visual style of the card's surface. |
| `ref` | `Ref<HTMLElement>` | `—` | No | Ref forwarded to the card’s root element (`<article>`, or the child element with `asChild`). |
| `asChild` | `boolean` | `—` | No | renders the trigger as a child element using `Slot`. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

`Card` does not expose public child parts.

## Types

- `CardProps`
- `CardSize`
- `CardAppearance`

## State Model

- `Card` is stateless from the component API perspective.
- Consumer content and layout determine most of the semantic meaning inside the surface.
