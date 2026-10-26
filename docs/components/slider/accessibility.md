# Slider Accessibility

## Labeling

- Give every `SliderThumbInput` an accessible name with `aria-label` or `aria-labelledby`; in a range slider name the ends ("Minimum price", "Maximum price").
- Show the value nearby when its meaning is not obvious from the label.

## Keyboard Behavior

Native `<input type="range">` keys on each thumb:

- Arrow keys change the value by one step; `ArrowUp`/`ArrowRight` increase it, also on a vertical slider in Firefox.
- `PageUp`/`PageDown` change it by a tenth of the whole range, or by one step if that is larger.
- `Home` jumps to `min`, `End` to `max`; with several thumbs the thumb stops at its neighbour.
- `Tab` moves between thumbs in document order.

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
