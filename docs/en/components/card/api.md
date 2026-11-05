# Card API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `CardSize` | `'md'` | No | Specifies the size of the card. Affects padding, font size, and possibly layout behavior. |
| `appearance` | `CardAppearance` | `'outline'` | No | Defines the visual style of the card's surface. Controls background and border visibility. |
| `ref` | `Ref<HTMLElement>` | — | No | Ref forwarded to the card’s root element (`<article>`, or the child element with `asChild`). Useful for DOM measurements, scrolling, or imperative logic. |
| `asChild` | `boolean` | — | No | If true, renders the trigger as a child element using `Slot`. This enables custom wrappers (e.g., `<a>`, `<div>`) to inherit behavior. |

Also accepts all HTML attributes.
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
