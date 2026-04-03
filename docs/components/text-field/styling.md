# TextField Styling

## Overview

`TextField` styling is split between the wrapper and the input. The root controls container height and surface state, while `TextFieldInput` controls padding, typography, and placeholder styling.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--input-height` | wrapper and children | shared field height |
| `--input-br-ratio` | wrapper | border-radius ratio |
| `--fills-tertiary` | wrapper | default field surface |
| `--fills-tertiary-hover` | wrapper | hover surface |
| `--color-primary-500` | wrapper | focus outline |
| `--color-error` | wrapper | error outline |
| `--disable-background-color` | wrapper | disabled surface |

## Part-Level Variables

### Root

The wrapper defines `--input-height` by size and applies surface, focus, error, and disabled states.

### Input

`TextFieldInput` inherits the wrapper radius and uses text tokens for padding, font size, text color, and placeholder color.

## State And Variant Interaction

- size sets `--input-height` and input typography
- wrapper hover is driven by `:has(input:hover)`
- focus is driven by `:has(input:focus-visible)`
- disabled state is driven by `:has(input:disabled)`

## Examples

### Larger field density

```tsx
<TextField size='lg'>
  <TextFieldInput placeholder='Workspace name' />
</TextField>
```

## Do Not Override

- breaking the wrapper/input height relationship
- overriding disabled colors so disabled fields remain visually interactive
- adding prefix or suffix elements without checking focus and spacing
