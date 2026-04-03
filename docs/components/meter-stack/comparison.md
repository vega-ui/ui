# MeterStack Comparison

## Quick Decision Rule

Use `MeterStack` when one metric is best understood as several colored parts. Use `Meter` or `Progress` when a single continuous bar communicates the value more clearly.

## `MeterStack` vs `Meter`

Use `MeterStack` when:

- segmented composition is the real message

Use `Meter` when:

- one continuous bounded value is enough

## `MeterStack` vs `Progress`

Use `MeterStack` when:

- the UI is showing composition breakdowns

Use `Progress` when:

- the UI is showing one task's completion over time

## Choose This Component When

- one metric is composed of several meaningful segments
- segment ordering and color convey real information
- the breakdown itself is more important than one aggregate value

## Do Not Choose This Component When

- one continuous bar is enough
- segment meaning is unclear or purely decorative
