---
'@vega-ui/react': patch
---

`GridCell asChild` leaves the role to a control that a component renders, like a `<button>` from a `Button`, as it already did for a `<button>` written in place, so the control is no longer announced as a gridcell.
