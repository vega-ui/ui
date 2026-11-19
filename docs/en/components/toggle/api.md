# Toggle API

## Root Props

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `pressed` | `boolean` | — | No | Whether the toggle is pressed. Enables controlled mode when set. |
| `defaultPressed` | `boolean` | — | No | Whether the toggle is pressed on mount. |
| `onChangePressed` | `(pressed: boolean) => void` | — | No | Called when a click, Enter or Space presses or releases the toggle. |
| `asChild` | `boolean` | — | No | Renders the only child element as the toggle instead of a Button, like a link. |
| `disabled` | `boolean` | — | No | Disables the toggle, also the child element with `asChild`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |
| `square` | `false` | — | No | Makes the button a square as wide as it is high, for a single icon. Name it with `aria-label` or `aria-labelledby`. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

`Toggle` has no child parts. The items of a [ToggleGroup](../toggle-group/api.md#child-parts) are `ToggleGroupToggle`, a part of the group.

## Types

- `ToggleProps`
- `ButtonSize`, the type of `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`

## State Model

- Uncontrolled: `defaultPressed` sets the state on mount, and the toggle keeps it.
- Controlled: `pressed` sets the state, and `onChangePressed` reports the state a click, Enter or Space asks for. Without an update from the parent, the toggle stays as `pressed` says.
- `aria-pressed` and `data-pressed` mark the state.
- `variant` and `appearance` stay `secondary` and `transparent`; the pressed look is CSS on `[data-pressed='true']`.

## Integration Notes

- Without `asChild` it is `type="button"`, so it never submits a form. With `asChild` it passes `type="button"` to the child too, unless the child sets its own `type`.
- The `onClick` of the toggle runs on every click, Enter and Space as on any button; read the new state from `onChangePressed`, not from `onClick`.
- Inside a [Toolbar](../toolbar/), the toggle goes inside `ToolbarItem` with `asChild`.
- The toggle is a button, not an input: a form does not submit its state. Keep it in state and send it yourself, or use [Switch](../switch/) or [Checkbox](../checkbox/) for a form value.
- `@vega-ui/widgets/toggle` exports `toggleWidget`, the framework-free behavior of the toggle.
