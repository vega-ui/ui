# Option Accessibility

## Labeling

- The surrounding listbox or selector should explain what the options represent.

## Keyboard Behavior

- `Option` has no keyboard behavior of its own: the owner of the list handles the keys.

## Focus Behavior

- `Option` does not take focus. The owner of the list keeps it and points to the active option with `aria-activedescendant`.
- `active` shows which option that is.

## Screen Reader Semantics

- The component renders `role='option'`.
- `aria-selected` is exposed when `selected` is provided, and `aria-disabled` when `disabled` is.

## Form Semantics

- `Option` is not native form input by itself.

## Accessibility Risks

- using `Option` without a proper parent listbox/menu pattern
- relying only on selected color without adjacent context or selection semantics
