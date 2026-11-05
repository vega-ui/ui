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

A seat map styled entirely from the outside: the selectable cell exposes `aria-selected` and `aria-disabled`, and the stylesheet targets them together with `:focus-visible`. Disabled cells also get `pointer-events: none`, like `DataGridPickerItem` does.

<!-- example: data-grid-selectable/custom-cell-shell-on-top-of-selectable-behavior.tsx -->
```tsx
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

const rows = ['A', 'B', 'C'];
const seats = [1, 2, 3, 4, 5, 6];
const taken = ['A3', 'A4', 'B1', 'C6'];

export default function CustomCellShellOnTopOfSelectableBehavior() {
  return (
    <DataGridSelectable
      aria-label='Seats'
      aria-multiselectable='true'
      selection='multiple'
      disabled={taken}
      defaultSelected={['B3', 'B4']}
      defaultActive='B3'
      className='selectableGrid seatMap'
    >
      <DataGridSelectableRowGroup>
        {rows.map((row, rowIndex) => (
          <DataGridSelectableRow key={row} row={rowIndex}>
            {seats.map((seat, col) => (
              <DataGridSelectableCell key={seat} col={col} cellKey={`${row}${seat}`}>
                {`${row}${seat}`}
              </DataGridSelectableCell>
            ))}
          </DataGridSelectableRow>
        ))}
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}
```
<!-- /example -->

### Example stylesheet

Shared by the DataGridSelectable examples.

<!-- example: data-grid-selectable/examples.css -->
```css
.selectableGrid {
  inline-size: fit-content;
  gap: var(--spacing-2);
  font-size: var(--font-size-2);
  color: var(--label-primary);
}

.selectableGrid [role='row'] {
  gap: var(--spacing-2);
  grid-auto-columns: minmax(64px, auto);
}

.selectableGrid [role='gridcell'],
.selectableGrid [role='columnheader'],
.selectableGrid [role='rowheader'] {
  min-block-size: var(--spacing-20);
  padding-inline: var(--spacing-4);
  border-radius: var(--radius-2);
}

.selectableGrid [role='gridcell'] {
  cursor: pointer;
  background: var(--fills-tertiary);
}

.selectableGrid [role='gridcell']:hover {
  background: var(--fills-tertiary-hover);
}

.selectableGrid [role='columnheader'],
.selectableGrid [role='rowheader'] {
  color: var(--label-secondary);
  font-weight: 500;
}

.selectableGrid [role='gridcell'][aria-selected='true'] {
  color: var(--color-white);
  background: var(--color-primary-500);
}

.selectableGrid [role='gridcell'][aria-disabled='true'] {
  cursor: not-allowed;
  color: var(--label-quaternary);
  background: transparent;
  text-decoration: line-through;
  pointer-events: none;
}

.selectableGrid [role='gridcell']:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

.selectableGrid [role='rowheader'],
.selectableGrid [role='columnheader'] {
  display: flex;
  align-items: center;
}

.seatMap [role='row'] {
  grid-auto-columns: 36px;
}

.seatMap [role='gridcell'] {
  block-size: 36px;
  padding: 0;
  border-radius: var(--radius-2) var(--radius-2) var(--radius-1) var(--radius-1);
  border-block-end: 3px solid var(--separator-opaque);
}

.seatMap [role='gridcell'][aria-selected='true'] {
  border-block-end-color: var(--color-primary-700);
}

.selectableGrid:has([role='rowheader']) [role='row'] {
  grid-template-columns: var(--spacing-40);
}

.selectableGrid [role='rowheader'],
.selectableGrid:has([role='rowheader']) [role='columnheader']:first-child {
  padding-inline-start: 0;
}

.selectableGrid [role='columnheader'] {
  justify-content: center;
}

.selectableGrid:has([role='rowheader']) [role='columnheader']:first-child {
  justify-content: flex-start;
}
```
<!-- /example -->

## Do Not Override

- inventing a dedicated selectable-grid token API that is not in source
- mixing behavioral expectations into purely visual CSS overrides
- styling cells in ways that hide active, disabled, or selected state
