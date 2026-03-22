# @vega-ui/theme-core

## 2.3.0

### Minor Changes

- 064d8c0: ### @vega-ui/tokens-core

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

### Patch Changes

- Updated dependencies [f5dd762]
- Updated dependencies [1dc9de6]
- Updated dependencies [064d8c0]
  - @vega-ui/tokens-core@2.3.0

## 2.2.1

### Patch Changes

- 160db7b: Changed surface ultrathin color
- 0260c02: Changed surface thin color
  - @vega-ui/tokens-core@2.2.1

## 2.2.0

### Patch Changes

- @vega-ui/tokens-core@2.2.0

## 2.1.1

### Patch Changes

- @vega-ui/tokens-core@2.1.1

## 2.1.0

### Patch Changes

- @vega-ui/tokens-core@2.1.0

## 2.0.1

### Patch Changes

- @vega-ui/tokens-core@2.0.1

## 2.0.0

### Minor Changes

- eab55a8: The responsive-ui package is no longer supported due to inconsistencies in the overall component design approach

  The components that the responsive ui package contained are easily implemented using the composition of existing ones and do not require the support and development of a separate package

### Patch Changes

- Updated dependencies [31b2b94]
- Updated dependencies [eab55a8]
  - @vega-ui/tokens-core@2.0.0

## 1.14.3

### Patch Changes

- @vega-ui/tokens-core@1.14.3

## 1.14.2

### Patch Changes

- 55809c0: Changed deps
- Updated dependencies [55809c0]
  - @vega-ui/tokens-core@1.14.2

## 1.14.1

### Patch Changes

- @vega-ui/tokens-core@1.14.1

## 1.14.0

### Patch Changes

- @vega-ui/tokens-core@1.14.0

## 1.13.0

### Patch Changes

- @vega-ui/tokens-core@1.13.0

## 1.12.4

### Patch Changes

- @vega-ui/tokens-core@1.12.4

## 1.12.3

### Patch Changes

- @vega-ui/tokens-core@1.12.3

## 1.12.2

### Patch Changes

- @vega-ui/tokens-core@1.12.2

## 1.12.1

### Patch Changes

- @vega-ui/tokens-core@1.12.1

## 1.12.0

### Patch Changes

- Updated dependencies [30e9724]
  - @vega-ui/tokens-core@1.12.0

## 1.11.4

### Patch Changes

- @vega-ui/tokens-core@1.11.4

## 1.11.3

### Patch Changes

- Updated dependencies [0392555]
  - @vega-ui/tokens-core@1.11.3

## 1.11.2

### Patch Changes

- 61a382b: The gray colors have been changed, the surface has been added, and the fields styles have also been changed
- Updated dependencies [61a382b]
  - @vega-ui/tokens-core@1.11.2

## 1.11.1

### Patch Changes

- @vega-ui/tokens-core@1.11.1

## 1.11.0

### Patch Changes

- @vega-ui/tokens-core@1.11.0

## 1.10.1

### Patch Changes

- 458fc95: Made surface color (dark theme) more contrast
  - @vega-ui/tokens-core@1.10.1

## 1.10.0

### Patch Changes

- @vega-ui/tokens-core@1.10.0

## 1.9.0

### Minor Changes

- c90a0c1: Added new packages - tokens and theme

### Patch Changes

- Updated dependencies [c90a0c1]
  - @vega-ui/tokens-core@1.9.0
