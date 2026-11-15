---
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

`Listbox` and `Select` set `aria-activedescendant` only to an option that exists, so a controlled `active` the items lack no longer points assistive technology at a missing id.
