# Drawer Styling

## Overview

`Drawer` styling is driven mostly by the same semantic surface model as other overlays. Most customization should happen at the theme layer, not by rebuilding the panel layout from scratch.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--surface-primary` | `DrawerContent` | Main drawer surface. |
| `--surface-shadow` | `DrawerContent` | Elevated panel shadow. |
| `--overlay` | `DrawerContent::backdrop` | Backdrop dimming. |

## Part-Level Variables

- `DrawerContent` relies on theme surface tokens plus local sizing and layout rules.
- The backdrop is the `::backdrop` of `DrawerContent`. It uses `--overlay`, a blur when `blurred` is `true`, and no background when `overlay` is `false`. Style it through the `DrawerContent` class (`.my-drawer::backdrop`).
- Headings and close buttons inside `DrawerContent` should usually inherit the panel surface rather than introduce separate colors.

## State And Variant Interaction

- `overlay={false}` and `blurred={false}` on `DrawerContent` change the backdrop presentation, not the modal behavior.
- Long content requires layout decisions more than theme overrides.
- If the drawer behaves like a floating inspector, keep contrast and shadow cues strong enough to separate it from page content.

## Examples

```css
.brand-theme {
  --surface-primary: #fffdf9;
  --surface-shadow: 0 24px 64px rgba(20, 18, 14, 0.18);
}
```

### Apple-like header

The header with a small title and a 24px round close button in the corner is plain composition: a `Heading` with `size={4}` and `fontWeight={600}`, and `DrawerClose asChild` around an `IconButton` placed absolutely in the top end corner (`position: absolute`, `insetBlockStart: 16`, `insetInlineEnd: 16`); the open modal `<dialog>` is its containing block. `IconButton` has no size or shape option for this; the round 24px button comes from two CSS variables set on it, `--icon-button-size: 24px` and `--icon-button-br-ratio: 0.5`, with `Icon size='xs'` inside.

## Do Not Override

- Do not restyle the drawer into a page without retesting overlay behavior.
- Do not weaken contrast between surface and backdrop.
- Do not treat layout width and scroll strategy as pure color-theming concerns.
