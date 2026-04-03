# Fieldset Styling

## Overview

`Fieldset` styling is mostly driven by global theme tokens rather than a large component-local CSS-variable contract.

## Public CSS Variables

There are no dedicated public `--fieldset-*` variables in the current implementation.

The component primarily consumes shared system tokens:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--border-color` | `Fieldset` | outlined group border |
| `--label-secondary` | `Fieldset` descendant `.sublegend` | muted supporting legend text |
| `--radius-4` | `Fieldset` | base border radius |
| `--radius-5` | `Fieldset[data-appearance='outlined']` | outlined appearance radius |
| `--spacing-6` | root and header | vertical spacing between grouped elements |
| `--spacing-12`, `--spacing-14` | outlined appearance | responsive inner padding |

## Part-Level Variables

### Root

`Fieldset` uses border, radius, and spacing tokens to establish the group container.

### Header

`FieldsetHeader` is a flex column with bottom spacing before grouped controls.

### Legend

`FieldsetLegend` keeps native legend behavior and only removes default padding.

## State And Variant Interaction

- `outlined` adds border, radius, and responsive padding.
- `transparent` removes border and padding but keeps semantic grouping.
- Disabled styling mostly comes from descendant controls, not from root-specific fieldset tokens.

## Examples

### Use theme tokens to tighten spacing

```tsx
<Fieldset style={{ gap: 'var(--spacing-4)' }}>
  <FieldsetLegend>Compact group</FieldsetLegend>
</Fieldset>
```

### Match surrounding panel radius

```tsx
<Fieldset style={{ borderRadius: 'var(--radius-6)' }}>
  <FieldsetLegend>Billing</FieldsetLegend>
</Fieldset>
```

## Do Not Override

- removing legend semantics with `display: contents`
- relying on `transparent` when a visible boundary is required for comprehension
- styling the root as a generic card instead of a semantic form group
