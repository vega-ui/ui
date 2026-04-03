# Avatar

## Doc Profile

`advanced interactive`

## Summary

`Avatar` renders a user or entity representation with support for image, fallback, and icon content. It is the identity-display primitive for one person or entity, not a generic decorative circle.

## Imports

```tsx
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarIcon,
  type AvatarProps,
  type AvatarSize,
  type AvatarVariant,
} from '@vega-ui/react';
```

## Exported Types

- `AvatarProps`
- `AvatarImageProps`
- `AvatarFallbackProps`
- `AvatarIconProps`
- `AvatarSize`
- `AvatarVariant`

## Minimal Composition

```tsx
<Avatar size='md'>
  <AvatarImage src='/user.png' alt='Jane Doe' />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Required Parts

- `Avatar`: root surface

## Optional Parts

- `AvatarImage`: image content
- `AvatarFallback`: text fallback
- `AvatarIcon`: icon fallback

## Composition Order

1. `Avatar`
2. `AvatarImage`
3. `AvatarFallback` or `AvatarIcon`

## Variants

- Sizes: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Variants: `primary`, `secondary`
- Content variants: image, fallback initials, icon

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Always provide meaningful `alt` text for informative avatar images.
- Include fallback content for missing or slow-loading images.
- Very small sizes need short fallback text to avoid overflow.
- Decide explicitly whether the avatar is informative identity content or purely decorative context in each usage.

## Common Mistakes

- Rendering an avatar image without fallback.
- Using decorative avatars without deciding whether they should be announced.
- Letting fallback initials overflow in small sizes.
