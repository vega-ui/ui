# Avatar Anatomy

## Overview

`Avatar` is a [compound component](../../glossary.md#compound-component) because the root, image, fallback, and icon parts cooperate to represent one entity through a prioritized content model.

## Required Parts

### `Avatar`

Required. Owns size and variant styling.

## Optional Parts

### `AvatarImage`

Optional primary image content.

### `AvatarFallback`

Optional text fallback, often initials.

### `AvatarIcon`

Optional icon fallback for generic entity representation.

## Composition Order

1. `Avatar`
2. `AvatarImage`
3. `AvatarFallback` or `AvatarIcon`

## Valid Composition Patterns

```tsx
<Avatar size='sm'>
  <AvatarImage src='/user.png' alt='Jane Doe' />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Invalid Composition Patterns

### Image without any fallback plan

Broken or slow-loading images leave the entity without a stable representation.

### Long fallback text in tiny sizes

The avatar becomes visually unstable and harder to scan.
