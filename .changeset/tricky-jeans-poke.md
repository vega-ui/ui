---
"@vega-ui/tokens-core": minor
"@vega-ui/theme-core": minor
"@vega-ui/react": minor
---

### @vega-ui/tokens-core

Complete overhaul of the color palette:
- Colors migrated from `color-mix(in oklch, var(--color-red) X%, white/black)` to direct `oklch()` values for more predictable perceptual color space
- Removed intermediate steps (50, 150, 250, 350, 450, 550, 650, 750, 850, 950) — scale simplified to 11 steps: 0–100–200–…–1000

### @vega-ui/theme-core

Complete overhaul of semantic tokens in `light.css` / `dark.css`:
- Added fill tokens: `--fills-primary/secondary/tertiary/quaternary` with hover/active states
- Added label tokens: `--label-primary/secondary/tertiary/quaternary`
- Added surface tokens: `--surface-ultrathin/thin/regular/thick/ultrathick`
- Added separator tokens: `--separator-opaque/non-opaque`
- Added border tokens: `--border-color` with hover/active states
- Added disabled state tokens: `--disable-*`
- Added color accent tokens: `--color-*-accent-*` — palette is automatically inverted in dark mode
- Renamed: `--text-inverce-color` → `--text-color-inverce`

### @vega-ui/react

- All components migrated to new semantic tokens from the theme
- Removed direct color token references in components, replaced with semantic variables
