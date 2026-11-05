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

### Stack sizes

<!-- example: avatar-stack/small-overlapping-avatars.tsx -->
```tsx
import { AvatarFallback, AvatarStack, AvatarStackItem, Text } from '@vega-ui/react';

const sizes = ['xs', 'sm', 'md', 'lg'];
const people = [
  { name: 'Maria Chen', initials: 'MC' },
  { name: 'Omar Haddad', initials: 'OH' },
  { name: 'Lena Fischer', initials: 'LF' },
];

export default function SmallOverlappingAvatars() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Text size={2} style={{ width: 'var(--spacing-12)', color: 'var(--label-secondary)' }}>{size}</Text>
          <AvatarStack size={size} role='group' aria-label={`Team members, size ${size}`}>
            {people.map((person) => (
              <AvatarStackItem key={person.name} role='img' aria-label={person.name}>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </AvatarStackItem>
            ))}
          </AvatarStack>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- mixing avatar sizes within one stack
- removing the overlap mask without revisiting spacing behavior
