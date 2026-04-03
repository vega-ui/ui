# Select Comparison

## Quick Decision Rule

Choose `Select` if all of the following are true:

- the interaction is single-choice
- the value is `string` or `number`
- the option set is better hidden than always visible
- native form participation or field semantics matter

Choose another control if visibility, binary state, or richer action content is more important than compact field behavior.

## `Select` vs `SegmentedControl`

Use `Select` when:

- there are many options
- space is constrained
- options do not need to stay visible all the time

Use `SegmentedControl` when:

- there are only a few options
- users benefit from seeing all choices at once
- switching between options should feel immediate

Trade-off:

- `Select` saves space but hides options
- `SegmentedControl` improves discoverability but consumes layout width

## `Select` vs `Radio`

Use `Select` when:

- the option list is long
- the field belongs to a dense form
- the control should stay compact

Use `Radio` when:

- the option set is short
- users should compare all available choices directly
- explicit single-choice visibility is more important than compactness

Trade-off:

- `Select` is denser
- `Radio` is clearer for comparison

## `Select` vs `Checkbox`

Use `Select` when:

- users must choose exactly one option
- the value should behave like a scalar field in a form

Use `Checkbox` when:

- the interaction is binary
- each control represents an independent yes or no choice

Do not replace multi-checkbox groups with a single `Select` unless the product model is truly single-choice.

## `Select` vs `Switch`

Use `Select` when:

- users are choosing from several values
- the selected value should persist as one field

Use `Switch` when:

- the interaction is immediate on or off state
- the setting changes directly rather than choosing from a list

Trade-off:

- `Select` is for enumerated choice
- `Switch` is for binary state

## `Select` vs `Popover`

Use `Select` when:

- the main job is choosing a value
- keyboard option navigation and value semantics are required

Use `Popover` when:

- the content is not primarily a single-choice field
- the overlay contains actions, help text, or custom UI rather than listbox semantics

## Choose This Component When

- the interaction is single-choice
- the value should behave like one compact field
- the option set is long enough that always-visible controls would add noise
- form participation or dense layout matters

## Do Not Choose This Component When

- the user benefits from seeing all options at once
- the interaction is binary rather than enumerated
- the overlay content is not actually a field
- the value model depends on object payloads instead of scalar keys
