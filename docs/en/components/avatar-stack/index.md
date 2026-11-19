# AvatarStack

## Doc Profile

`compound`

## Summary

`AvatarStack` is a [compound component](../../glossary.md#compound-component) for overlapping avatar groups such as participants, reviewers, and team previews. The root shares size and variant with each stacked avatar item and turns several identities into one compact grouped display.

## Imports

```tsx
import {
  AvatarStack,
  AvatarStackItem,
  type AvatarStackProps,
  type AvatarStackSize,
  type AvatarStackItemProps,
  type AvatarStackVariant,
} from '@vega-ui/react';
```

## Exported Types

- `AvatarStackProps`
- `AvatarStackItemProps`
- `AvatarStackSize`
- `AvatarStackVariant`

## Minimal Composition

<!-- example: avatar-stack/minimal-composition.tsx -->
```tsx
import { AvatarFallback, AvatarImage, AvatarStack, AvatarStackItem } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

export default function MinimalComposition() {
  return (
    <AvatarStack role='group' aria-label='Project members'>
      <AvatarStackItem role='img' aria-label='Maria Chen'>
        <AvatarImage src={portrait(210)} alt='' />
        <AvatarFallback>MC</AvatarFallback>
      </AvatarStackItem>
      <AvatarStackItem role='img' aria-label='Omar Haddad'>
        <AvatarFallback>OH</AvatarFallback>
      </AvatarStackItem>
    </AvatarStack>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyAvatarStackItem` passes its props to `AvatarStackItem`, names it with `name`, shows the image from `src` and the initials of `name` behind it, and the person icon when there is no name. See [Component recipes](../../recipes.md).

<!-- example: avatar-stack/recipe.tsx -->
```tsx
import {
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
  AvatarStack,
  AvatarStackItem,
  Text,
  type AvatarStackItemProps,
} from '@vega-ui/react';
import { UserIcon } from '@vega-ui/icons';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter((word) => word !== '');
  if (words.length === 0) return '';
  if (words.length === 1) return Array.from(words[0]).slice(0, 2).join('').toLocaleUpperCase();
  const first = Array.from(words[0])[0];
  const last = Array.from(words[words.length - 1])[0];
  return `${first}${last}`.toLocaleUpperCase();
}

interface MyAvatarStackItemProps extends AvatarStackItemProps {
  src?: string
  name?: string
}

export function MyAvatarStackItem({ src, name, ...props }: MyAvatarStackItemProps) {
  const initials = getInitials(name ?? '');

  return (
    <AvatarStackItem role='img' aria-label={name} {...props}>
      {src && <AvatarImage src={src} alt='' />}
      {initials === '' && <AvatarIcon><UserIcon /></AvatarIcon>}
      {initials !== '' && <AvatarFallback>{initials}</AvatarFallback>}
    </AvatarStackItem>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Editors</Text>
      <AvatarStack size='sm' role='group' aria-label='Document editors'>
        <MyAvatarStackItem src={portrait(210)} name='Maria Chen' />
        <MyAvatarStackItem src={portrait(28)} name='Omar Haddad' />
        <MyAvatarStackItem name='Lena Fischer' />
        <MyAvatarStackItem variant='secondary' aria-label='Anonymous viewer' />
      </AvatarStack>
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `AvatarStack`: root layout and shared size/variant context
- `AvatarStackItem`: one stacked avatar item

## Optional Parts

- custom `AvatarImage` and `AvatarFallback` content inside each item

## Composition Order

1. `AvatarStack`
2. repeated `AvatarStackItem`
3. avatar content inside each item

## Variants

- Size: shared avatar size from `2xs` through `2xl`
- Variant: `primary` or `secondary`
- Content: image avatars, fallback avatars, or mixed groups

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Very large groups usually need truncation or a `+N` summary pattern at the product level.
- Mixing incompatible avatar sizes in one stack breaks the overlap effect.
- Hover expansion changes spacing subtly and should be checked in dense layouts.
- If explicit identity, roles, or ordering matter more than compactness, a text list or roster UI is usually clearer than a stack.

## Common Mistakes

- Rendering plain avatars without `AvatarStackItem`.
- Mixing arbitrary non-avatar children into the stack.
- Showing too many items without a summarizing pattern.
