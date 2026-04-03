# Meter Styling

## Overview

`Meter` styling is split across the root measurement surface and the visible track fill, with threshold-based color changes applied at the root level.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--meter-height` | `Meter`, `MeterTrack` | Bar thickness. |
| `--meter-value` | `MeterTrack` | Current value. |
| `--meter-max` | `MeterTrack` | Maximum range. |
| `--meter-track-color` | `MeterTrack` | Current fill color. |

## Part-Level Variables

- `Meter`: root size, background surface, and threshold state mapping.
- `MeterTrack`: fill width and visible measured color.

## State And Variant Interaction

- `size` changes bar height.
- `variant` sets the base color family.
- Threshold-derived `data-state` can override the track color to good, warn, or bad.

## Examples

```css
.compactMeter {
  --meter-height: 4px;
}
```

```css
.customMeterStates {
  --meter-track-optimum-color: var(--color-green-500);
  --meter-track-suboptimum-color: var(--color-amber-500);
}
```

## Do Not Override

- Do not confuse meter styling with temporal progress semantics.
- Do not rely on color alone to explain threshold meaning.
- Do not remove enough contrast that the track becomes hard to read.
