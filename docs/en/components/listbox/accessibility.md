# Listbox Accessibility

## Labeling

- Name the list with `aria-labelledby` or `aria-label`. The component does not add a name by itself.
- Name a `ListboxGroup` the same way.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> | Moves the focus to the list, which makes the selected option, or the first enabled one, active. The list is one tab stop. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Makes the next or previous enabled option active, skipping disabled ones and stopping at the ends. The focus stays on the list. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Makes the first or last enabled option active. |
| <kbd>Page Down</kbd> / <kbd>Page Up</kbd> | Moves the active option 10 options down or up, stopping at the last or first enabled one. |
| <kbd>p</kbd> | Typeahead: a printable character makes the next option whose label starts with the typed text active; characters typed quickly add up. Turned off with `typeahead={false}`. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the active option. With `multiple`, toggles it and keeps the other selected options. |
| <kbd>Shift</kbd> + <kbd>↓</kbd> / <kbd>Shift</kbd> + <kbd>↑</kbd> | With `multiple`: moves the active option and toggles it. |
| <kbd>Shift</kbd> + <kbd>Space</kbd> | With `multiple`: selects every option from the last toggled one to the active one. |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>End</kbd> | With `multiple`: selects every option from the active one to the first or last one and makes it active. |
| <kbd>Ctrl</kbd> + <kbd>a</kbd> | With `multiple`: selects every enabled option, or clears the selection when all of them are selected. `Meta+A` on macOS. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- The list is one tab stop. On focus the selected option becomes active, or the first available one.
- The focus stays on the list, and options do not take it.

## Screen Reader Semantics

- The list renders `role='listbox'` and `aria-activedescendant`, and `aria-multiselectable` with `multiple`.
- Options render `role='option'` with `aria-selected`, and `aria-disabled` when unavailable.
- Groups render `role='group'`.

## Form Semantics

- `Listbox` does not submit a value in a form. Keep the value in state and send it yourself, or use [Select](../select/) with `SelectHiddenSelect`.

## Accessibility Risks

- leaving the list or a group without a name
- putting interactive controls inside an option
- relying on `aria-activedescendant` without testing in the screen readers you support
