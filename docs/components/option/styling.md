# Option Styling

## Overview

`Option` styling is token-driven and centered around row height, text color, and state-specific background colors.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--option-height` | root | row height |
| `--option-br-ratio` | root | radius ratio |
| `--option-color` | root | text color |
| `--option-background-color` | root | default background |
| `--option-background-color-hover` | root | hover background |
| `--option-background-color-active` | root | active background |

## Part-Level Variables

### Root

The root maps size to row height, padding, and text scale. Selected state remaps color and background tokens to the primary palette.

## State And Variant Interaction

- size controls height and typography
- `aria-selected='true'` remaps the option to primary selected colors
- disabled state keeps the row non-interactive

## Examples

### Selected option surface

```tsx
<Option value='pro' selected>
  Pro
</Option>
```

## Do Not Override

- making selected and unselected rows visually indistinguishable
- nesting competing interactive elements inside the row
