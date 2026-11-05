# NumberField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `number` | — | No | Controlled value. `NaN` means the field is empty. |
| `defaultValue` | `number` | `NaN` | No | Initial value for uncontrolled usage. Defaults to `NaN`, an empty field. |
| `onChangeValue` | `(value: number) => void` | — | No | Called with the number when it changes, `NaN` when the field is emptied. |
| `step` | `number` | `1` | No | Amount to increment or decrement the value by when using arrow keys or spinner controls. |
| `min` | `number` | `Number.MIN_SAFE_INTEGER` | No | Minimum allowed value for the input. Enforced both via HTML attributes and internal logic. |
| `max` | `number` | `Number.MAX_SAFE_INTEGER` | No | Maximum allowed value for the input. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the element. |
| `precision` | `number` | `0` | No | Number of decimal places to round the input value to. Useful for financial or scientific precision. |
| `changeOnWheel` | `boolean` | `true` | No | Enables changing the value with the mouse wheel when focused. |
| `allowEmpty` | `boolean` | `true` | No | Allows the field to be empty (null/undefined) instead of defaulting to 0. Useful for optional numeric inputs. |
| `maximumFractionDigits` | `number` | `2` | No | Maximum number of digits allowed after the decimal point. This property controls numeric precision when the value is entered or adjusted via increment/decrement actions. It is commonly used for currency values, measurements, or ratings where fractional precision must be constrained. Example: `maximumFractionDigits={0}` → integers only; `maximumFractionDigits={2}` → up to two decimal places |
| `disabled` | `boolean` | — | No | Disables the entire NumberField. |
| `size` | `TextFieldSize` | `'md'` | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `error` | `boolean` | — | No | Shows the input in an error state. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `NumberFieldInput`: numeric input bound to context.
- `NumberFieldIncrementButton`: increment control.
- `NumberFieldDecrementButton`: decrement control.

### `NumberFieldDecrementButton`

<!-- AUTO-GENERATED:PART_API:NumberFieldDecrementButton:start -->
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
<!-- AUTO-GENERATED:PART_API:NumberFieldDecrementButton:end -->

### `NumberFieldIncrementButton`

<!-- AUTO-GENERATED:PART_API:NumberFieldIncrementButton:start -->
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
<!-- AUTO-GENERATED:PART_API:NumberFieldIncrementButton:end -->

### `NumberFieldInput`

<!-- AUTO-GENERATED:PART_API:NumberFieldInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:NumberFieldInput:end -->

## Types

- `NumberFieldProps`
- `NumberFieldInputProps`
- `NumberFieldIncrementProps`
- `NumberFieldDecrementProps`
- `NumberFieldSize`

## State Model

- The root tracks whether the current value is at min or max.
- Arrow keys and optional wheel events step the value through root logic. Like `<input type="number">`, the wheel steps only the focused field; without focus it scrolls the page.
- A step keeps the decimals of the value and of `step` (`0.7` + `0.1` gives `0.8`).
- A root `onKeyDown` runs after the built-in arrow handling and does not replace it.
- The root takes `value`, `defaultValue` and `onChangeValue` as a number, `NaN` for an empty field; `NumberFieldInput` shows the formatted text and still fires its own `onChange` and `onInput`. A form reset restores `defaultValue` unless the field is controlled.
