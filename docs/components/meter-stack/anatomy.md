# MeterStack Anatomy

## Overview

`MeterStack` provides one shared value range and renders multiple segments inside the same filled surface. Each segment declares its own value relative to the root max.

## Required Parts

### `MeterStack`

Required. Owns the aggregate value range, size, and background track.

### `MeterStackSegment`

Required in normal composition. Renders one proportional segment.

## Optional Parts

### Segment color overrides

Optional. Each segment can override its color through CSS variables.

## Composition Order

1. `MeterStack`
2. repeated `MeterStackSegment`

## Valid Composition Patterns

```tsx
<MeterStack value={1}>
  <MeterStackSegment value={0.2} />
  <MeterStackSegment value={0.3} />
  <MeterStackSegment value={0.5} />
</MeterStack>
```

## Invalid Composition Patterns

### Segment values that do not reflect the intended total

The visual meter stops being trustworthy.

### Too many micro-segments without explanation

The component becomes visually noisy and hard to interpret.
