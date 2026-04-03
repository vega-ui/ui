# Link Styling

## Overview

`Link` styling is concentrated in one text-level surface with color, underline, underline offset, and focus behavior.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--focus-color` | `Link` | Focus outline color. |
| `--transition-state-delay` | `Link` | Hover and focus transition timing. |

## Part-Level Variables

- `Link`: owns color, underline, underline offset, hover, and focus styling.

## State And Variant Interaction

- Hover changes color and underline offset.
- Focus-visible adds an outline.
- `asChild` preserves the same styling while delegating rendering.

## Examples

```css
.brandLink {
  --focus-color: var(--fills-primary);
}
```

```css
.subtleLink {
  text-underline-offset: 0.1em;
}
```

## Do Not Override

- Do not remove focus visibility without a replacement.
- Do not suppress underline or hover feedback until the element stops reading like a link.
- Do not use link styling as a substitute for button semantics.
