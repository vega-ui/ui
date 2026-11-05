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

A dense filter panel overrides `gap` and `padding` with spacing tokens and pairs them with a smaller legend and `size='sm'` checkboxes.

<!-- example: fieldset/use-theme-tokens-to-tighten-spacing.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const COLUMNS = ['Status', 'Owner', 'Due date', 'Priority', 'Last updated'];

export default function UseThemeTokensToTightenSpacing() {
  return (
    <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-3)', padding: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <FieldsetLegend size={3}>Visible columns</FieldsetLegend>
      {COLUMNS.map((column) => (
        <Checkbox key={column} size='sm' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput name='columns' value={column} defaultChecked />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          {column}
        </Checkbox>
      ))}
    </Fieldset>
  );
}
```
<!-- /example -->

### Match surrounding panel radius

Inside a rounded panel, give the fieldset a smaller radius than the panel, so the corners stay concentric.

<!-- example: fieldset/match-surrounding-panel-radius.tsx -->
```tsx
import { Fieldset, FieldsetLegend, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function MatchSurroundingPanelRadius() {
  const id = useId();

  return (
    <div style={{ padding: 'var(--spacing-8)', borderRadius: 'var(--radius-6)', background: 'var(--fills-quaternary)', width: '100%' }}>
      <Fieldset appearance='outlined' style={{ borderRadius: 'var(--radius-4)' }}>
        <FieldsetLegend>Billing contact</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={id}>Invoice email</Label>
          <TextField>
            <TextFieldInput id={id} type='email' name='invoiceEmail' defaultValue='ap@northwind.io' />
          </TextField>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- removing legend semantics with `display: contents`
- relying on `transparent` when a visible boundary is required for comprehension
- styling the root as a generic card instead of a semantic form group
