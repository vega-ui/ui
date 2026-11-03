---
'@vega-ui/react': patch
---

`Sheet` animates its release, opening and closing through its registered `--sheet-*` variables instead of `transform` and `clip-path`, so the clip, the surface and the position stay in sync, and the bottom edge no longer jerks at snap points. The sheet no longer widens while it opens. `--sheet-inset` and `--sheet-background` must now be set on `SheetContent` itself: a value from an ancestor no longer reaches them
