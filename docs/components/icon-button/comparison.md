# IconButton Comparison

## Quick Decision Rule

Use `IconButton` when the action is compact, common, and already recognizable without visible text.

## `IconButton` vs `Button`

Use `IconButton` when:

- space is constrained
- the action is common and recognizable

Use `Button` when:

- visible text improves clarity

Main trade-off: icon button is denser, while button is clearer.

## `IconButton` vs `Link`

Use `IconButton` when:

- the interaction is an action

Use `Link` when:

- the interaction primarily navigates

Main trade-off: icon button is action semantics, while link is navigation semantics.

## `IconButton` vs `ButtonBase`

Use `IconButton` when:

- the product explicitly wants the icon-button size and layout contract

Use `ButtonBase` when:

- a lower-level custom icon action surface is being built

## Choose This Component When

- The action is icon-first and well understood.
- Space is constrained.
- The UI still needs a button-like action surface.
- the action should stay compact without becoming a generic low-level primitive

## Do Not Choose This Component When

- The action meaning is unclear without visible text.
- The interaction primarily navigates.
- A regular button would improve comprehension.
