---
'@vega-ui/react': patch
---

A tooltip group shows one tooltip at a time: moving the pointer to the next trigger hides the previous tooltip at once instead of leaving both on screen for `delayClose`. `TooltipGroup.hold` takes an optional `hide` callback for this.
