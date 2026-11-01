# Listbox Accessibility

## Labeling

- Name the list with `aria-labelledby` or `aria-label`. The component does not add a name by itself.
- Name a `ListboxGroup` the same way.

## Keyboard Behavior

- `ArrowDown` and `ArrowUp` move the active option and stop at the ends.
- `Home` and `End` go to the first and the last option, and `PageUp` and `PageDown` jump by ten.
- Typing moves to the option whose label starts with the typed text.
- `Enter` and `Space` select the active option, and toggle it with `multiple`.

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
