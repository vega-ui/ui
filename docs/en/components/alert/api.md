# Alert API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `AlertVariant` | `'info'` | No | Visual style of the alert. Determines background color, border, and icon style. 'success': Indicates a positive or successful action; 'error': Indicates an error or failure; 'warning': Indicates a caution or risk; 'info': Neutral informational message |
| `appearance` | `AlertAppearance` | `'fill'` | No | Visual appearance of the badge. Defines how the badge is styled (background, border, etc.). |

Also accepts `ref` and all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `AlertIcon`: semantic icon slot.
- `AlertMain`: main text wrapper.
- `AlertTitle`: optional title text.
- `AlertContent`: supporting message text.

### `AlertIcon`

<!-- AUTO-GENERATED:PART_API:AlertIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:AlertIcon:end -->

### `AlertMain`

<!-- AUTO-GENERATED:PART_API:AlertMain:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:AlertMain:end -->

### `AlertTitle`

<!-- AUTO-GENERATED:PART_API:AlertTitle:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | No | Visual size of the text, typically mapped to the design system’s type scale. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:AlertTitle:end -->

### `AlertContent`

<!-- AUTO-GENERATED:PART_API:AlertContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | No | Visual size of the text, typically mapped to the design system’s type scale. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:AlertContent:end -->

## Types

- `AlertProps`
- `AlertIconProps`
- `AlertMainProps`
- `AlertTitleProps`
- `AlertContentProps`

## State Model

- `Alert` is stateless from the component API perspective.
- Consumer state usually decides whether the alert is rendered, dismissed, or replaced.
- `useAlertContext` is available for advanced wrappers and custom child parts.
