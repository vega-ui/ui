# SegmentedControl Comparison

## Quick Decision Rule

Use `SegmentedControl` when a short set of exclusive options should stay visible and comparable.

## `SegmentedControl` vs `Radio`

Use `SegmentedControl` when:

- options should stay visible as adjacent segments
- visual comparison matters

Use `Radio` when:

- a simpler form-like exclusive choice group is enough

Main trade-off: segmented control is more explicit and compact, while radio is simpler and more conventional in forms.

## `SegmentedControl` vs `Select`

Use `SegmentedControl` when:

- the option set is small and should stay visible

Use `Select` when:

- space is constrained or the option list is longer

Main trade-off: segmented control favors visibility, while select favors density and scalability.

## `SegmentedControl` vs `Switch`

Use `SegmentedControl` when:

- the user is choosing one option from several visible states

Use `Switch` when:

- the control is one immediate binary toggle

Main trade-off: segmented control is exclusive choice, while switch is binary state change.

## `SegmentedControl` vs `CheckboxCard`

Use `SegmentedControl` when:

- options should stay short, dense, and mutually exclusive

Use `CheckboxCard` when:

- options are richer, card-like, or independently selectable

## Choose This Component When

- A short exclusive option set should remain visible.
- The user benefits from comparing options side by side.
- The UI should feel denser and more explicit than a radio list.
- the options are short enough to remain visually balanced

## Do Not Choose This Component When

- The option list is long.
- The choice is binary and immediate.
- The flow only needs a simple radio group.
