# IndexedSnapScroller Troubleshooting

## The Visible Page Jumps After Reaching The Edge

### Symptom

The scroller reaches a boundary and the visible content seems to jump.

### Likely Cause

The virtual window shifted and the scroll position was not preserved as expected.

### How To Verify

- inspect `preserveScroll`
- watch whether the boundary offset triggers a window reset or append/prepend flow

### Fix

Keep `preserveScroll` enabled when preserving the current snap is the intended experience.

## Controlled `index` And Visible Content Drift Apart

### Symptom

The parent says one index is active, but the visible page content suggests another.

### Likely Cause

Controlled index updates and internal window resets are not coordinated.

### How To Verify

- log the controlled `index`
- compare it with the committed or pending snap index

### Fix

Use one clear source of truth and let the parent react to snap callbacks consistently.

## Page State Leaks Across Different Logical Indexes

### Symptom

Content appears to reuse stale state as the virtual index changes.

### Likely Cause

The content template assumed fixed identity instead of per-index identity.

### How To Verify

- inspect child keys and stateful child logic inside the content template

### Fix

Make per-index state explicit and avoid assuming one physical DOM page equals one logical page forever.

## The Scroller Is Not Reachable With Tab

### Symptom

Tab skips the scroller, and the arrow keys do not scroll it.

### Likely Cause

The root renders with `tabIndex={-1}` by default, so the scroll container is not a Tab stop, Firefox included.

### How To Verify

- check whether the pages contain focusable elements
- inspect the `tabindex` attribute of the root

### Fix

When the pages have nothing to focus, pass `tabIndex={0}` and an `aria-label` that names what the pages show.

## `onScrollSnapChanging` Skips Pages During A Jump

### Symptom

After setting `index` or calling `setIndexTo`, `onScrollSnapChanging` fires once, for the target page, not for the pages in between.

### Likely Cause

This is intended: during a programmatic scroll only the target page is reported, so state synced from the callback does not flicker through intermediate pages.

### How To Verify

- log the indexes passed to `onScrollSnapChanging` during a swipe and after setting `index`

### Fix

Treat `onScrollSnapChanging` during user scrolls as a preview and the controlled `index` as the source of truth for programmatic jumps.
