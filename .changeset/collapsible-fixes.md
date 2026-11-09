---
"@vega-ui/react": patch
---

Collapsible fixes:

- Content opened from the parent (`open` prop) now shows and animates, not only after a trigger click
- Open content follows children that grow or shrink after opening, including nested collapsibles and accordions
- Transitions and animations inside the content, and the content's own `onTransitionEnd`, no longer affect hiding it
- `CollapsibleTrigger` accepts button attributes such as `disabled` in its types
