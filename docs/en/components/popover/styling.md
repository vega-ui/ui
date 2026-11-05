# Popover Styling

## Overview

`Popover` styling is based mainly on floating surface semantics. Most customization should preserve the sense that the content is brief, elevated, and anchored.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--surface-primary` | `PopoverContent` | Popover surface. |
| `--surface-shadow` | `PopoverContent` | Floating elevation. |

## Part-Level Variables

- `PopoverContent` uses floating-surface theme semantics rather than a large `--popover-*` variable set.

## State And Variant Interaction

- Content density often has more impact than token changes, so spacing and width choices matter as much as color.

## Examples

<!-- example: popover/examples.css -->
```css
.brand-theme {
  --surface-primary: oklch(99.2% 0.006 80);
  --surface-shadow: 0 20px 60px oklch(20% 0.02 60 / 0.14);
}
```
<!-- /example -->

## Do Not Override

- Do not restyle the popover into a pseudo-dialog without changing the component choice itself.
- Do not flatten the shadow and surface contrast until the floating layer loses its anchor-like feel.
