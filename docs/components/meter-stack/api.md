# MeterStack API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `size` | `MeterStackSize` | `'md'` | No | Visual size of the meter component. |
| `max` | `number` | `1` | No | Maximum possible value of the meter. |
| `min` | `number` | `0` | No | Minimum possible value of the meter. |
| `value` | `number` | `—` | Yes | current numeric value displayed by the meter. |
| `fullWidth` | `boolean` | `—` | No | the meter should expand to fill the width with its container. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `MeterStackSegment`: one proportional segment.

## Types

- `MeterStackProps`
- `MeterStackSegmentProps`
- `MeterStackSize`

## State Model

- `MeterStack` itself is display-only and has no controlled interaction state.
- The root provides `min` and `max` context to each segment for ARIA meter semantics.
