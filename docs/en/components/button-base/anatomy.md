# ButtonBase Anatomy

## Overview

`ButtonBase` is a single-part action primitive. It does not export structural child parts, but it can hand its behavior and styling to another element through `asChild`.

## Required Parts

- `ButtonBase`: root interactive element that owns styling, focus ring, disabled behavior, and data attributes

## Optional Parts

- slotted child element via `asChild`: use when the final semantic element should be a link or router primitive instead of a native `button`

## Composition Order

1. `ButtonBase`
2. optional child element when `asChild` is enabled

## Valid Composition Patterns

- native button for actions, submits, and resets
- `asChild` with one anchor or router link when the action must navigate
- text-only, icon-only, or mixed content as long as the final accessible name is clear

## Invalid Composition Patterns

- multiple direct children when relying on a single slotted semantic target
- `asChild` with a child that does not accept forwarded props
- treating `ButtonBase` as a complete product button when `Button` or `IconButton` is the clearer public API
