---
'@vega-ui/react': patch
---

Fix a Select list that kept opening above the trigger in Chrome and Safari after it had once flipped up for lack of space below. The closed list is now `display: none`, so the browser picks the side again on every opening, and the opening and closing animations stay as they were.
