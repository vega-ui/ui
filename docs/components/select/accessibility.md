# Select Accessibility

## Labeling

`Select` is an interactive choice control. Its accessibility contract depends on the full [compound component](../../glossary.md#compound-component) composition, not only on the root.

`Select` should always have an accessible label.

Recommended patterns:

- visible label associated in surrounding form layout
- contextual sentence for `inline` usage when the meaning is obvious
- additional helper or error text connected through surrounding form semantics

If the visible UI does not provide a clear label, add one at the integration level before shipping.

## Keyboard Behavior

The root manages keyboard interactions for the option list and current selection state.

Expected behavior:

- trigger receives focus
- opening the listbox enables keyboard navigation between options
- selection can be changed from the keyboard
- `Escape` closes the listbox
- [typeahead](../../glossary.md#typeahead) is enabled by default

If a real text input is rendered inside the listbox, built-in [typeahead](../../glossary.md#typeahead) should usually be disabled with `typeMatchEnabled={false}` to avoid conflicting keyboard behavior.

## Focus Behavior

Focus should remain predictable across the compound parts.

- `SelectCombobox` is the main focus target
- `SelectPortal` should not break logical focus movement across the [portal](../../glossary.md#portal)
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
