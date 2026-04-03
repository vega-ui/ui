# Slider Accessibility

## Labeling

- Pair the slider with a visible label or adjacent text that explains the controlled value.

## Keyboard Behavior

- Arrow keys adjust the value by one step.
- `Home` jumps to `min`.
- `End` jumps to `max`.

## Focus Behavior

- Focus lands on the thumb.
- The thumb uses `focus-visible` styling from the shared slider-base layer.

## Screen Reader Semantics

- `SliderHiddenInput` helps preserve native range semantics in form flows.
- Visible value feedback is often necessary when exact meaning is not obvious from the label alone.

## Form Semantics

- Use `SliderHiddenInput` when the value should participate in native form submission.

## Accessibility Risks

- unlabeled slider
- no visible value feedback for precision-sensitive controls
- vertical slider rendered too small to use comfortably
