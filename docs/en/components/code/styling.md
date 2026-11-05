# Code Styling

## Overview

`Code` applies a compact inline surface on top of the shared `Text` model.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--code-font-family` | root | inline code font family |
| `--fills-secondary` | root | background fill |
| `--label-secondary` | `--t-color` mapping | code text color |

## Part-Level Variables

### Root

The root sets:

- monospace font fallback through `--code-font-family`
- `background-color: var(--fills-secondary)`
- `--t-color: var(--label-secondary)` for inherited text color

## State And Variant Interaction

- `Code` does not define local state variants.
- Visual changes mainly come from inherited `Text` sizing and global theme tokens.

## Examples

### Size inside surrounding text

`Code` has its own `size`, 3 by default, and does not inherit the size of the text around it. Pass the same `size` as the surrounding `Text` or `Heading` so the chip matches the line.

<!-- example: code/inline-code-token.tsx -->
```tsx
import { Code, Heading, Text } from '@vega-ui/react';

export default function InlineCodeToken() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <Text size={2}>
        Default size inside small text: <Code>workspace_slug</Code>
      </Text>
      <Text size={2}>
        Matched to the text: <Code size={2}>workspace_slug</Code>
      </Text>
      <Heading as='h3' size={6}>
        The <Code size={6}>useListbox</Code> hook
      </Heading>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- removing code semantics and keeping only the chip styling
- using low-contrast background and text combinations
- forcing block-level layout for long snippets instead of switching to a proper code block component
