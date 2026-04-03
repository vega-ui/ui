# AvatarStack Accessibility

## Labeling

- The surrounding UI should explain what the group of avatars represents, such as reviewers, assignees, or participants.

## Keyboard Behavior

- `AvatarStack` itself has no keyboard behavior unless the contained avatars are interactive.

## Focus Behavior

- Focus behavior is inherited from the underlying avatar content if it is interactive.

## Screen Reader Semantics

- Provide meaningful `alt` text for avatar images when appropriate.
- Fallback initials alone may not fully identify the represented person.

## Form Semantics

- `AvatarStack` is display-only, not form input.

## Accessibility Risks

- no surrounding context for what the group represents
- ambiguous fallback initials without accessible naming elsewhere
