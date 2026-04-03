# Sheet Styling

## Overview

`Sheet` styling is driven by overlay surface semantics and content layout rather than a large public variable surface. Most changes should preserve the handle, surface separation, and snap-point readability.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--surface-primary` | `SheetContent` | Main sheet surface. |
| `--surface-shadow` | `SheetContent` | Optional elevated shadow. |
| `--separator-opaque` | `SheetHandle` | Handle color. |

## Part-Level Variables

- `SheetContent` uses theme surface tokens plus internal sizing rules.
- `SheetHandle` relies on separator styling semantics.
- `SheetBackdrop` follows the shared overlay token model rather than a sheet-local variable set.

## State And Variant Interaction

- Snap points and closability are interaction contracts.
- Overlay versus no-overlay composition changes presentation.
- Styling should keep the handle visible enough that the sheet still reads as draggable where that behavior exists.

## Examples

```css
.brand-theme {
  --surface-primary: #fffdf9;
  --separator-opaque: rgba(80, 74, 64, 0.35);
}
```

## Do Not Override

- Do not style the handle so subtly that drag affordance disappears.
- Do not treat snap-point behavior as a pure styling concern.
- Do not flatten the sheet surface until it visually merges with page content.
