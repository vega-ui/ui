---
"@vega-ui/react": minor
---

- The `Dialog` component has been refactored to support a fully composable architecture.
- Added the following subcomponents to allow flexible composition and advanced customization:
    - `DialogTrigger`
    - `DialogPortal`
    - `DialogOverlay`
    - `DialogContent`
    - `DialogHeader`
    - `DialogTitle`
    - `DialogCloseButton`

These additions enable fine-grained control over drawer structure, layout, focus management, and visual presentation, while preserving accessibility, focus trapping, and native interaction patterns