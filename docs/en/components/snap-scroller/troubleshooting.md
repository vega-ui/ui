# SnapScroller Troubleshooting

## The Scroller Snaps To Unexpected Pages

### Symptom

The scroll settles, but not on the page users expected.

### Likely Cause

Indexes or item widths are not as stable as the integration assumes.

### How To Verify

- inspect the registered `index` values
- compare item widths and ordering across renders

### Fix

Keep indexes stable and use more predictable page sizing.

## `defaultIndex` Does Nothing

### Symptom

The scroller mounts, but it does not start on the intended page.

### Likely Cause

The keyed item for that index is not present when the initial scroll is attempted.

### How To Verify

- inspect the actual `SnapScrollerContent index={...}` values at mount

### Fix

Ensure the target keyed page exists during the initial render.

## External Controls Drift From The Visible Page

### Symptom

Previous/next buttons or highlighted state stop matching the current snap position.

### Likely Cause

The imperative API and the highlighted state are not reading from the same source of truth.

### How To Verify

- compare the committed snap index with the state used by external controls

### Fix

Drive both visible highlighting and imperative controls from the same snap callbacks or committed index.
