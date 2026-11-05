# Badge API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `BadgeVariant` | `'success'` | No | Semantic color style of the badge. Indicates the meaning or status represented by the badge. 'success': For positive/confirmed status; 'error': For error/negative status; 'warning': For cautionary/in-progress status; 'info': For neutral/informational status |
| `appearance` | `BadgeAppearance` | `'ghost'` | No | Visual appearance of the badge. Defines how the badge is styled (background, border, etc.). |
| `size` | `BadgeSize` | `'md'` | No | Size of the badge. Affects padding, font size, and overall dimensions. |

Also accepts `ref` and all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

`Badge` does not expose public child parts.

## Types

- `BadgeProps`
- `BadgeSize`
- `BadgeAppearance`
- `BadgeVariant`

## State Model

- `Badge` is stateless from the component API perspective.
- Consumer state usually drives which variant or text is shown.
