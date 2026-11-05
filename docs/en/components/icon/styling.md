# Icon Styling

## Overview

`Icon` styling is size-driven and relies on `currentColor` for most color behavior.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-size` | root | computed token size |

## Part-Level Variables

### Root

The root maps `data-size` values to a single `--icon-size` and applies that value to both width and height.

## State And Variant Interaction

- token sizing is used only when explicit width and height are not provided
- icon color follows `currentColor`

## Examples

### Large semantic icon

Color an icon through the CSS `color` property (here with `style`): the glyph strokes with `currentColor`, so theme tokens work directly. A thinner `strokeWidth` keeps large glyphs from looking heavy.

<!-- example: icon/large-semantic-icon.tsx -->
```tsx
import { Heading, Icon, Text } from '@vega-ui/react';
import { CircleCheckBigIcon } from '@vega-ui/icons';

export default function LargeSemanticIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%', textAlign: 'center' }}>
      <Icon size='xl' strokeWidth={1.5} style={{ color: 'var(--color-green-accent-500)' }}>
        <CircleCheckBigIcon />
      </Icon>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} fontWeight={600}>Payment received</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)', textWrap: 'balance' }}>We emailed the receipt to finance@acme.com.</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- hardcoding icon colors where surrounding text color should drive the result
- mixing explicit width/height overrides unpredictably across one control family
