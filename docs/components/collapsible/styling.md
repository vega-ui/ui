# Collapsible Styling

## Overview

`Collapsible` has a small styling contract centered on content height transitions. The root itself does not expose a large variable surface, so most theming happens through the trigger and surrounding layout.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--transition-state-delay` | `CollapsibleContent` | Height transition timing. |
| `--content-height` | `CollapsibleContent` | Measured content height used during open transition. |

## Part-Level Variables

- `Collapsible`: root state owner without a dedicated style module.
- `CollapsibleTrigger`: styling comes from the rendered trigger element or `asChild` surface.
- `CollapsibleContent`: owns the height transition, overflow clipping, and hidden-state behavior.

## State And Variant Interaction

- Open and hidden state are related but not identical during transitions.
- `asChild` composition means the visible trigger style often comes from another component, such as `Button`.
- Dynamic content size can change the effective transition behavior if the content grows after first render.

## Examples

```css
.slowCollapsible {
  --transition-state-delay: 220ms;
}
```

```css
.compactDisclosureButton {
  font-size: 14px;
}
```

## Do Not Override

- Do not hard-code `--content-height`; it is measured at runtime.
- Do not hide overflow rules if the section still relies on height animation.
- Do not assume trigger styling is owned by `Collapsible` when `asChild` is used.
