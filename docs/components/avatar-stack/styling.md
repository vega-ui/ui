# AvatarStack Styling

## Overview

`AvatarStack` styling is intentionally small. The root only establishes horizontal layout, and the overlap effect is driven by `AvatarStackItem` mask and margin behavior.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--avatar-size` | item overlap math | base size for overlap and hover spread |
| `--avatar-stack-item-gap` | item overlap math | inner overlap offset |

## Part-Level Variables

### Root

The root uses `display: flex`.

### Item

Non-first items compute a radial mask from `--avatar-size`, creating the overlap cutout. Hover temporarily removes the mask and adds inline margin.

## State And Variant Interaction

- size comes from shared avatar context
- hover affects overlap spacing for the hovered item and its neighbor
- variant is inherited from the avatar context rather than stack-specific CSS

## Examples

### Small overlapping avatars

```tsx
<AvatarStack size='sm'>
  <AvatarStackItem><AvatarFallback>AL</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>BK</AvatarFallback></AvatarStackItem>
</AvatarStack>
```

## Do Not Override

- mixing avatar sizes within one stack
- removing the overlap mask without revisiting spacing behavior
