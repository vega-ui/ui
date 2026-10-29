---
"@vega-ui/react": patch
---

`DialogTrigger`, `DrawerTrigger`, `SheetTrigger`, `PopoverTrigger`, `TooltipTrigger` and `Option` render `type="button"`, so clicking them inside a form no longer submits it. A `type` prop still overrides it, and `asChild` leaves the child element untouched
