# Select Accessibility

## Responsibilities

### Built In

- `role="combobox"` on the trigger with `aria-haspopup`, `aria-expanded` and `aria-controls` pointing to the list
- the active option through `aria-activedescendant` while the focus stays on the trigger
- `role="listbox"` and `role="option"` with `aria-selected` and `aria-disabled`
- the full keyboard model below, including [typeahead](../../glossary.md#typeahead)

### Your Part

- an accessible label: a visible `Label` or `aria-label`
- `SelectHiddenSelect` when the value goes into a native form
- `typeahead={false}` when the list contains a text input
- a retest of focus and dismissal when `Select` sits inside an overlay

## Labeling

`Select` is an interactive choice control. Its accessibility contract depends on the full [compound component](../../glossary.md#compound-component) composition, not only on the root.

`Select` should always have an accessible label.

Recommended patterns:

- visible label associated in surrounding form layout
- contextual sentence for `inline` usage when the meaning is obvious
- additional helper or error text connected through surrounding form semantics

If the visible UI does not provide a clear label, add one at the integration level before shipping.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>↑</kbd> / <kbd>Enter</kbd> / <kbd>Space</kbd> | On the closed combobox: opens the list and makes the selected option, or the first one, active. The focus stays on the combobox. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | In the open list: moves the active option to the next or previous enabled one and stops at the ends. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Makes the first or last enabled option active, opening the list if it is closed. |
| <kbd>Page Down</kbd> / <kbd>Page Up</kbd> | Moves the active option 10 options down or up, stopping at the last or first one. |
| <kbd>s</kbd> | Typeahead: a printable character makes the next option whose label starts with the typed text active; characters typed quickly add up. On the closed combobox it also opens the list without selecting. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | In the open list: selects the active option and closes the list. The focus stays on the combobox. |
| <kbd>Escape</kbd> | Closes the list without changing the value. The focus stays on the combobox. |
| <kbd>Alt</kbd> + <kbd>↑</kbd> | Closes the list without changing the value. |
| <kbd>Tab</kbd> | In the open list: selects the active option if it was moved to from the keyboard, closes the list and moves the focus on. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

If a real text input is rendered inside the listbox, built-in [typeahead](../../glossary.md#typeahead) should usually be disabled with `typeahead={false}` to avoid conflicting keyboard behavior.

## Focus Behavior

Focus should remain predictable across the compound parts.

- `SelectCombobox` is the main focus target
- the focus stays on `SelectCombobox`, which points to the active option with `aria-activedescendant`
- a form field inside `SelectListbox`, such as a search input, can take the focus, and the list closes when the focus leaves it
- closing the listbox should return users to a sensible trigger state

If `Select` is rendered inside overlays such as `Dialog`, retest focus restoration and tab order in the real composition, not only in isolation.

## Option Semantics

`SelectOption` should remain the selectable unit.

- do not split a single option into multiple competing focus targets
- rich option content is acceptable, but the option still needs to behave like one selectable row
- disabled options should remain visually and behaviorally distinguishable

## Screen Reader Semantics

- the trigger should expose a clear field purpose through its label
- the selected value should remain understandable without relying on visual layout
- rich option content should still read like a single choice, not like multiple controls
- placeholder text should not be the only source of meaning for the field

## Form Semantics

Use `SelectHiddenSelect` when the value should participate in native [form participation](../../glossary.md#form-participation).

This is especially important for:

- regular HTML form submit flows
- browser autofill or form tooling expectations
- integrations that read `FormData`

If `SelectHiddenSelect` is omitted, the component can still work visually, but form semantics become weaker.

## Inline Variant

`Select variant='inline'` should be used only when the surrounding sentence already gives the control clear meaning.

Good pattern:

- "Notify me [weekly] about updates."

Weak pattern:

- an unlabeled inline control with no surrounding context

## Disabled and Read-Only States

[`disabled`](../../glossary.md#disabled) and [`readOnly`](../../glossary.md#read-only) are not equivalent.

- `disabled`: blocks interaction entirely
- `readOnly`: preserves focusability but prevents value changes

Use the state that matches the intended user experience. Do not use `readOnly` as a visual substitute for `disabled`.

## Searchable Listbox Pattern

When embedding a search field into `SelectListbox`:

- disable built-in typeahead
- stop keyboard conflicts between the search input and option navigation
- make sure filtered results remain keyboard reachable
- preserve a visible focus indication for both the input and the options

## Accessibility Risks

- missing or ambiguous label
- omitting `SelectHiddenSelect` in native form flows
- embedding a text input in the listbox without disabling [typeahead](../../glossary.md#typeahead)
- rendering `Select` inside overlays without retesting focus and dismissal behavior
- using rich option content that visually looks interactive in more than one place
