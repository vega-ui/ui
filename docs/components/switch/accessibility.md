# Switch Accessibility

## Labeling

Switch labels should describe the controlled feature or state, not the action of toggling it.

## Keyboard Behavior

- The switch should be reachable in normal tab order.
- Keyboard users should be able to toggle it predictably.
- The visible row should clearly read as one binary setting.

## Focus Behavior

- Focus should land on the hidden input.
- Visible focus styling should remain obvious on the switch track.

## Screen Reader Semantics

- Hidden input participation helps preserve native checked semantics.
- The label should make the enabled state understandable without extra guesswork.
- Switches should be reserved for immediate binary settings, not option comparison.

## Form Semantics

- Use `SwitchHiddenInput` when the switch should participate in native forms.
- Product copy should make it clear whether the switch applies immediately or on submit.

## Accessibility Risks

- Labels like "Turn on" that do not describe the controlled setting.
- Missing hidden input in a native form flow.
- Using a switch where a radio group or checkbox list better matches the product model.
