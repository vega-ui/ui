# Code Anatomy

## Overview

`Code` is a single-part primitive. It renders semantic `<code>` content and applies the VegaUI inline-code surface.

## Required Parts

### `Code`

Required. Owns both the semantic element and the inline chip styling.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Code`
2. inline code content

## Valid Composition Patterns

`Code` sits inline inside a `Text` paragraph and wraps only the machine-readable fragments.

<!-- example: code/basic-usage.tsx -->
```tsx
import { Code, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Text asChild size={3}>
      <p>
        Run <Code>pnpm dev</Code> and open <Code>localhost:3000</Code> in your browser.
      </p>
    </Text>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Large code samples rendered inline

This makes long commands or snippets hard to read.

### Using `Code` as a generic highlighted label

The component should keep code semantics.
