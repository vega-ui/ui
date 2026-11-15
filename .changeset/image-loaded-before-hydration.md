---
'@vega-ui/core': patch
'@vega-ui/react': patch
---

An image root that loaded or failed before its widget connected, for example during server-side rendering before hydration, is now reported to the widget. `AvatarImage` rendered on the server shows its photo after hydration, or its `fallbackSrc` if the photo failed, instead of staying hidden.
