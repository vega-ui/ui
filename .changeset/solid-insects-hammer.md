---
"@vega-ui/tokens-core": patch
"@vega-ui/theme-core": patch
"@vega-ui/react": patch
---

Refactored color system and semantic tokens

- Updated color palette in `@vega-ui/tokens-core`: revised oklch values across all color scales for better perceptual uniformity
- Replaced static surface tokens (`surface-ultrathin` … `surface-ultrathick`) with `surface-primary` / `surface-secondary` in both light and dark themes
- Tweaked fill token chroma/lightness values in light and dark themes for improved contrast
- Button ghost/transparent hover and active backgrounds now use `oklch(from …)` relative color syntax instead of hardcoded palette steps, making them automatically adapt to any primary/secondary accent color
- Added Playground story showcasing Badge, Button, Alert, Checkbox, Radio, Avatar, SegmentedControl and Slider in a single view
