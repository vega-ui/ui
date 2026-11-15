---
"@vega-ui/utils": patch
"@vega-ui/react": patch
---

- `mergeProps` passes a single `ref` through as is and adds no `ref` when none is given. Before, it always created a merged callback ref, so server components such as `Icon`, `Code` and any `asChild` part failed in React Server Components with "Refs cannot be used in Server Components"
- `AvatarStackItem` cuts its overlap with a plain circle mask, so the avatars after the first show in Safari again. Chromium and Firefox render the same pixels as before
- `AccordionIcon` no longer shrinks to zero width next to a long title
