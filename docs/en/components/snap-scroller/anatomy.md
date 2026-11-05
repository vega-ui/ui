# SnapScroller Anatomy

## Overview

`SnapScroller` is a snap-aware scroll container that registers child items by index and uses the scroll-snap hook to derive pending and committed snap positions.

## Required Parts

### `SnapScroller`

Required. Owns the scroll container, snap detection, imperative API, and item registry.

### `SnapScrollerContent`

Required in normal composition. Represents one snap-aligned item and registers its index with the root.

## Optional Parts

### `apiRef`

Optional imperative surface for `prev()`, `next()`, keyed scrolling, and measuring.

## Composition Order

1. `SnapScroller`
2. repeated `SnapScrollerContent index={...}`

## Valid Composition Patterns

Every direct child is a `SnapScrollerContent` with a consecutive `index`. With `asChild` the item renders your own element, here a `<figure>` with a caption, and still registers as a snap item.

<!-- example: snap-scroller/valid-composition-patterns.tsx -->
```tsx
import { SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const rooms = ['Reception', 'Meeting room', 'Quiet zone', 'Kitchen'];

const figureStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: '100%',
  margin: 0,
};

const photoStyle: CSSProperties = {
  height: 120,
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function ValidCompositionPatterns() {
  return (
    <SnapScroller tabIndex={0} aria-label='Office photos' style={{ width: '100%', gap: 'var(--spacing-6)' }}>
      {rooms.map((room, index) => (
        <SnapScrollerContent key={room} index={index} asChild>
          <figure style={figureStyle}>
            <div role='img' aria-label={`${room} photo`} style={photoStyle} />
            <Text asChild size={2} style={{ color: 'var(--label-secondary)' }}>
              <figcaption>{room}</figcaption>
            </Text>
          </figure>
        </SnapScrollerContent>
      ))}
    </SnapScroller>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Content without stable indexes

The snap system cannot derive consistent keys.

### Child order changing while external code still assumes old indexes

Imperative navigation and highlighted state drift apart.

### Treating `SnapScrollerContent` as arbitrary non-page layout

The component is page-oriented, not a generic overflow row.
