---
'@vega-ui/core': patch
'@vega-ui/react': patch
---

A `<textarea>` or a `contenteditable` element inside a component keeps ArrowUp, ArrowDown, PageUp, PageDown and Enter, so the caret moves between lines and Enter starts a new line. Before, a `Grid`, `Listbox` or another component with keyboard navigation took these keys and moved its own focus instead.
