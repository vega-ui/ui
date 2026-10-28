# Spinner Accessibility

## Labeling

- `Spinner` has `role="progressbar"` without a value, like a native `<progress>` without `value`: an indeterminate loading indicator.
- It has no built-in label. Name it with `aria-label` or point `aria-labelledby` at visible text next to it.
- Set `aria-hidden` when the spinner only decorates something that already announces the loading state.

## Keyboard Behavior

- `Spinner` has no keyboard behavior.

## Focus Behavior

- `Spinner` is not focusable.

## Screen Reader Semantics

- Screen readers announce the spinner as a busy progress bar with its label when they reach it; a spinner that appears later is not announced on its own.
- Pair loading indicators with status text or a higher-level live region when the operation matters to assistive technology users.

## Form Semantics

- In forms, use the spinner as supporting feedback rather than as the only state signal.

## Accessibility Risks

- a spinner without `aria-label` or `aria-labelledby`, which screen readers announce as an unnamed progress bar
- relying only on motion to communicate loading
