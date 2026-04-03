# ButtonBase API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `variant` | `ButtonBaseVariant` | `'primary'` | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | `'fill'` | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | `—` | No | Disables the button when true. |
| `className` | `string` | `—` | No | custom CSS class for the button element. |
| `asChild` | `boolean` | `—` | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). |
| `children` | `ReactNode` | `—` | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | `—` | No | Ref forwarded to the native `<button>` element. |
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
