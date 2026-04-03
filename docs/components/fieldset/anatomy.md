# Fieldset Anatomy

## Overview

`Fieldset` is a small [compound component](../../glossary.md#compound-component). The root provides native group semantics, `FieldsetLegend` names the group, and `FieldsetHeader` adds optional supporting copy.

## Required Parts

### `Fieldset`

Required. Renders the `<fieldset>` element and owns visual appearance.

### `FieldsetLegend`

Required for accessible group labeling. Renders the group name in the native legend slot.

## Optional Parts

### `FieldsetHeader`

Optional descriptive block placed after the legend. Use it for supporting copy, not as a replacement for the legend.

## Composition Order

1. `Fieldset`
2. `FieldsetLegend`
3. `FieldsetHeader`
4. grouped controls

## Valid Composition Patterns

```tsx
<Fieldset appearance='outlined'>
  <FieldsetLegend>Billing</FieldsetLegend>
  <FieldsetHeader>Choose how invoices should be delivered.</FieldsetHeader>
  <Radio name='billing'>Email PDF</Radio>
  <Radio name='billing'>Vendor portal</Radio>
</Fieldset>
```

## Invalid Composition Patterns

### Missing `FieldsetLegend`

The controls remain grouped visually, but the semantic group label disappears.

### Decorative heading outside the root used as the only label

This looks correct visually but does not provide native legend semantics.

### Deeply nested groups without clear copy

Nested fieldsets become hard to understand when legends do not establish a clear hierarchy.
