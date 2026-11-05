# DataGridPicker Anatomy

## Overview

`DataGridPicker` is a compound picker subsystem. It wraps `DataGridSelectable` and adds a picker-specific visual context for size and variant.

## Required Parts

- `DataGridPicker`: root picker layer
- `DataGridPickerRowGroup`
- `DataGridPickerRow`
- `DataGridPickerItem`

## Optional Parts

- `DataGridPickerScroller`
- `DataGridPickerScrollerContent`

## Composition Order

1. `DataGridPicker`
2. optional `DataGridPickerScroller`
3. `DataGridPickerScrollerContent`
4. `DataGridPickerRowGroup`
5. `DataGridPickerRow`
6. `DataGridPickerItem`

## Valid Composition Patterns

- static picker grids for months, quarters, or emoji sets
- paged scroller pickers with scoped row groups
- single, multiple, or range selection depending on the consumer subsystem

## Invalid Composition Patterns

- using plain layout nodes instead of picker items for selectable content
- omitting scope management in paged compositions that depend on page identity
- treating `DataGridPicker` like a generic data table
