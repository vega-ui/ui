# Pagination Troubleshooting

## The UI Shows A Current Page But Data Does Not Match It

### Symptom

The highlighted page button and the actual data state drift apart.

### Likely Cause

Pagination visuals were treated as the source of truth instead of the parent page state.

### How To Verify

- inspect the parent routing or query-state logic
- compare the active page data with the rendered pagination controls

### Fix

Make the parent feature authoritative and render pagination from that state.

## Previous Or Next Controls Still Work At The Boundaries

### Symptom

Users can click into invalid pages before page 1 or after the last page.

### Likely Cause

Boundary disabled logic was not wired in the parent feature.

### How To Verify

- test the first and last pages

### Fix

Disable or omit the relevant trigger controls at boundaries.

## The Ellipsis Feels Clickable But Should Not Be

### Symptom

Users interpret the ellipsis as a page action.

### Likely Cause

Styling or composition made `PaginationEllipsis` look like a real page item.

### How To Verify

- compare ellipsis styling with page items

### Fix

Keep ellipsis visually passive and reserve interactive styling for real navigation items.
