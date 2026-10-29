---
"@vega-ui/react": patch
---

PageControlProgress cancels its progress animation frame when the item stops being active or unmounts, so stale loops no longer overwrite its progress value.
