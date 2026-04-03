# Checkbox Comparison

## Quick Decision Rule

Use `Checkbox` when the choice is independent and may be selected alongside other choices.

## `Checkbox` vs `Radio`

Use `Checkbox` when:

- options are independent
- multiple choices may be selected

Use `Radio` when:

- exactly one option should be selected

Main trade-off: checkbox supports independent selection, while radio enforces exclusivity.

## `Checkbox` vs `Switch`

Use `Checkbox` when:

- the choice is part of a form or list of selectable options

Use `Switch` when:

- one immediate binary setting should toggle on or off

Main trade-off: checkbox reads as selection, while switch reads as immediate state change.

## `Checkbox` vs `SegmentedControl`

Use `Checkbox` when:

- the user may select none, one, or many independent options

Use `SegmentedControl` when:

- the user must choose one always-visible option from a short set

Main trade-off: checkbox is independent and combinable, while segmented control is exclusive and comparative.

## `Checkbox` vs `CheckboxCard`

Use `Checkbox` when:

- a compact inline option row is enough

Use `CheckboxCard` when:

- each option needs richer descriptive or card-like content

## Choose This Component When

- The option is independent.
- The control belongs naturally in a form or selectable list.
- Multiple selections may coexist.
- the interaction should read as selection rather than immediate system state

## Do Not Choose This Component When

- Exactly one option must be selected.
- The control is one immediate binary setting.
- The UI should present an always-visible exclusive option bar.
