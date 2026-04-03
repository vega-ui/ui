# Backdrop Anatomy

## Overview

`Backdrop` is a single-part primitive that wraps `FloatingOverlay` and adds VegaUI overlay styling through data attributes.

## Required Parts

### `Backdrop`

Required. Owns overlay mounting, optional scroll locking, blur, and visible backdrop rendering.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Backdrop`
2. optional overlay children

## Valid Composition Patterns

```tsx
<>
  <Backdrop visible onClick={onDismiss} />
  <Card style={{ position: 'fixed', inset: '20% auto auto 20%' }}>
    Custom overlay content
  </Card>
</>
```

## Invalid Composition Patterns

### Backdrop used as the only modal mechanism

The overlay dims the page, but focus and interaction rules remain undefined.

### Foreground content rendered without a coordinated layering plan

The backdrop and foreground can easily end up fighting for visibility or dismissal semantics.
