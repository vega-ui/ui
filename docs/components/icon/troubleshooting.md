# Icon Troubleshooting

## The Icon Ignores The `size` Prop

### Symptom

Changing `size` does not affect the rendered icon dimensions.

### Likely Cause

Explicit `width` or `height` props are already set.

### How To Verify

- inspect the rendered props
- check whether `width` or `height` is present

### Fix

Remove explicit dimensions if you want token sizing to apply.

## The Icon Is Invisible Or Wrongly Colored

### Symptom

The icon renders but its color is unexpected.

### Likely Cause

The icon uses `currentColor`, so the surrounding text or control color is driving it.

### How To Verify

- inspect the computed `color` of the parent context

### Fix

Set the desired text color on the parent or pass an explicit `color` prop.

## A Standalone Icon Is Not Announced

### Symptom

The icon has meaning visually, but assistive technology does not announce it.

### Likely Cause

`Icon` defaults to `aria-hidden='true'`.

### How To Verify

- inspect the rendered element attributes

### Fix

Provide meaning through adjacent text or a labeled parent control rather than relying on the raw icon alone.
