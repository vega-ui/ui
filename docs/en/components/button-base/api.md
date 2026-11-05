# ButtonBase API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `ButtonBaseVariant` | `'primary'` | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | `'fill'` | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

`ButtonBase` has no exported structural child parts.

When `asChild` is enabled, one slotted child element becomes the rendered semantic target.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `ButtonBaseProps` | root prop type | Extends native button attributes. |
| `ButtonBaseVariant` | `'primary' \| 'secondary' \| string` | Visual color family. |
| `ButtonBaseAppearance` | `'fill' \| 'outline' \| 'ghost' \| 'transparent' \| string` | Visual surface style. |

## State Model

- `ButtonBase` has no internal state.
- Visual behavior comes from `variant`, `appearance`, and native states such as `:hover`, `:active`, `:focus-visible`, and `disabled`.
- `asChild` changes the rendered element, not the styling contract.

## Integration Notes

- Set `type='button'` for non-submit actions inside forms.
- Add an explicit accessible name for icon-only content.
- Use `Button` or `IconButton` when product code needs higher-level layout and sizing APIs.
