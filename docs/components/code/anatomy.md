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

```tsx
<Text size={2}>
  Run <Code>pnpm docs:validate</Code> before opening a PR.
</Text>
```

## Invalid Composition Patterns

### Large code samples rendered inline

This makes long commands or snippets hard to read.

### Using `Code` as a generic highlighted label

The component should keep code semantics.
