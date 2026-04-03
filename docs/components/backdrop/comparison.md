# Backdrop Comparison

## Quick Decision Rule

Use `Backdrop` when you need only the background overlay layer. Use `Dialog`, `Drawer`, or `Sheet` when you need a complete overlay pattern.

## `Backdrop` vs `Dialog`

- Use `Backdrop` for custom low-level overlay composition.
- Use `Dialog` for a complete modal pattern.

## `Backdrop` vs `Drawer`

- Use `Backdrop` when only the background layer is needed.
- Use `Drawer` when a side panel plus overlay contract is needed.

## Choose This Component When

- you are building a custom overlay pattern
- you specifically need the background layer and scroll lock behavior

## Do Not Choose This Component When

- you need a full modal interaction contract
- you do not want to manage focus and dismissal yourself
