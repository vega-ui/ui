# ButtonBase Comparison

## Quick Decision Rule

Choose `ButtonBase` only when the product needs the lowest shared action primitive. For normal product buttons, prefer `Button` or `IconButton`.

## `ButtonBase` vs `Button`

Use `ButtonBase` when you need raw action styling with custom structure.

Use `Button` when product code should express a standard text button with the higher-level public API.

## `ButtonBase` vs `IconButton`

Use `ButtonBase` when icon-only layout is custom or not the main intent.

Use `IconButton` when the action is primarily icon-first and should follow the icon-button size contract.

## `ButtonBase` vs `Link`

Use `ButtonBase` when the interaction is an action.

Use `Link` when the interaction is navigation and should keep link semantics.

## Choose This Component When

- a custom action component still needs VegaUI button styling
- `asChild` is necessary for a router or anchor primitive
- higher-level button layout APIs would get in the way

## Do Not Choose This Component When

- the product just needs a standard button
- the interaction is clearly a text link
- consumers should not have to reason about low-level semantics and `type`
