# Sheet Patterns

## Mobile-Like Picker Surface

When to use:

- The flow benefits from bottom-sheet behavior.

Composition notes:

- Use snap points intentionally.
- Keep the first visible state large enough for the primary action or field group.

Trade-offs:

- Good touch ergonomics.
- More interaction complexity than a dialog.

```tsx
<Sheet snapPoints={[0.5, 1]}>
  <SheetTrigger asChild>
    <Button>Choose delivery</Button>
  </SheetTrigger>
  <SheetContent aria-labelledby='delivery-title'>
    <SheetHandle aria-label='Resize sheet' />
    <Heading id='delivery-title' size={4} fontWeight={600} as='h2'>Delivery</Heading>
    <Text size={3}>Choose the nearest delivery slot and confirm the address before continuing.</Text>
  </SheetContent>
</Sheet>
```

## Long Scrollable Sheet

When to use:

- Content exceeds the comfortable viewport height.

Composition notes:

- Make the body an element with `overflow: auto`; as a flex item of `SheetContent` it shrinks on its own.
- Keep the header and close affordances stable while the body moves.

Trade-offs:

- Preserves the sheet framing.
- Requires viewport testing.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open log</Button>
  </SheetTrigger>
  <SheetContent aria-labelledby='log-title' style={{ maxHeight: '430px' }}>
    <Heading id='log-title' size={4} fontWeight={600} as='h2'>Activity</Heading>
    <div style={{ overflow: 'auto' }}>
      <Text size={2}>10:05 Comment added to task</Text>
      <Text size={2}>10:11 Stage moved to review</Text>
      <Text size={2}>10:24 Invoice regenerated</Text>
    </div>
  </SheetContent>
</Sheet>
```

## Blocking Step Sheet

When to use:

- A mobile-first flow must be completed before leaving.

Composition notes:

- Use `closedBy='none'` on `SheetContent` only when the completion path is obvious; a submit button in a `<form method="dialog">` still closes the sheet.
- Keep the content short enough to work at every active snap point.

Trade-offs:

- Strong task guidance.
- Higher risk of trapping users in a confusing flow if copy is weak.

```tsx
<Sheet snapPoints={[0.6, 1]}>
  <SheetTrigger asChild>
    <Button>Verify details</Button>
  </SheetTrigger>
  <SheetContent closedBy='none' aria-labelledby='verify-title'>
    <Heading id='verify-title' size={4} fontWeight={600} as='h2'>Verify details</Heading>
    <Text size={3}>Review the legal name and billing region before final submission.</Text>
    <form method='dialog'>
      <Button type='submit' value='confirm'>Confirm</Button>
    </form>
  </SheetContent>
</Sheet>
```
