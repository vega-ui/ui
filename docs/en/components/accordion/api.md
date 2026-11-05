# Accordion API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `className` | `string` | — | No | Optional custom CSS class to apply to the accordion wrapper. Useful for styling overrides or scoped custom styling. |
| `size` | `AccordionSize` | `'md'` | No | Defines the size of the accordion. Affects padding and font size. |
| `children` | `ReactElement<AccordionItemProps> \| ReactElement<AccordionItemProps>[]` | — | No | Accordion items to render. Should be one or more `<AccordionItem>` components. Accepts a single element or an array of elements. |
| `opened` | `string[]` | — | No | IDs of currently open items. Enables controlled mode when set. |
| `onChangeOpened` | `(opened?: string[]) => void` | — | No | Called when open item IDs change. |
| `defaultOpened` | `string[]` | `[]` | No | An array of item `id's that should be open by default when the accordion mounts. |
| `multiple` | `boolean` | `false` | No | Allows multiple accordion items to be open at the same time. If `false`, only one item can be open at once (classic accordion behavior). |

Also accepts all `<ul>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `AccordionItem`: one expandable item with a stable `value`.
- `AccordionHeader`: semantic header wrapper for each item.
- `AccordionTrigger`: toggle button for the item.
- `AccordionContent`: expandable content region.
- `AccordionIcon`: optional visual state indicator.

### `AccordionItem`

<!-- AUTO-GENERATED:PART_API:AccordionItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | — | No | Controls whether the accordion item is open (expanded). If provided, the component becomes controlled. |
| `onChangeOpen` | `(value: string, state: boolean) => void` | — | No | Callback triggered when the open state changes. |
| `value` | `string` | — | Yes | Unique identifier for this accordion item. Used for managing open state within the accordion group. |
| `size` | `AccordionSize` | — | No | Controls the size of the trigger and affects typography and spacing. Falls back to context value if not provided. |
| `contentId` | `string` | — | No | ID of the collapsible content element. Used to: link trigger and content via accessibility attributes (`aria-controls`); expose the expanded region to assistive technologies; provide a stable identifier for testing and DOM querying. If not provided, an ID generated internally. |

Also accepts all `<li>` attributes.
<!-- AUTO-GENERATED:PART_API:AccordionItem:end -->

### `AccordionTrigger`

<!-- AUTO-GENERATED:PART_API:AccordionTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | If true, renders the trigger as a child component using `Slot` (e.g. `<a>` or `<div>`). This allows custom semantics or styling while preserving collapsible behavior. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native trigger element (typically a button). |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:AccordionTrigger:end -->

### `AccordionContent`

<!-- AUTO-GENERATED:PART_API:AccordionContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root content div element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:AccordionContent:end -->

### `AccordionHeader`

<!-- AUTO-GENERATED:PART_API:AccordionHeader:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `as` | `HeadingAs` | — | No | The HTML heading tag to render (e.g., 'h1', 'h2'). Defines semantic structure and accessibility level. |
| `size` | `HeadingSize` | — | No | Visual size of the heading, independent of the `as` tag. Typically mapped to a design system's type scale. Accepts values from 1 (smallest) to 11 (largest). |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight of the heading text. 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLHeadingElement>` | — | No | Ref to the native HTML heading element. Useful for DOM access or focus management. |

Also accepts all `<h1>–<h6>` attributes.
<!-- AUTO-GENERATED:PART_API:AccordionHeader:end -->

### `AccordionIcon`

<!-- AUTO-GENERATED:PART_API:AccordionIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:AccordionIcon:end -->

## Types

- `AccordionProps`
- `AccordionItemProps`
- `AccordionHeaderProps`
- `AccordionTriggerProps`
- `AccordionContentProps`
- `AccordionIconProps`

## State Model

- `Accordion` can be uncontrolled through `defaultOpened` or [controlled](../../glossary.md#controlled) through `opened` and `onChangeOpened`.
- `multiple={false}` behaves like a classic accordion where opening one item closes the others.
- `multiple={true}` allows the root to behave like a grouped disclosure surface.
- `useAccordionContext` and `useAccordionItemContext` are available for advanced wrappers and custom compositions.
