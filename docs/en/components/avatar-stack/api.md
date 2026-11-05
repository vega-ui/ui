# AvatarStack API

## Root Props

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root `div` element of the avatar group. Useful for direct DOM access (e.g., measuring width or attaching listeners). |
| `size` | `AvatarGroupSize` | `'md'` | No | Size of all avatar items within the group. Ensures consistent sizing across all items. |
| `variant` | `AvatarGroupVariant` | `'primary'` | No | Variant for all avatars in the group. Applies a unified visual style (e.g., `primary`, `secondary`). |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `AvatarStackItem`: stack-aware avatar item.

### `AvatarStackItem`

<!-- AUTO-GENERATED:PART_API:AvatarStackItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root `div` element of the avatar. Enables access to the DOM node, e.g., for focus or measurements. |
| `size` | `AvatarSize` | — | No | Defines the size of the avatar. Affects both the container and any nested content (image, initials, etc.). |
| `variant` | `AvatarVariant` | — | No | Visual variant of the avatar. Can be used to differentiate between roles, types, or contexts. 'primary': Default visual style; 'secondary': Alternate or less prominent style |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:AvatarStackItem:end -->

## Types

- `AvatarGroupProps`
- `AvatarGroupStackItemProps`
- `AvatarGroupSize`
- `AvatarGroupVariant`

## State Model

- `AvatarStack` has no controlled state.
- Size and variant are shared to child avatars through context.
