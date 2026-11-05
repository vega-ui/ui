# SnapScroller Styling

## Overview

`SnapScroller` styling is mostly structural: scroll container layout, snap behavior, and hidden scrollbar treatment. `SnapScrollerContent` adds snap alignment and shrink behavior.

## Public CSS Variables

There are no component-local CSS variables in the current implementation.

## Part-Level Variables

### Root

The root uses flex layout, `scroll-snap-type: x mandatory`, smooth scrolling, and hidden scrollbars.

### Content

Each content item uses `scroll-snap-align: start`, `scroll-snap-stop: always`, and `flex-shrink: 0`.

## State And Variant Interaction

- There are no built-in visual variants.
- Layout behavior depends on container width, gap, and each content item’s width.

## Examples

### Peek at the next card

Cards are narrower than the viewport so the next one peeks in. `paddingInline` on the scroller insets the row, and the matching `scrollPaddingInline` keeps snapping aligned to that inset; the snap hook reads scroll padding, so the committed index stays correct.

<!-- example: snap-scroller/peek-next-card.tsx -->
```tsx
import { Heading, SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const articles = [
  { title: 'Migrating to v3', minutes: 6 },
  { title: 'Theming with tokens', minutes: 4 },
  { title: 'Building a date range form', minutes: 9 },
  { title: 'Testing overlays in the browser', minutes: 7 },
];

const cardStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: 'calc(100% - var(--spacing-32))',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function PeekNextCard() {
  return (
    <SnapScroller
      tabIndex={0}
      aria-label='Guides'
      style={{
        width: '100%',
        gap: 'var(--spacing-6)',
        paddingInline: 'var(--spacing-8)',
        scrollPaddingInline: 'var(--spacing-8)',
        boxSizing: 'border-box',
      }}
    >
      {articles.map((article, index) => (
        <SnapScrollerContent key={article.title} index={index} style={cardStyle}>
          <Heading as='h3' size={4}>{article.title}</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>{article.minutes} min read</Text>
        </SnapScrollerContent>
      ))}
    </SnapScroller>
  );
}
```
<!-- /example -->

## Do Not Override

- changing snap alignment casually without revalidating navigation behavior
- relying on unstable item widths if precise snapping is required
