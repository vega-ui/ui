# SegmentedControl Accessibility

## Labeling

The surrounding field or layout should make the purpose of the exclusive choice group obvious. Individual segments still need clear visible labels or strongly recognizable icons.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>↓</kbd> | Moves the focus to the next segment and selects it. Segments are native radios: Chromium and Firefox wrap from the last segment to the first and, in RTL, move to the previous segment on →; Safari does neither. |
| <kbd>←</kbd> / <kbd>↑</kbd> | Moves the focus to the previous segment and selects it. Chromium and Firefox wrap from the first segment to the last and, in RTL, move to the next segment on ←; Safari does neither. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Hidden inputs help preserve native semantics.

## Focus Behavior

- Focus should remain visible at the control level.
- The root focus outline should stay obvious even when the indicator moves.

## Screen Reader Semantics

- Hidden inputs help preserve radio-group semantics.
- Icon-only segments need accessible meaning that is not purely visual.
- Segment labels should remain concise and mutually comparable.

## Form Semantics

- `name` is required for native radio-group behavior.
- Use `SegmentedControlItemInput` when the control participates in native forms.

## Accessibility Risks

- Icon-only segments without accessible meaning.
- Too many options or wildly uneven label lengths.
- Missing `SegmentedControlItemInput` in an item.
