# Radio Accessibility

## Labeling

Each radio should have visible label text that clearly describes the option. The label should usually wrap both the control and the text so the whole row is clickable.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>→</kbd> | Moves the focus to the next enabled radio with the same `name` and checks it. This is native radio behaviour: Chromium and Firefox wrap from the last radio to the first and, in RTL, move to the previous radio on →; Safari does neither. |
| <kbd>↑</kbd> / <kbd>←</kbd> | Moves the focus to the previous enabled radio with the same `name` and checks it. Chromium and Firefox wrap from the first radio to the last and, in RTL, move to the next radio on ←; Safari does neither. |
| <kbd>Space</kbd> | Checks the focused radio if it is not checked yet. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Grouped radios should share one `name`.

## Focus Behavior

- Focus should land on the radio input itself.
- Visible focus styling must remain clear even inside dense layouts or overlays.

## Screen Reader Semantics

- The option label should be explicit and local to the radio.
- Group meaning should come from surrounding field labels or fieldset structure.
- Shared `name` is not a visible label; it is only part of native grouping behavior.

## Form Semantics

- Radios are native form controls and participate directly in form submission.
- Required choice validation should be expressed at the group level, not only on one item.

## Accessibility Risks

- Radios without a clear group label.
- Tiny isolated click targets with detached visible text.
- Using radios where multiple items can be chosen independently.
