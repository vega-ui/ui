# DateRangeField Accessibility

## Labeling

`DateRangeField` needs a label that explains both the business meaning and whether the range is inclusive or otherwise constrained. Placeholder text alone is not enough.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger button: opens or closes the calendar popup. The focus stays on the button. |
| <kbd>Tab</kbd> | From the open trigger: moves the focus into the popup, to its first header button. |
| <kbd>Enter</kbd> | On a day in the popup: the first press starts a new range, the second ends it, and the range is written into the input. The other calendar keys work as in Calendar. |
| <kbd>Shift</kbd> + <kbd>←</kbd> / <kbd>Shift</kbd> + <kbd>→</kbd> / <kbd>Shift</kbd> + <kbd>↑</kbd> / <kbd>Shift</kbd> + <kbd>↓</kbd> | On the start or end day of the range: moves that edge of the range with the focus. |
| <kbd>Escape</kbd> | Closes the popup and returns the focus to the trigger button. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Typing works without opening the calendar. Inside the calendar, navigation only moves the focus; the value changes only when a day is picked.
- Typing is validated in the field's calendar system: a single digit that cannot start a two-digit segment is zero-padded, complete segments are clamped (the day to the month length), and a complete value is clamped to `min` / `max`.
- A reversed typed range is swapped so the earlier date comes first.

## Focus Behavior

- Focus usually starts in the input.
- Opening and closing the calendar should not strand focus away from the range field.
- Nested overlay use should be tested for restoration and dismissal.

## Screen Reader Semantics

- The field should communicate that it captures a start and end date, not one opaque string.
- Helper text should explain the range format and any booking or reporting rules.
- The trigger icon button still needs an accessible label such as "Open date range calendar".

## Form Semantics

- `DateRangeField` behaves like a field through the underlying input.
- Error messaging should cover incomplete or inverted ranges explicitly.

## Accessibility Risks

- Ambiguous labeling that does not explain the meaning of the range.
- Error copy that flags the field as invalid without explaining which side is missing.
- Overlay composition that hides the picker behind clipping or focus issues.
