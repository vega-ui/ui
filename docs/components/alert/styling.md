# Alert Styling

## Overview

`Alert` styling is split across the root semantic surface and lightweight child parts that mostly inherit root color context.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--alert-background-color` | `Alert` | Surface background. |
| `--alert-color` | `Alert`, child parts | Foreground color. |
| `--alert-border-color` | `Alert` | Border treatment. |

## Part-Level Variables

- `Alert`: root message surface.
- `AlertIcon`: inherits semantic color.
- `AlertMain`, `AlertTitle`, `AlertContent`: mostly inherit root text color and layout rhythm.

## State And Variant Interaction

- `variant` changes semantic color family.
- `appearance` changes whether the alert reads as filled or bordered surface.
- Child parts inherit color rather than defining separate visual systems.

## Examples

```css
.brandAlert {
  --alert-border-color: var(--border-color);
}
```

```css
.softAlert {
  --alert-background-color: var(--surface-primary);
}
```

## Do Not Override

- Do not rely on icon color alone to distinguish severity.
- Do not restyle alert into a card-like layout surface without reconsidering component choice.
- Do not remove enough contrast that feedback severity becomes ambiguous.
