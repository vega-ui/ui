# Pagination Troubleshooting

## The UI Shows A Current Page But Data Does Not Match It

### Symptom

The highlighted page link and the actual data state drift apart.

### Likely Cause

Pagination visuals were treated as the source of truth instead of the parent page state, or `current` and the data slice use different page values.

### How To Verify

- inspect the parent routing or query-state logic
- compare the active page data with the `current` link

### Fix

Make the parent feature authoritative and render pagination from that state. Clamp a page from the URL once and use the same value for `current` and for the data.

## Every Page Looks Current With A Router

### Symptom

With react-router, all page links get the current style or `aria-current`.

### Likely Cause

`NavLink` was used inside `PaginationLink asChild`. It matches only the path, and the pages differ only in `?page=`.

### How To Verify

- check which link component is inside `PaginationLink`

### Fix

Use `Link` and mark the current page with `current`.

## Previous Or Next Controls Still Work At The Boundaries

### Symptom

Users can move to pages before page 1 or after the last page.

### Likely Cause

Boundary logic was not wired in the parent feature.

### How To Verify

- test the first and last pages

### Fix

Drop `href` and set `aria-disabled='true'` on the boundary link, or set `disabled` on a `<button>` rendered through `asChild`.

## Page Buttons Submit The Surrounding Form

### Symptom

Clicking a page inside a form submits the form or reloads the page.

### Likely Cause

A `<button>` rendered through `PaginationLink asChild` has no `type`, so it defaults to `submit`.

### How To Verify

- check the `type` of the buttons inside `PaginationLink`

### Fix

Give every page and arrow button `type='button'`.

## The Ellipsis Feels Clickable But Should Not Be

### Symptom

Users interpret the ellipsis as a page action.

### Likely Cause

The ellipsis was rendered as a `PaginationLink` or styled like one.

### How To Verify

- compare the ellipsis with the page links

### Fix

Render it with `PaginationEllipsis` directly in `PaginationList`. It is `aria-hidden` and ignores pointer events.
