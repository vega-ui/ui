# Icon Comparison

## Quick Decision Rule

Use `Icon` to render SVGs with VegaUI sizing and color behavior. Use text or labels when the meaning should be explicit rather than purely visual.

## `Icon` vs raw SVG

- Use `Icon` for consistent sizing and color inheritance.
- Use raw SVG only when you intentionally want to bypass the shared icon contract.

## `Icon` vs `Avatar`

- Use `Icon` for symbolic graphics.
- Use `Avatar` for people or entity identity.

## Choose This Component When

- you need one scalable SVG glyph
- sizing should follow VegaUI icon tokens

## Do Not Choose This Component When

- the UI needs a full labeled status on its own
- the content is not really an SVG icon
