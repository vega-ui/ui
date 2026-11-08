# Popover Anatomy

## Overview

`Popover` owns open state and floating-layer coordination between the trigger and content. It stays non-modal by default, so the composition contract is about anchoring and contextual content rather than isolation.

## Required Parts

### `Popover`

Required. Owns open state and anchor coordination.

### `PopoverTrigger`

Required for trigger-driven usage. Toggles the popover through the native `popovertarget`, so it must be a button; with `asChild`, the child must render a `<button>`.

### `PopoverContent`

Required. Renders the floating content surface as a native `popover="auto"` element in the top layer, so no portal part is needed. It is always rendered and hidden while closed; its children render only while it is open.

## Optional Parts

### `PopoverAnchor`

Optional. Marks the element the content is positioned against instead of the trigger, such as a whole field around a small button inside it. Opening, `aria-*`, and focus return stay on the trigger. Renders a `div`; with `asChild`, it uses its child.

### `PopoverClose`

Optional. A button inside `PopoverContent` that closes the popover through `onChangeOpen(false)`, so no `open` state is needed. It has no styles of its own: put your own button inside with `asChild`.

For a dimmed backdrop, use `Dialog` or `Sheet` instead.

## Composition Order

1. `Popover`
2. `PopoverAnchor` (optional), wrapping the element that holds `PopoverTrigger`
3. `PopoverTrigger`
4. `PopoverContent`
5. `PopoverClose` (optional), inside `PopoverContent`

## Valid Composition Patterns

<!-- example: popover/minimal-composition.tsx -->
```tsx
import { useId } from 'react';
import {
  Button,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Popover role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Storage · 82% used</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={titleId}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', maxWidth: 280 }}>
          <Heading id={titleId} as='h3' size={5} fontWeight={600}>16.4 GB of 20 GB used</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Videos take 11.2 GB. Old exports are removed after 90 days.</Text>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Critical modal task inside `PopoverContent`

If the flow blocks progress or requires strong focus trapping, use `Dialog`, `Drawer`, or `Sheet` instead.

### Large page-like layout inside the popover

This weakens the contextual nature of the component and usually indicates the wrong overlay pattern.

### Trigger and content split across unrelated state owners

That makes open state and placement harder to reason about than a single popover tree.
