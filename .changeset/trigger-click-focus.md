---
"@vega-ui/react": patch
---

`DialogTrigger`, `DrawerTrigger`, `SheetTrigger` and the calendar triggers of `DateField`, `DateTimeField` and `DateRangeField` leave the focus to the browser on click, like a native button. In Safari a mouse click no longer focuses the trigger, so the trigger no longer shows a focus ring after the dialog or calendar closes, and the focus returns to the page body as on any native button there; keyboard activation still returns it to the trigger.
