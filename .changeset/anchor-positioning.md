---
'@vega-ui/react': major
---

Popover, Select and Tooltip are positioned with CSS anchor positioning instead of Floating UI.

- `@floating-ui/react` is no longer a dependency. The browser keeps the content next to its trigger while the page scrolls or resizes, flips it to the opposite side and shifts it into the viewport, without a script.
- The minimum browsers are now Chrome and Edge 129, Safari 26 and Firefox 147. In older browsers the content still opens, but in the middle of the screen.
- `TooltipArrow` and `TooltipArrowProps` are removed. The tooltip now sits 10px from its trigger instead of 14px.
- `Placement` is the library's own type with the same values as before.
- `data-side` on `PopoverContent` and `TooltipContent` is the preferred side from `placement`, not the side the content flipped to.
