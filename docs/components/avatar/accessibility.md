# Avatar Accessibility

## Labeling

If the avatar image conveys identity, the `alt` text should describe the represented entity. If the avatar is decorative, it should be treated as such in the surrounding composition.

## Keyboard Behavior

- Static avatars usually do not need focus.
- If an avatar becomes interactive, the surrounding component should own those semantics.

## Focus Behavior

- Non-interactive avatars should not participate in tab order.

## Screen Reader Semantics

- Image avatars should have meaningful `alt` text when informative.
- Decorative avatars should not create redundant announcements.
- Fallback initials should still make sense in context.

## Form Semantics

- `Avatar` is not a form control.

## Accessibility Risks

- Missing or meaningless `alt` text.
- Decorative avatars announced as if they were informative.
- Fallback text that is too cryptic to interpret in context.
