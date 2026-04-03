# Code Styling

## Overview

`Code` applies a compact inline surface on top of the shared `Text` model.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--code-font-family` | root | inline code font family |
| `--fills-secondary` | root | background fill |
| `--label-secondary` | `--t-color` mapping | code text color |

## Part-Level Variables

### Root

The root sets:

- monospace font fallback through `--code-font-family`
- `background-color: var(--fills-secondary)`
- `--t-color: var(--label-secondary)` for inherited text color

## State And Variant Interaction

- `Code` does not define local state variants.
- Visual changes mainly come from inherited `Text` sizing and global theme tokens.

## Examples

### Inline code token

```tsx
<Code>workspace_slug</Code>
```

## Do Not Override

- removing code semantics and keeping only the chip styling
- using low-contrast background and text combinations
- forcing block-level layout for long snippets instead of switching to a proper code block component
