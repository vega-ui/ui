# ButtonBase Accessibility

## Labeling

- Text buttons are labeled by their visible content.
- Icon-only buttons need an explicit `aria-label`.
- When `asChild` is used, the final child element must still expose a valid accessible name.

## Keyboard Behavior

- Native buttons activate with `Enter` and `Space`.
- Slotted links keep link keyboard semantics, not button semantics.

## Focus Behavior

- `ButtonBase` renders a visible `:focus-visible` outline using `--focus-color`.
- `disabled` removes interaction.
- If the action should stay focusable while visually blocked, use a different interaction model instead of forcing disabled styling.

## Screen Reader Semantics

- Default semantics are those of a native `button`.
- With `asChild`, semantics come from the slotted element.
- Do not turn navigation links into pseudo-buttons unless the product interaction is actually navigation.

## Accessibility Risks

- Using icon-only content without a label.
- Using `asChild` with a non-interactive child.
- Forgetting that `button` and `a` have different keyboard and screen-reader expectations.
