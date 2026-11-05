# Listbox Comparison

## Quick Decision Rule

Choose `Listbox` when the options should stay visible as one list, the user picks one or several of them, and the list may be long enough to scroll. Choose a compact field or native inputs when space is tight or the value must submit with a form by itself.

## `Listbox` vs `Select`

Use `Listbox` when:

- the options should stay visible without opening anything
- the user picks several values, with `multiple`
- the list is the main content of a panel, such as a settings column or a picker

Use `Select` when:

- the field sits in a dense form and should take one row
- the choice is single and the options can stay hidden until needed
- the value should submit with the form through `SelectHiddenSelect`

Trade-off:

- `Listbox` shows every choice but takes vertical space
- `Select` saves space but hides the choices behind a click

## `Listbox` vs `Radio`

Use `Listbox` when:

- there are many options and the list needs to scroll
- the user benefits from arrow keys, `Home`, `End` and typeahead across all options

Use `Radio` when:

- there are a few options, each with room for a description
- the choice must submit with a form natively under one `name`

Trade-off:

- `Listbox` is one tab stop with list navigation and no native form value
- `Radio` is native and form-ready, but long groups become hard to scan

## `Listbox` vs `Checkbox`

Use `Listbox` with `multiple` when:

- the choices are values of one field, such as labels or channels
- the set is long and benefits from typeahead and a scrolling area

Use `Checkbox` when:

- each choice is an independent yes or no setting
- every choice must submit natively, or needs an indeterminate "select all"

Trade-off:

- `Listbox` treats the selection as one array value
- `Checkbox` treats every choice as its own control

## `Listbox` vs `SegmentedControl`

Use `Listbox` when:

- the options are many or their labels are long
- the list is laid out vertically

Use `SegmentedControl` when:

- there are two to five short options in one row
- switching should feel immediate, like changing a view

## Choose This Component When

- the options should always be visible
- one or several values are picked from the same set
- the list may be long and needs keyboard navigation and typeahead
- the value lives in state, and the form wiring is done by you

## Do Not Choose This Component When

- the field must stay compact in a form; use [Select](../select/)
- the value must submit natively without extra wiring; use [Radio](../radio/) or [Checkbox](../checkbox/)
- an option needs its own buttons or links inside it
- the list holds actions rather than values
