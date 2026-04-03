# AvatarStack API

## Root Props

| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `size` | `AvatarGroupSize` | `md` | no | Shared size for stacked avatars. |
| `variant` | `AvatarGroupVariant` | `primary` | no | Shared avatar variant. |
| div props | `HTMLAttributes<HTMLDivElement>` | - | no | Layout props for the stack root. |

## Child Parts

- `AvatarStackItem`: stack-aware avatar item.

## Types

- `AvatarGroupProps`
- `AvatarGroupStackItemProps`
- `AvatarGroupSize`
- `AvatarGroupVariant`

## State Model

- `AvatarStack` has no controlled state.
- Size and variant are shared to child avatars through context.
