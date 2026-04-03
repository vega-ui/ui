# Accordion Styling

## Overview

`Accordion` styling is split across the root list, the trigger, the content spacing, and the icon rotation state. The public styling contract is small and relies heavily on theme tokens and inherited typography.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--focus-color` | `AccordionTrigger` | Focus outline color. |
| `--spacing-4` | `AccordionContent` | Open content bottom spacing. |
| `--spacing-6`, `--spacing-7`, `--spacing-8` | `AccordionTrigger` | Size-driven trigger padding. |
| `--transition-state-delay` | `AccordionIcon` | Open and close rotation timing. |

## Part-Level Variables

- `Accordion`: resets list layout and spacing.
- `AccordionTrigger`: controls full-width layout, inherited typography, and focus ring.
- `AccordionContent`: adds open-state spacing rather than owning a large visual surface.
- `AccordionIcon`: rotates on open state and inherits surrounding color.

## State And Variant Interaction

- Size variants map to different trigger paddings.
- Open state mostly affects icon rotation and content spacing rather than colors.
- Rich trigger content should preserve spacing and full-width alignment even when badges or counters are added.

## Examples

```css
.compactAccordion {
  --spacing-6: 12px;
  --spacing-7: 14px;
  --spacing-8: 16px;
}
```

```css
.brandAccordion {
  --focus-color: var(--fills-primary);
  --transition-state-delay: 180ms;
}
```

## Do Not Override

- Do not remove the trigger focus outline without a replacement.
- Do not shrink the trigger hit area until only the text or icon feels clickable.
- Do not treat icon rotation as the only open-state signal if labels are already ambiguous.
