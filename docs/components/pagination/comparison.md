# Pagination Comparison

## Quick Decision Rule

Use `Pagination` for explicit page navigation across discrete result sets. Use `PageControl` for short carousel/step indicators and consider other patterns when the data is better served by infinite scroll or filters.

## `Pagination` vs `PageControl`

- Use `Pagination` for result pages.
- Use `PageControl` for short step or carousel indicators.

## `Pagination` vs infinite scroll

- Use `Pagination` when users need stable page positions and direct navigation.
- Use infinite scroll when seamless browsing matters more than discrete page boundaries.

## Choose This Component When

- users navigate explicit page numbers or page boundaries
- routes or server queries map naturally to pages

## Do Not Choose This Component When

- the interaction is a short carousel or onboarding stepper
- page numbers do not carry meaningful value in the product
