# CalendarBase API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `CalendarBaseVariant` | `'secondary'` | No | Visual variant for the calendar. Propagated through `CalendarBaseContext` and used by nested controls (buttons, labels, etc.) to keep styling consistent. |
| `size` | `CalendarBaseSize` | `'xs'` | No | Global size scale for the calendar. Affects nested controls such as navigation buttons, picker triggers, and week labels via `CalendarBaseContext`. |
| `compact` | `boolean` | — | No | Density flag for more compact layouts. When `true`, the root element receives `data-compact="true"`, allowing styles to reduce paddings, gaps, and control heights for a denser calendar presentation. When `false` or `undefined`, the calendar uses the default spacing. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `CalendarBaseHeader`
- `CalendarBaseWeekLabels`
- `CalendarBaseWeekLabel`
- `CalendarBasePickerButton`
- `CalendarBaseControlIconButton`

### `CalendarBaseHeader`

<!-- AUTO-GENERATED:PART_API:CalendarBaseHeader:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarBaseHeader:end -->

### `CalendarBaseWeekLabel`

<!-- AUTO-GENERATED:PART_API:CalendarBaseWeekLabel:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | No | Visual size of the text, typically mapped to the design system’s type scale. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarBaseWeekLabel:end -->

### `CalendarBaseWeekLabels`

<!-- AUTO-GENERATED:PART_API:CalendarBaseWeekLabels:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarBaseWeekLabels:end -->

### `CalendarBasePickerButton`

<!-- AUTO-GENERATED:PART_API:CalendarBasePickerButton:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `fullWidth` | `boolean` | — | No | When true, the button expands to fill the width with its container. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarBasePickerButton:end -->

### `CalendarBaseControlIconButton`

<!-- AUTO-GENERATED:PART_API:CalendarBaseControlIconButton:start -->
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
<!-- AUTO-GENERATED:PART_API:CalendarBaseControlIconButton:end -->

## Types

- `CalendarBaseProps`
- `CalendarBaseHeaderProps`
- `CalendarBaseWeekLabelsProps`
- `CalendarBaseWeekLabelProps`
- `CalendarBasePickerButtonProps`
- `CalendarBaseControlIconButtonProps`
- `CalendarBaseVariant`
- `CalendarBaseSize`

## State Model

- `CalendarBase` has no date-selection state of its own.
- It only shares visual context for nested calendar-family parts.
