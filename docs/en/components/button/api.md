# Button API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `size` | `ButtonSize` | `'md'` | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `fullWidth` | `boolean` | — | No | When true, the button expands to fill the width with its container. |
| `variant` | `ButtonBaseVariant` | `'primary'` | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | `'fill'` | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |

Also accepts all `<button>` attributes.
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
- `disabled` is not applied with `asChild`, because the child element owns its semantics. A disabled link is an `<a>` without `href`; add `aria-disabled="true"` to get the disabled styling and announcement.
