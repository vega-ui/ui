# Slider Accessibility

## Labeling

- Give every `SliderThumbInput` an accessible name with `aria-label` or `aria-labelledby`; in a range slider name the ends ("Minimum price", "Maximum price").
- Show the value nearby when its meaning is not obvious from the label.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>↑</kbd> | Increases the value of the focused thumb by one `step`. In a horizontal RTL slider, Chromium and Firefox increase it on ← instead; Safari does not mirror the arrows. |
| <kbd>←</kbd> / <kbd>↓</kbd> | Decreases the value of the focused thumb by one `step`. In a horizontal RTL slider, Chromium and Firefox decrease it on → instead; Safari does not mirror the arrows. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Increases or decreases the value by a tenth of the range, or by one `step` if it is larger. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the thumb to its minimum or maximum. In a range, a thumb stops at the neighbouring thumb, keeping `minStepsBetweenThumbs`. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus between thumbs. Each thumb is its own tab stop. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- Focus lands on the native input of a thumb; the `SliderThumbIndicator` shows `focus-visible` with `--focus-color`.

## Screen Reader Semantics

- Each thumb is a native slider with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` from the input; with several thumbs the min and max are the neighbours, so screen readers announce how far a thumb can move.
- `aria-orientation` follows the root `orientation`.
- `SliderThumbIndicator` is `aria-hidden`; its content is decoration only. Put the accessible text on `SliderThumbInput` with `aria-valuetext`.
- Use `aria-valuetext` on a thumb when the number alone is not meaningful (`"20 °C"`).

## Form Semantics

- Each thumb submits under its `name` or the root `name`; several thumbs with the same name read with `FormData.getAll`.
- A form reset restores the default values; a canceled reset leaves them.
- A `<fieldset disabled>` disables the thumbs and clicks on the track.

## Accessibility Risks

- unlabeled thumbs
- no visible value feedback for precision-sensitive controls
- vertical slider rendered too small to use comfortably
