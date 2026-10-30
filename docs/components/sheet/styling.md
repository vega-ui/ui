# Sheet Styling

## Overview

`Sheet` styling is driven by overlay surface semantics and content layout rather than a large public variable surface. Most changes should preserve the handle, surface separation, and snap-point readability.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--surface-primary` | `SheetContent` | Main sheet surface. |
| `--surface-shadow` | `SheetContent` | Optional elevated shadow. |
| `--separator-opaque` | `SheetHandle` | Handle color. |
| `--overlay` | `SheetContent::backdrop` | Backdrop dimming. |
| `--sheet-inset` | `SheetContent` | Gap at the sides and the bottom while the sheet rests below the top of the viewport; `0` keeps the sheet full width. |

## Part-Level Variables

- `SheetContent` uses theme surface tokens plus internal sizing rules. It is a flex column with horizontal padding `clamp(var(--spacing-12), 3vw, var(--spacing-16))` and bottom padding `var(--spacing-12)` plus the safe-area inset, so content needs no wrapper; a scrollable region is an element with `overflow: auto`.
- `SheetHandle` relies on separator styling semantics.
- The backdrop is the `::backdrop` of `SheetContent`. It uses `--overlay`, a blur when `blurred` is `true`, and no background when `overlay` is `false`. Style it through the `SheetContent` class (`.my-sheet::backdrop`).
- Like an iOS sheet, `SheetContent` floats as a card with rounded corners, `--sheet-inset` (default `var(--spacing-8)`) clear of the sides and the bottom, while it rests below the top of the viewport, and widens to the edges as it rises to the top. At a lower snap point the part below the gap is clipped, so the card grows from its bottom edge as it rises. Set `--sheet-inset: 0` to keep it full width. While clipped, `shadowed` shows no shadow. A sheet as tall as the viewport is always full width.
- `SheetContent` sets `--sheet-expansion` on itself: `0` at its lowest position and `1` when its top reaches the top of the viewport, following the drag. Use it for your own styles that change as the sheet rises, and read `data-dragging` to skip transitions while the finger moves.

```css
.full-width-sheet {
  --sheet-inset: 0;
}

.sheet-with-fading-corners {
  border-top-left-radius: calc(var(--radius-6) * (1 - var(--sheet-expansion)));
  border-top-right-radius: calc(var(--radius-6) * (1 - var(--sheet-expansion)));
}
```

## State And Variant Interaction

- Snap points and closability are interaction contracts.
- `overlay={false}` and `blurred={false}` on `SheetContent` change the backdrop presentation, not the modal behavior.
- Styling should keep the handle visible enough that the sheet still reads as draggable where that behavior exists.

## Examples

```css
.brand-theme {
  --surface-primary: #fffdf9;
  --separator-opaque: rgba(80, 74, 64, 0.35);
}
```

### Apple-like header

The header with a small title and a 24px round close button in the corner is plain composition: a `Heading` with `size={4}` and `fontWeight={600}`, and `SheetClose asChild` around an `IconButton` placed absolutely in the top end corner (`position: absolute`, `insetBlockStart: 16`, `insetInlineEnd: 16`); the open modal `<dialog>` is its containing block. `IconButton` has no size or shape option for this; the round 24px button comes from two CSS variables set on it, `--icon-button-size: 24px` and `--icon-button-br-ratio: 0.5`, with `Icon size='xs'` inside.

## Do Not Override

- Do not style the handle so subtly that drag affordance disappears.
- Do not treat snap-point behavior as a pure styling concern.
- Do not flatten the sheet surface until it visually merges with page content.
