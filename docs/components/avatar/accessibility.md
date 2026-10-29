# Avatar Accessibility

## Labeling

If the avatar image conveys identity, the `alt` text should describe the represented entity. If the avatar is decorative, it should be treated as such in the surrounding composition.

`Avatar` adds no role or label to its root, because the right semantics depend on the content and the surrounding composition.

- An image avatar is labeled by the `alt` of `AvatarImage`, for example `alt='Jane Doe'`.
- An initials or icon avatar that identifies someone takes `role='img'` and `aria-label` on `Avatar`, for example `<Avatar role='img' aria-label='Jane Doe'>`. Add `aria-hidden` to `AvatarFallback` so the initials are not read on their own. `AvatarIcon` is already hidden from assistive technology.
- A decorative avatar next to a visible name takes `alt=''` on `AvatarImage`, or `aria-hidden` on `Avatar` when it shows initials or an icon.

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
