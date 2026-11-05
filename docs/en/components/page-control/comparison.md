# PageControl Comparison

## Quick Decision Rule

Use `PageControl` for short sequences like onboarding steps or carousels. Use `Pagination` for real page navigation across result sets.

## `PageControl` vs `Pagination`

- Use `PageControl` for short, compact sequences.
- Use `Pagination` for explicit page numbers and dataset navigation.

## `PageControl` vs `Stepper`

- Use `PageControl` when indicators are intentionally minimal.
- Use a fuller stepper pattern when step labels and richer status matter.

## Choose This Component When

- the sequence is short
- compact indicators are enough

## Do Not Choose This Component When

- users need page numbers or routeable destinations
- each step requires visible labels and richer state
