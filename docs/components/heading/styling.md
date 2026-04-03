# Heading Styling

## Overview

`Heading` is driven by theme typography tokens and a size-specific heading line-height scale.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--heading-font-family` | root | heading font family |
| `--heading-font-weight` | root | default heading weight |
| `--text-color` | root | default heading color |
| `--text-font-size-1` ... `--text-font-size-11` | size scale | visual size mapping |
| `--heading-line-height-1` ... `--heading-line-height-11` | size scale | heading line-height mapping |

## Part-Level Variables

### Root

The root consumes:

- `--heading-font-family`
- `--heading-font-weight`
- `--text-color`
- size-specific font-size and heading line-height tokens

## State And Variant Interaction

- `data-size` changes the visual scale
- `data-font-weight` overrides the default heading weight
- semantic level is controlled by `as`, not by CSS

## Examples

### Emphasized section title

```tsx
<Heading as='h2' size={6} style={{ color: 'var(--text-color)' }}>
  Access control
</Heading>
```

## Do Not Override

- using arbitrary font sizes outside the heading scale
- relying on color alone to communicate heading hierarchy
