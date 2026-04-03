# SegmentedControl Accessibility

## Labeling

The surrounding field or layout should make the purpose of the exclusive choice group obvious. Individual segments still need clear visible labels or strongly recognizable icons.

## Keyboard Behavior

- Users should be able to reach the control predictably as a radio-like choice group.
- Hidden inputs help preserve native semantics.
- Keyboard users should understand which segment is currently selected without relying only on animation.

## Focus Behavior

- Focus should remain visible at the control level.
- The root focus outline should stay obvious even when the indicator moves.

## Screen Reader Semantics

- Hidden inputs help preserve radio-group semantics.
- Icon-only segments need accessible meaning that is not purely visual.
- Segment labels should remain concise and mutually comparable.

## Form Semantics

- `name` is required for native radio-group behavior.
- Use `SegmentedControlItemHiddenInput` when the control participates in native forms.

## Accessibility Risks

- Icon-only segments without accessible meaning.
- Too many options or wildly uneven label lengths.
- Missing hidden inputs in form-driven flows.
