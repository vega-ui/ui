# Meter Anatomy

## Overview

`Meter` is a [compound component](../../glossary.md#compound-component) because the root meter role and the visible track share one bounded measurement model.

## Required Parts

### `Meter`

Required. Owns range values, thresholds, variant, size, and accessibility attributes.

### `MeterTrack`

Required. Renders the visible measured-fill amount.

## Optional Parts

`Meter` does not expose additional public parts beyond the root and track.

## Composition Order

1. `Meter`
2. `MeterTrack`

## Valid Composition Patterns

```tsx
<Meter value={75} max={100} optimum={100} high={66} low={33} style={{ width: 150 }}>
  <MeterTrack />
</Meter>
```

## Invalid Composition Patterns

### Meter used for ongoing async completion

If the value represents temporal completion, `Progress` is the better pattern.

### Threshold-based colors without explaining what the range means

Users may see semantic color shifts but not understand the measurement.
