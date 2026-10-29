---
"@vega-ui/react": patch
---

`DrawerContent` now lets its own props win over the drawer's internal floating props, like `DialogContent` and `SheetContent`. A `role` passed to `DrawerContent` is no longer replaced by `dialog`, and internal event handlers run before yours.
