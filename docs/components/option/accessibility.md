# Option Accessibility

## Labeling

- The surrounding listbox or selector should explain what the options represent.

## Keyboard Behavior

- `Option` itself only participates in keyboard interaction through `tabIndex` and the surrounding parent pattern.

## Focus Behavior

- `focusable` determines whether the option can receive tab focus directly.
- More complex roving-focus behavior belongs to the parent list control.

## Screen Reader Semantics

- The component renders `role='option'`.
- `aria-selected` is exposed when `selected` is provided.

## Form Semantics

- `Option` is not native form input by itself.

## Accessibility Risks

- using `Option` without a proper parent listbox/menu pattern
- relying only on selected color without adjacent context or selection semantics
