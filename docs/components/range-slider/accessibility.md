# RangeSlider Accessibility

## Labeling

- Pair the range slider with a visible label and, when needed, visible min/max value feedback.

## Keyboard Behavior

- Each thumb supports arrow-key movement.
- `Home` and `End` apply to the focused thumb within its allowed interval.

## Focus Behavior

- Focus lands on one thumb at a time.
- Each thumb should remain visibly focusable.

## Screen Reader Semantics

- Two-thumb sliders are more complex than scalar sliders, so visible labels and live value context matter more.
- Hidden inputs help preserve form participation when needed.

## Form Semantics

- Use one hidden input per thumb when both bounds must submit through native forms.

## Accessibility Risks

- no indication of which value belongs to which thumb
- unlabeled interval selection
- two-thumb complexity without visible numeric feedback
