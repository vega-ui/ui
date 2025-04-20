---
"@adara-cs/responsive-ui": minor
"@adara-cs/ui-kit-web": minor
---

🎨 Color system

The color palette has been completely updated:

All existing variables have been replaced with a new color system with a range of shades from 0 to 1000 (step 50).

Previously used colors blue, red, green, purple, yellow have been removed and replaced.

The yellow color has been renamed to orange and replaced with the corresponding new palette.

New color palettes have been added:

amber
amethyst
beryl
graphite
nephritis
pink
ruby
sapphirine
smoke
topaz

New variable structure — for each color are used:

--color-[name]-[0–1000]
--color-[name]-accent-[0–1000]

Added visual documentation to Storybook:

All 21 shades for each color (0-1000) are displayed.

The ColorPalette and ColorItem from @storybook/blocks are used.

🧪 Component states

Updated styles of field component states (checkbox, input, radio, textarea, etc.):

Adjusted to the new color system.
The colors of the states (hover, focus, disabled, error, success) have been revised:
focus now uses the current accent variables.
error — from the red palette, success — from the green palette, warning — orange.

The focus and outline tokens have been updated.
