# DataGridSelectable Styling

## Overview

`DataGridSelectable` is mainly behavioral. Its visual contract comes from `DataGrid` and the composed cell renderers rather than a dedicated root CSS module.

## Public CSS Variables

There are no dedicated `--data-grid-selectable-*` public CSS variables in the current implementation.

## Part-Level Variables

### Root

The root inherits layout and matrix styling from `DataGrid`.

### Cells

Selectable visual treatment is usually applied through `DataGridSelectableCell` and any composed higher-level cell content.

## State And Variant Interaction

- Selected, active, and disabled visual states depend on the composed cell layer.
- `DataGridSelectable` changes interaction behavior, not the theme token family.
- Higher-level consumers such as `DataGridPicker`, `DayPicker`, and `MonthPicker` usually define the public visual semantics.

## Examples

### Custom cell shell on top of selectable behavior

```tsx
<DataGridSelectableCell className='availabilityCell' col={0}>
  09:00
</DataGridSelectableCell>
```

## Do Not Override

- inventing a dedicated selectable-grid token API that is not in source
- mixing behavioral expectations into purely visual CSS overrides
- styling cells in ways that hide active, disabled, or selected state
