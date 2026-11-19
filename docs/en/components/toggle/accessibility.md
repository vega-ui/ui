# Toggle Accessibility

## Labeling

- A toggle with text is named by its text. An icon-only toggle with `square` needs `aria-label` or `aria-labelledby`, which its type requires; the components never set a label themselves.
- Keep one label in both states, naming what the toggle turns on: "Bold", "Mute", "Captions". The screen reader adds "pressed" or "not pressed".
- An icon may change with the state, like a crossed-out microphone while muted, as long as the label stays the same.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Presses or releases the focused toggle, and the focus stays on it. It is a native `<button>`; with `asChild` the child keeps its own keys. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- A toggle on its own is one Tab stop, as any button, and keeps the focus when it is pressed or released.
- A disabled toggle is natively disabled: Tab skips it.
- Inside a [Toolbar](../toolbar/), the toolbar owns the Tab stop and the arrows of its axis; the toggle needs a `ToolbarItem` to join it.

## Screen Reader Semantics

- The toggle is a `button` with `aria-pressed="true"` or `"false"`, announced as a toggle button, pressed or not pressed, like "Mute, toggle button, pressed".
- A disabled toggle is announced as unavailable, with its pressed state.

## Accessibility Risks

- A label that changes with the state, like "Mute" and "Unmute": the screen reader announces "Unmute, pressed", and the user cannot tell the state from the label.
- An icon-only toggle without `aria-label`.
- A pressed state shown only by color: the default look tints the background and the icon; a custom look needs a difference that is more than a hue.
- A toggle used as a form value: a form reads its inputs, and a toggle is a button. Use [Switch](../switch/) or [Checkbox](../checkbox/).
