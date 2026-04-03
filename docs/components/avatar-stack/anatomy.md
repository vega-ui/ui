# AvatarStack Anatomy

## Overview

`AvatarStack` shares size and variant context with a sequence of `AvatarStackItem` children. Each item is still a real `Avatar`, but the stack-specific overlap behavior comes from the item class.

## Required Parts

### `AvatarStack`

Required. Owns layout direction and shared avatar context.

### `AvatarStackItem`

Required in normal composition. Wraps each avatar and applies stacking/overlap behavior.

## Optional Parts

### `AvatarImage` / `AvatarFallback`

Optional avatar internals depending on whether an image is available.

## Composition Order

1. `AvatarStack`
2. repeated `AvatarStackItem`
3. avatar image/fallback content

## Valid Composition Patterns

```tsx
<AvatarStack>
  <AvatarStackItem>
    <AvatarImage src='/user-1.png' alt='Alice' />
    <AvatarFallback>AL</AvatarFallback>
  </AvatarStackItem>
  <AvatarStackItem>
    <AvatarFallback>BK</AvatarFallback>
  </AvatarStackItem>
</AvatarStack>
```

## Invalid Composition Patterns

### Avatars rendered directly without `AvatarStackItem`

The group loses overlap and shared context behavior.

### Mixed arbitrary child markup

The stack should remain a consistent avatar-only structure.

### Inconsistent avatar sizes in one stack

Overlap masks and hover behavior become visually unstable.
