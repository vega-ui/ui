# Backdrop Patterns

## Custom Modal Shell

When to use:

- a custom modal flow needs only the background layer from VegaUI

Composition notes:

- render the backdrop and foreground together
- keep dismissal and focus logic in the parent pattern

Trade-offs:

- flexible
- easy to get wrong without a full overlay contract

```tsx
<>
  <Backdrop visible onClick={onDismiss} />
  <Card style={{ position: 'fixed', inset: '20% auto auto 20%' }}>
    Custom overlay content
  </Card>
</>
```

## Drawer Background Layer

When to use:

- a side panel needs a separate dimming layer

Composition notes:

- let the foreground layer own its semantics
- keep z-index and dismissal behavior coordinated

Trade-offs:

- reusable low-level building block
- still requires overlay orchestration outside the component

```tsx
<>
  <Backdrop visible />
  <DrawerContent shadowed>Filters</DrawerContent>
</>
```

## Passive Visual Dimmer

When to use:

- the UI needs a visual overlay without scroll lock

Composition notes:

- disable `lockScroll`
- keep the interaction contract explicit elsewhere

Trade-offs:

- lighter than a full modal background
- easier to create ambiguous state if overused

```tsx
<Backdrop visible lockScroll={false} />
```
