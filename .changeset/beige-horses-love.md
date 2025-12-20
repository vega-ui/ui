---
"@vega-ui/react": minor
---

- The `Drawer` component has been refactored to support a fully composable architecture.
- Added the following subcomponents to allow flexible composition and advanced customization:
    - `DrawerTrigger`
    - `DrawerPortal`
    - `DrawerOverlay`
    - `DrawerContent`
    - `DrawerHeader`
    - `DrawerTitle`
    - `DrawerCloseButton`

These additions enable fine-grained control over drawer structure, layout, focus management, and visual presentation, while preserving accessibility, focus trapping, and native interaction patterns