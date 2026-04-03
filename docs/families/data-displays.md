# Data Displays

Use this page when the UI is showing structured information and the first decision is whether the content is static, keyboard-navigable, selectable, picker-like, or paginated.

## Quick Decision Rules

- Use [Table](../components/table/) for semantic tabular content that is primarily read, not navigated cell by cell.
- Use [DataGrid](../components/data-grid/) for keyboard-aware cell navigation.
- Use [DataGridSelectable](../components/data-grid-selectable/) when grid navigation also needs selection behavior.
- Use [DataGridPicker](../components/data-grid-picker/) when the grid should read like a picker surface rather than a general interaction matrix.
- Use [Pagination](../components/pagination/) when content is split into discrete pages.
- Use [PageControl](../components/page-control/) when the UI needs compact page or slide indicators rather than full pagination chrome.

## By Interaction Model

- Static or reading-first table: [Table](../components/table/)
- Navigable interaction grid: [DataGrid](../components/data-grid/)
- Navigable plus selectable grid: [DataGridSelectable](../components/data-grid-selectable/)
- Picker-shaped grid: [DataGridPicker](../components/data-grid-picker/)
- Full page navigation: [Pagination](../components/pagination/)
- Compact page or slide indicator: [PageControl](../components/page-control/)

## Common Misclassifications

- Do not use [Table](../components/table/) when active-cell navigation is part of the UX.
- Do not use [DataGrid](../components/data-grid/) when the UI is only displaying static rows and columns.
- Do not use [DataGridSelectable](../components/data-grid-selectable/) when the real need is a standard picker layer.
- Do not use [DataGridPicker](../components/data-grid-picker/) for general data navigation when the UI should not read like a chooser.
- Do not use [PageControl](../components/page-control/) when users need explicit page numbers or broader navigation affordances.

## Start Here

- Read-only tables and summaries: [Table](../components/table/)
- Schedules, planners, or keyboard-driven matrices: [DataGrid](../components/data-grid/), [DataGridSelectable](../components/data-grid-selectable/)
- Dense choice grids: [DataGridPicker](../components/data-grid-picker/)
- Lists split across pages: [Pagination](../components/pagination/)
- Carousels, onboarding steps, or slide indicators: [PageControl](../components/page-control/)
