# Option Comparison

## Quick Decision Rule

Use `Option` when building a list-like selector surface that should match VegaUI option styling. Use `Button` for generic actions and `SelectOption` when you already have a complete `Select` composition.

## `Option` vs `Button`

- Use `Option` for selectable list rows.
- Use `Button` for direct actions.

## `Option` vs `SelectOption`

- Use `Option` when building a custom selector primitive.
- Use `SelectOption` inside the full `Select` subsystem.

## Choose This Component When

- you need a reusable presentational option row
- the parent pattern already owns selection logic

## Do Not Choose This Component When

- you need a full selector system without extra work
- the row is really an action, not a selectable option
