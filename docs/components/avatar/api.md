# Avatar API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref forwarded to the root `div` element of the avatar. |
| `size` | `AvatarSize` | `'md'` | No | Defines the size of the avatar. |
| `variant` | `AvatarVariant` | `'primary'` | No | Visual variant of the avatar. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `AvatarImage`: image content.
- `AvatarFallback`: text fallback.
- `AvatarIcon`: icon fallback.

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
