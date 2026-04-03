# VisuallyHidden Styling

## Overview

`VisuallyHidden` uses the standard accessible hiding CSS pattern.

## Public CSS Variables

There are no component-local CSS variables in the current implementation.

## Part-Level Variables

### Root

The root uses absolute positioning, 1px box sizing, clipping, and overflow hiding to remove content from the visual layout while preserving accessibility tree presence.

## State And Variant Interaction

- `asChild` changes the rendered element but not the hidden styling behavior

## Examples

### Hidden accessibility-only label

```tsx
<VisuallyHidden>Search</VisuallyHidden>
```

## Do Not Override

- changing the clipping rules in ways that make content visually reappear unexpectedly
- using the class as a generic layout utility unrelated to accessibility
