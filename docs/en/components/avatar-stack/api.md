# AvatarStack API

## Root Props

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root `div` element of the avatar stack. Useful for direct DOM access (e.g., measuring width or attaching listeners). |
| `size` | `AvatarStackSize` | `'md'` | No | Size of all avatar items within the stack. Ensures consistent sizing across all items. |
| `variant` | `AvatarStackVariant` | `'primary'` | No | Variant for all avatars in the stack. Applies a unified visual style (e.g., `primary`, `secondary`). |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `AvatarStackItem`: stack-aware avatar item.

### `AvatarStackItem`

<!-- AUTO-GENERATED:PART_API:AvatarStackItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref forwarded to the root `span` element of the avatar. Enables access to the DOM node, e.g., for focus or measurements. |
| `size` | `AvatarSize` | — | No | Defines the size of the avatar. Affects both the container and any nested content (image, initials, etc.). |
| `variant` | `AvatarVariant` | — | No | Visual variant of the avatar. Can be used to differentiate between roles, types, or contexts. 'primary': Default visual style; 'secondary': Alternate or less prominent style |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:AvatarStackItem:end -->

## Types

- `AvatarStackProps`
- `AvatarStackItemProps`
- `AvatarStackSize`
- `AvatarStackVariant`

## State Model

- `AvatarStack` has no controlled state.
- Size and variant are shared to child avatars through context.
