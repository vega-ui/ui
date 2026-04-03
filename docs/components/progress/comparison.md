# Progress Comparison

## Quick Decision Rule

Use `Progress` when the value represents ongoing completion over time.

## `Progress` vs `Meter`

Use `Progress` when:

- the value represents task completion or async advancement

Use `Meter` when:

- the value is a bounded measurement or score

Main trade-off: progress is temporal completion, while meter is descriptive measurement.

## `Progress` vs `Spinner`

Use `Progress` when:

- some notion of completion amount can be shown

Use `Spinner` when:

- only indefinite loading feedback is available

Main trade-off: progress communicates amount, while spinner communicates activity without range.

## `Progress` vs `MeterStack`

Use `Progress` when:

- one completion signal is enough

Use `MeterStack` when:

- the value is composed of several meaningful parts rather than one completion amount

## Choose This Component When

- A task is moving toward completion.
- A value can represent completion over time.
- A determinate or indeterminate bar is the right mental model.
- the bar should read as progress rather than descriptive measurement

## Do Not Choose This Component When

- The value is a static score or capacity measurement.
- No bar-like completion model exists.
- A spinner would better match the uncertainty of the state.
