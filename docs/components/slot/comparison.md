# Slot Comparison

## Quick Decision Rule

Use `Slot` only when you are building low-level polymorphic composition. Prefer higher-level `asChild` APIs in normal product code.

## `Slot` vs `asChild` on components

- Use `Slot` when authoring primitives or wrappers.
- Use `asChild` on existing VegaUI components in product code.

## `Slot` vs direct element rendering

- Use direct rendering when you do not need prop merging.
- Use `Slot` when parent props must be merged into a chosen child element.

## Choose This Component When

- you are extending design-system internals
- you need one-child prop merging semantics

## Do Not Choose This Component When

- a component already exposes `asChild`
- you just need a normal element
