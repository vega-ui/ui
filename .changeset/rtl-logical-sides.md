---
"@vega-ui/react": patch
---

Right-to-left layouts mirror where they did not; left-to-right looks the same as before.

- `Table` without `edgePadded`: the first and the last cells drop the padding at the start and the end of the row instead of the physical left and right
- `AccordionTrigger` aligns its text to the start instead of the left
- `MeterStackSegment`: the last segment rounds its end corners instead of the right ones
- `AvatarStack`: the cut-out of each avatar faces the previous avatar in right-to-left too
