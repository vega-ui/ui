# Combobox Comparison

## Quick Decision Rule

Choose `Combobox` when users type to find one option in a set that is too long to scan, or that comes from a server as they type. Choose `Select` when the set is short and fixed and typing adds nothing, `Listbox` when the options should stay visible, and a native `<input list>` when the suggestions are only hints for free text.

## `Combobox` vs `Select`

Use `Combobox` when:

- the set is long, such as countries, cities or people
- users know what they are looking for and type part of it
- options are loaded from a server for the typed text

Use `Select` when:

- the set is short and fixed, such as a priority or a plan
- users should see every option without typing
- the value must always be one of the options and submit through `SelectHiddenSelect`

Trade-off:

- `Combobox` finds an option fast in a long set, but the app filters the options and checks that one was picked
- `Select` always holds a valid option, but a long list becomes slow to scroll

## `Combobox` vs `Listbox`

Use `Combobox` when:

- the field should take one row and show the options only while the user searches
- one option is picked

Use `Listbox` when:

- the options should stay visible, for example in a panel or a picker
- several options are picked with `multiple`
- a filter input above an always visible list is enough

Trade-off:

- `Combobox` keeps the form compact and the focus in the text
- `Listbox` shows the whole set and supports several values, but takes vertical space

## `Combobox` vs native `datalist`

Use `Combobox` when:

- options need markup, groups or disabled states
- the app needs the picked value, not only the text
- the list should look and behave the same in every browser
- the text should be completed inline, or the list opened with a button

Use `<input list>` with `<datalist>` when:

- the suggestions are hints and any text is a valid answer
- the browser filtering and look are acceptable
- the text is all the form needs

Trade-off:

- `Combobox` gives full control of options, filtering and the picked value, and needs more code
- `<datalist>` is native and needs no code, but its list differs between browsers and cannot be styled

## Choose This Component When

- users type to find one option in a long or remote set
- the app needs both the text and the picked value
- options need rich content or groups

## Do Not Choose This Component When

- the set is short and fixed; use [Select](../select/)
- the options should stay visible or several are picked; use [Listbox](../listbox/)
- any text is valid and suggestions are only hints; use a [TextField](../text-field/) with a native `datalist`
- the list holds actions or navigation rather than values
