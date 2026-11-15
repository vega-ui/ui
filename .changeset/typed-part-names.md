---
'@vega-ui/core': patch
'@vega-ui/widgets': patch
---

`state({ parts })` names the parts of a widget, so an action on a part it does not declare, like `act.showPopover('listbx')`, is a type error instead of an action that waits for that part forever. `Action`, `Result` and `Step` take the part names from the snapshot, `act` keeps the literal part name, and a shape without `parts` takes any name as before. The widgets declare their parts.
