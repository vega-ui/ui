# Progress Anatomy

## Overview

`Progress` is a [compound component](../../glossary.md#compound-component) because the root progressbar role and the visible fill track share one value model and state contract.

## Required Parts

### `Progress`

Required. Owns range values, variant, size, and accessibility attributes.

### `ProgressTrack`

Required. Renders the visible fill amount or indeterminate animation.

## Optional Parts

`Progress` does not expose additional public parts beyond the root and track.

## Composition Order

1. `Progress`
2. `ProgressTrack`

## Valid Composition Patterns

```tsx
<Progress value={72} style={{ width: 250 }}>
  <ProgressTrack />
</Progress>
```

## Invalid Composition Patterns

### Progress without descriptive surrounding context

Users may see the bar but not know what is advancing.

### Static score represented as progress

If the value is descriptive rather than temporal, `Meter` is usually the better pattern.
