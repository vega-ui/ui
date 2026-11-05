# MeterStack API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `MeterStackSize` | `'md'` | No | Visual size of the meter component. Typically maps to predefined size tokens in a design system. |
| `max` | `number` | `1` | No | Maximum possible value of the meter. Default is 100. |
| `min` | `number` | `0` | No | Minimum possible value of the meter. Default is 0. |
| `value` | `number` | — | Yes | The current numeric value displayed by the meter. Required. Clamped between `min` and `max`. |
| `fullWidth` | `boolean` | — | No | Whether the meter should expand to fill the width with its container. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `MeterStackSegment`: one proportional segment.

### `MeterStackSegment`

<!-- AUTO-GENERATED:PART_API:MeterStackSegment:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `number` | — | No | The numeric value this partial item visually represents. For example, a segment in a stacked meter. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MeterStackSegment:end -->

## Types

- `MeterStackProps`
- `MeterStackSegmentProps`
- `MeterStackSize`

## State Model

- `MeterStack` itself is display-only and has no controlled interaction state.
- The root provides `min` and `max` context to each segment for ARIA meter semantics.
