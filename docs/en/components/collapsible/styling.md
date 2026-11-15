# Collapsible Styling

## Overview

`Collapsible` has a small styling contract centered on content height transitions. The root itself does not expose a large variable surface, so most theming happens through the trigger and surrounding layout.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--transition-state-delay` | `CollapsibleContent` | Height animation duration. |

## Part-Level Variables

- `Collapsible`: root state owner without a dedicated style module.
- `CollapsibleTrigger`: styling comes from the rendered trigger element or `asChild` surface.
- `CollapsibleContent`: owns the height transition, overflow clipping, and hidden-state behavior.

## State And Variant Interaction

- Open and hidden state are related but not identical during transitions.
- `asChild` composition means the visible trigger style often comes from another component, such as `Button`.
- Open content has `height: auto`, so content that grows or shrinks after opening, including nested collapsibles, needs no extra work.

## Examples

<!-- example: collapsible/examples.css -->
```css
.slowCollapsible {
  --transition-state-delay: 220ms;
}
```
<!-- /example -->

<!-- example: collapsible/styling-examples.css -->
```css
.compactDisclosureButton {
  font-size: 14px;
}
```
<!-- /example -->

## Do Not Override

- Do not hide overflow rules if the section still relies on height animation.
- Do not assume trigger styling is owned by `Collapsible` when `asChild` is used.
