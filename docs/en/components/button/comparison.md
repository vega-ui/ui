# Button Comparison

## Quick Decision Rule

Use `Button` for explicit actions initiated by the user.

## `Button` vs `Link`

Use `Button` when:

- the action mutates state or submits data

Use `Link` when:

- the interaction primarily navigates

Main trade-off: button is action semantics, while link is navigation semantics.

## `Button` vs `ButtonBase`

Use `Button` when:

- product code needs a standard text action surface

Use `ButtonBase` when:

- a lower-level action primitive is needed for custom composition

## Choose This Component When

- The primary job is action, not navigation.
- Visible text helps users understand the action.
- The UI benefits from a standard button surface.
- the component should be the default action choice rather than a low-level primitive
- An icon-only action is needed: use `square` with `aria-label`

## Do Not Choose This Component When

- The primary job is navigation.
- The interaction is really a text link in running copy.
