# PasswordField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | No | Disables the password field. Prevents user input and interaction and applies the disabled visual state. |
| `shown` | `boolean` | — | No | Controls whether the password is shown as plain text. When set, the component becomes controlled. |
| `defaultShown` | `boolean` | `false` | No | Initial visibility for uncontrolled usage. |
| `onChangeShown` | `(shown: boolean) => void` | — | No | Called when the visibility is toggled. |
| `size` | `TextFieldSize` | — | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `error` | `boolean` | — | No | Shows the input in an error state. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to wrapper element Useful for programmatic control, focus, or integration. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PasswordFieldInput`: context-aware password/text input.
- `PasswordFieldToggleIconButton`: button that toggles shown state.
- `PasswordFieldShownIcon`: icon for shown state.
- `PasswordFieldHiddenIcon`: icon for hidden state.

### `PasswordFieldInput`

<!-- AUTO-GENERATED:PART_API:PasswordFieldInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:PasswordFieldInput:end -->

### `PasswordFieldHiddenIcon`

<!-- AUTO-GENERATED:PART_API:PasswordFieldHiddenIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:PasswordFieldHiddenIcon:end -->

### `PasswordFieldShownIcon`

<!-- AUTO-GENERATED:PART_API:PasswordFieldShownIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:PasswordFieldShownIcon:end -->

### `PasswordFieldToggleIconButton`

<!-- AUTO-GENERATED:PART_API:PasswordFieldToggleIconButton:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconButtonSize` | — | No | Size of the button container. Controls padding and overall clickable area. |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:PasswordFieldToggleIconButton:end -->

## Types

- `PasswordFieldProps`
- `PasswordFieldInputProps`
- `PasswordFieldToggleIconButtonProps`
- `PasswordFieldShownIconProps`
- `PasswordFieldHiddenIconProps`

## State Model

- Visibility can be controlled with `shown` and `onChangeShown`, or uncontrolled with `defaultShown`.
- `PasswordFieldInput` switches its `type` based on context.
- The toggle button flips the visibility and keeps the focus where the browser put it, like a native button; it exposes the visibility with `aria-pressed`.
- A custom `onClick` on the toggle runs after the toggle, it does not replace it.
