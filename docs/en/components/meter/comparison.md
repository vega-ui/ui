# Meter Comparison

## Quick Decision Rule

Use `Meter` for bounded measurement, not for ongoing completion.

## `Meter` vs `Progress`

Use `Meter` when:

- the value is a score, quota, capacity, or other bounded measurement

Use `Progress` when:

- the value represents task completion over time

Main trade-off: meter is descriptive measurement, while progress is temporal completion.

## `Meter` vs `Badge`

Use `Meter` when:

- the UI needs a quantitative range visualization

Use `Badge` when:

- the UI only needs a short categorical or status label

Main trade-off: meter visualizes quantity, while badge labels state.

## `Meter` vs `MeterStack`

Use `Meter` when:

- one continuous bounded value is the clearest representation

Use `MeterStack` when:

- several parts of one aggregate need to stay visible

## Choose This Component When

- The value is bounded and descriptive.
- Thresholds or optimum state matter.
- A bar-like quantitative visualization is useful.
- one continuous measure is clearer than a segmented breakdown

## Do Not Choose This Component When

- The value represents ongoing completion.
- The UI only needs a short text label.
- No meaningful range exists.
