# Data displays

Use this page when the UI is showing structured information and the first decision is whether the content is static, keyboard-navigable, selectable, picker-like, or paginated.

## Quick Decision Rules

- Use [Table](../components/table/) for semantic tabular content that is primarily read, not navigated cell by cell.
- Use [Grid](../components/grid/) for keyboard-aware cell navigation.
- Use [Grid](../components/grid/) with `selection` when grid navigation also needs selection behavior.
- Use [Grid](../components/grid/) with `GridItem` inside its cells when the grid should read like a picker surface rather than a general interaction matrix.
- Use [Pagination](../components/pagination/) when content is split into discrete pages.
- Use [PageControl](../components/page-control/) when the UI needs compact page or slide indicators rather than full pagination chrome.
- Use [Tabs](../components/tabs/) when one area shows one of several panels and switching keeps the URL.

## By Interaction Model

- Static or reading-first table: [Table](../components/table/)
- Navigable interaction grid: [Grid](../components/grid/)
- Navigable plus selectable grid: [Grid](../components/grid/) with `selection`
- Picker-shaped grid: [Grid](../components/grid/) with `selection` and `GridItem`
- Full page navigation: [Pagination](../components/pagination/)
- Compact page or slide indicator: [PageControl](../components/page-control/)
- Panels switched in place: [Tabs](../components/tabs/)

## Common Misclassifications

- Do not use [Table](../components/table/) when active-cell navigation is part of the UX.
- Do not use [Grid](../components/grid/) when the UI is only displaying static rows and columns.
- Do not put `GridItem` into the cells of a [Grid](../components/grid/) for general data navigation when the UI should not read like a chooser.
- Do not use [PageControl](../components/page-control/) when users need explicit page numbers or broader navigation affordances.

## Start Here

- Read-only tables and summaries: [Table](../components/table/)
- Schedules, planners, or keyboard-driven matrices: [Grid](../components/grid/)
- Dense choice grids: [Grid](../components/grid/) with `GridItem`
- Lists split across pages: [Pagination](../components/pagination/)
- Carousels, onboarding steps, or slide indicators: [PageControl](../components/page-control/)
