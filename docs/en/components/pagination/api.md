# Pagination API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLUListElement>` | — | No | Ref forwarded to the underlying list element. |
| `size` | `PaginationSize` | `'md'` | No | Visual size of the pagination items, inherited from IconButtonProps. Controls padding, font size, or spacing according to the design system scale. |
| `variant` | `PaginationVariant` | `'primary'` | No | Visual variant of the component. Inherits available values from `IconButtonProps['variant']`, such as 'primary' or 'secondary'. Controls the visual style (color, background, border) according to the design system. |

Also accepts all `<ul>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PaginationItem`: page number item.
- `PaginationTriggerIconButton`: previous/next or jump controls.
- `PaginationEllipsis`: visual gap item.
- `PaginationListItem`: list wrapper.
- `PaginationText`: compact textual status.

### `PaginationItem`

<!-- AUTO-GENERATED:PART_API:PaginationItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `current` | `boolean` | — | No | Marks this item as the currently active page. Applies visual emphasis. |
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
<!-- AUTO-GENERATED:PART_API:PaginationItem:end -->

### `PaginationTriggerIconButton`

<!-- AUTO-GENERATED:PART_API:PaginationTriggerIconButton:start -->
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
<!-- AUTO-GENERATED:PART_API:PaginationTriggerIconButton:end -->

### `PaginationEllipsis`

<!-- AUTO-GENERATED:PART_API:PaginationEllipsis:start -->
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
<!-- AUTO-GENERATED:PART_API:PaginationEllipsis:end -->

### `PaginationListItem`

<!-- AUTO-GENERATED:PART_API:PaginationListItem:start -->
Also accepts all `<li>` attributes.
<!-- AUTO-GENERATED:PART_API:PaginationListItem:end -->

### `PaginationText`

<!-- AUTO-GENERATED:PART_API:PaginationText:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `PaginationVariant` | — | No | Visual style variant of the text. |
| `size` | `TextSize` | — | No | Visual size of the text, typically mapped to the design system’s type scale. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | `500` | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:PaginationText:end -->

## Types

- `PaginationProps`
- `PaginationItemProps`
- `PaginationTriggerIconButtonProps`
- `PaginationEllipsisProps`
- `PaginationListItemProps`
- `PaginationTextProps`
- `PaginationSize`
- `PaginationVariant`

## State Model

- The root only provides shared style context.
- Current page, disabled boundaries, and routing behavior are owned by the parent feature.
- `PaginationItem current` sets `aria-current='page'`.
