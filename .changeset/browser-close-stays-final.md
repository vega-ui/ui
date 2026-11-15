---
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**A list or sheet the browser closed stays closed.** When the browser closed the list of a controlled `Select` (outside click, `Escape`) or a controlled `Sheet`, `Drawer` or `Dialog`, and the parent kept `open` true, a change of another prop, like the `value` of the `Select` or the `activeSnapPoint` of the `Sheet`, showed it again. It now shows again only when `open` changes, as the docs say, or, for a `Select`, when it becomes enabled.
