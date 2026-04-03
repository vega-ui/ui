# Calendar Styling

## Overview

`Calendar` styling is distributed across header controls, content sizing, and picker-family layouts. Most customization should start at the theme level.

## Public CSS Variables

The current implementation exposes more sizing and layout behavior than stable `--calendar-*` hooks. Treat theme tokens and documented size props as the primary styling surface.

| Variable | Used By | Purpose |
| --- | --- | --- |
| spacing tokens | `CalendarContent` | size-dependent layout width |
| transition tokens | picker families and nav buttons | animated view changes |
| button tokens | picker buttons | inherited button-like sizing |

## Part-Level Variables

### Content

`CalendarContent` derives min-width from spacing tokens per size.

### Navigation Buttons

Navigation buttons rely on transition tokens and shared button styling patterns.

### Picker Families

Day, month, and year picker families animate view changes through shared transition tokens.

## State And Variant Interaction

- `compact` changes density expectations
- size changes the content width and picker spacing
- custom day-cell rendering affects perceived density more than root styling does

## Examples

### Theme-first calendar tuning

```css
.brand-theme {
  --surface-primary: #fffdf9;
  --focus-color: var(--color-orange-accent-400);
}
```

### Dense embedded calendar

```tsx
<Calendar compact size='sm' />
```

## Do Not Override

- do not invent undocumented `--calendar-*` variables as if they were public API
- do not restyle custom date cells in a way that hides focus or disabled state
