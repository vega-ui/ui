# PageControl Anatomy

## Overview

`PageControl` coordinates a short sequence of tab-like indicators. The root owns active index and pointer/keyboard interaction, while child items reflect the current state.

## Required Parts

### `PageControl`

Required. Owns active index and interaction logic.

### `PageControlItem`

Required for normal dot-style indicators.

## Optional Parts

### `PageControlProgress`

Optional progress-style item with animated fill and duration.

## Composition Order

1. `PageControl`
2. repeated `PageControlItem` or `PageControlProgress`

## Valid Composition Patterns

<!-- example: page-control/carousel-indicators.tsx -->
```tsx
import { Card, Heading, PageControl, PageControlItem, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

const slides = [
  { title: 'Plan your week', text: 'Drag tasks onto the calendar and see your free time at a glance.' },
  { title: 'Share with your team', text: 'Invite teammates to a board and assign tasks in one click.' },
  { title: 'Stay on track', text: 'Get a summary every Monday with what slipped and what is next.' },
];

export default function CarouselIndicators() {
  const prefix = useId();
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-10)', justifyItems: 'center', width: '100%' }}>
      <div
        role='tabpanel'
        id={`${prefix}-panel`}
        aria-labelledby={`${prefix}-tab-${active}`}
        style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-3)', minHeight: 96, textAlign: 'center' }}
      >
        <Heading as='h3' size={4} fontWeight={600}>{slide.title}</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{slide.text}</Text>
      </div>
      <PageControl active={active} onChangeActive={setActive} aria-label='Feature tour'>
        {slides.map((item, index) => (
          <PageControlItem
            key={item.title}
            index={index}
            id={`${prefix}-tab-${index}`}
            aria-controls={`${prefix}-panel`}
            aria-label={`${item.title}, ${index + 1} of ${slides.length}`}
          />
        ))}
      </PageControl>
    </Card>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Items with duplicated indexes

Active state and roving focus become ambiguous.

### Progress items without matching step-advance logic

The animation implies timed advancement that the parent flow may not actually perform.

### Very long sequences

The component loses clarity when used like full pagination.
