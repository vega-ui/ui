# Drawer Styling

## Overview

`Drawer` styling is driven mostly by the same semantic surface model as other overlays. Most customization should happen at the theme layer, not by rebuilding the panel layout from scratch.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--surface-primary` | `DrawerContent` | Main drawer surface. |
| `--surface-shadow` | `DrawerContent` | Elevated panel shadow. |

## Part-Level Variables

- `DrawerContent` relies on theme surface tokens plus local sizing and layout rules.
- `DrawerBackdrop` depends more on the shared overlay token model than on drawer-local variables.
- `DrawerHeader`, `DrawerTitle`, and `DrawerCloseButton` should usually inherit the panel surface rather than introduce separate colors.

## State And Variant Interaction

- Overlay versus no-overlay composition changes presentation more than token usage.
- Long content requires layout decisions more than theme overrides.
- If the drawer behaves like a floating inspector, keep contrast and shadow cues strong enough to separate it from page content.

## Examples

```css
.brand-theme {
  --surface-primary: #fffdf9;
  --surface-shadow: 0 24px 64px rgba(20, 18, 14, 0.18);
}
```

## Do Not Override

- Do not restyle the drawer into a page without retesting overlay behavior.
- Do not weaken contrast between surface and backdrop.
- Do not treat layout width and scroll strategy as pure color-theming concerns.
