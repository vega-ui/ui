# Avatar Comparison

## Quick Decision Rule

Use `Avatar` when the UI needs a compact person or entity representation.

## `Avatar` vs `Badge`

Use `Avatar` when:

- the element represents a person or entity identity

Use `Badge` when:

- the element is a compact status or category label

Main trade-off: avatar represents identity, while badge represents metadata.

## `Avatar` vs `Icon`

Use `Avatar` when:

- the UI needs an identity surface with size, shape, and fallback handling

Use `Icon` when:

- only a glyph is needed without avatar semantics

Main trade-off: avatar is an identity container, while icon is just a glyph.

## `Avatar` vs `AvatarStack`

Use `Avatar` when:

- one person or entity is being represented

Use `AvatarStack` when:

- several identities should be compressed into one grouped display

## Choose This Component When

- Identity representation matters.
- Fallback behavior is needed.
- The UI benefits from a bounded avatar surface.
- one entity, not a group, is the main thing being shown

## Do Not Choose This Component When

- The element is just a status label.
- Only a plain icon is needed.
- The represented entity has no reason to be surfaced visually.
