# Avatar API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root `div` element of the avatar. Enables access to the DOM node, e.g., for focus or measurements. |
| `size` | `AvatarSize` | `'md'` | No | Defines the size of the avatar. Affects both the container and any nested content (image, initials, etc.). |
| `variant` | `AvatarVariant` | `'primary'` | No | Visual variant of the avatar. Can be used to differentiate between roles, types, or contexts. 'primary': Default visual style; 'secondary': Alternate or less prominent style |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `AvatarImage`: image content.
- `AvatarFallback`: text fallback.
- `AvatarIcon`: icon fallback.

### `AvatarIcon`

<!-- AUTO-GENERATED:PART_API:AvatarIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:AvatarIcon:end -->

### `AvatarFallback`

<!-- AUTO-GENERATED:PART_API:AvatarFallback:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | No | Visual size of the text, typically mapped to the design system’s type scale. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:AvatarFallback:end -->

### `AvatarImage`

<!-- AUTO-GENERATED:PART_API:AvatarImage:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLImageElement>` | — | No | Ref to the native `<img>` element. Useful for direct DOM access, loading state tracking, or animations. |
| `fallbackSrc` | `string` | — | No | URL of the fallback image to display if the main image fails to load. This allows graceful degradation of the avatar when the primary source is unavailable. |

Also accepts all `<img>` attributes.
<!-- AUTO-GENERATED:PART_API:AvatarImage:end -->

## Types

- `AvatarProps`
- `AvatarImageProps`
- `AvatarFallbackProps`
- `AvatarIconProps`
- `AvatarSize`
- `AvatarVariant`

## State Model

- `Avatar` is stateless from the component API perspective.
- Consumer content determines whether image, fallback, or icon is shown.
