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

<!-- example: avatar/minimal-composition.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const photo = portrait(210);

export default function MinimalComposition() {
  return (
    <Avatar role='img' aria-label='Jane Doe'>
      <AvatarImage src={photo} alt='' />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
```
<!-- /example -->

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
