# Icon Accessibility

## Labeling

- `Icon` defaults to `aria-hidden='true'`, which is correct for decorative icons.
- If the icon conveys standalone meaning, provide accessible labeling through the surrounding control or text.

## Keyboard Behavior

- `Icon` has no keyboard behavior.

## Focus Behavior

- `Icon` is not focusable by default.

## Screen Reader Semantics

- Decorative icons should remain hidden from assistive technology.
- Meaningful status should not rely on icons alone.

## Form Semantics

- `Icon` is presentational, not form input.

## Accessibility Risks

- using icon-only meaning without text
- assuming every icon needs to be announced
