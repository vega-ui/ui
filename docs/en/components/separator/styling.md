# Separator Styling

## Overview

`Separator` has a very small styling contract driven by orientation and one shared color token.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--color-gray-accent-200` | root | divider color |

## Part-Level Variables

### Root

The root starts as a full-width horizontal line and switches dimensions based on `data-orientation`.

## State And Variant Interaction

- `horizontal` uses `width: 100%` and `height: 1px`
- `vertical` uses `width: 1px` and `height: 100%`
- there are no component-local state variants

## Examples

### Inset list divider

The line color is overridden with `background` and the `--separator-non-opaque` token, and `width: 'auto'` with `marginInlineStart` makes the line start after the avatar, like a native list. The dividers are decorative, so they are hidden with `aria-hidden`.

<!-- example: separator/subtle-horizontal-divider.tsx -->
```tsx
import { Separator, Text } from '@vega-ui/react';
import { Fragment } from 'react';

const contacts = ['Alicia Gómez', 'Ben Carter', 'Chen Wei', 'Dana Novak'];

export default function SubtleHorizontalDivider() {
  return (
    <div style={{ display: 'grid', width: '100%' }}>
      {contacts.map((name, index) => (
        <Fragment key={name}>
          {index > 0 && (
            <Separator
              aria-hidden
              style={{ width: 'auto', marginInlineStart: 'var(--spacing-24)', background: 'var(--separator-non-opaque)' }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', paddingBlock: 'var(--spacing-5)' }}>
            <div
              aria-hidden
              style={{ width: 'var(--spacing-18)', height: 'var(--spacing-18)', flexShrink: 0, borderRadius: '50%', background: 'var(--fills-secondary)' }}
            />
            <Text size={3}>{name}</Text>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Short vertical divider

In a row aligned to the center, an explicit `height` gives a vertical separator a fixed length shorter than the line of text.

<!-- example: separator/vertical-toolbar-divider.tsx -->
```tsx
import { Separator, Text } from '@vega-ui/react';

export default function VerticalToolbarDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Edited 2 hours ago</Text>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-6)' }} />
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>3 comments</Text>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-6)' }} />
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shared with team</Text>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- relying on the separator to create spacing by itself
- using a decorative divider where semantic grouping is required
