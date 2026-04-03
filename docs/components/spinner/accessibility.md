# Spinner Accessibility

## Labeling

- `Spinner` itself is purely visual unless the surrounding pattern adds status semantics.

## Keyboard Behavior

- `Spinner` has no keyboard behavior.

## Focus Behavior

- `Spinner` is not focusable.

## Screen Reader Semantics

- Pair loading indicators with status text or a higher-level live region when the operation matters to assistive technology users.

## Form Semantics

- In forms, use the spinner as supporting feedback rather than as the only state signal.

## Accessibility Risks

- showing only a spinner with no text or status context
- relying only on motion to communicate loading
