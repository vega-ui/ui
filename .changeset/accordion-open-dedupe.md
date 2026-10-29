---
"@vega-ui/react": patch
---

Accordion no longer adds an already opened value to `opened` again, so `onChangeOpened` never receives duplicates.
