# Alert Anatomy

## Overview

`Alert` is a [compound component](../../glossary.md#compound-component) because the root, icon, title, and content parts work together as one message pattern with shared semantic variant context.

## Required Parts

### `Alert`

Required. Owns semantic variant and appearance.

### `AlertMain`

Required in most product alerts. Wraps the message hierarchy.

## Optional Parts

### `AlertIcon`

Optional semantic icon surface.

### `AlertTitle`

Optional title for stronger emphasis.

### `AlertContent`

Optional supporting message copy.

## Composition Order

1. `Alert`
2. `AlertIcon`
3. `AlertMain`
4. `AlertTitle`
5. `AlertContent`

## Valid Composition Patterns

```tsx
<Alert variant='warning' appearance='surface'>
  <AlertIcon />
  <AlertMain>
    <AlertTitle>Action required</AlertTitle>
    <AlertContent>Finish domain verification before enabling SSO.</AlertContent>
  </AlertMain>
</Alert>
```

## Invalid Composition Patterns

### Alert used as a full-page layout shell

Alerts are feedback messages, not a replacement for page structure.

### Long action-heavy workflow inside the alert

Once the content becomes task-heavy, another pattern is usually a better fit.
