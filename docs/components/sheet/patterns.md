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
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetHandle />
        <SheetMain>
          <Text size={3}>Choose the nearest delivery slot and confirm the address before continuing.</Text>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Long Scrollable Sheet

When to use:

- Content exceeds the comfortable viewport height.

Composition notes:

- Keep the main body scrollable.
- Keep the header and close affordances stable while the body moves.

Trade-offs:

- Preserves the sheet framing.
- Requires viewport testing.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open log</Button>
  </SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent style={{ maxHeight: '430px' }}>
        <SheetHeader>
          <Text size={4}>Activity</Text>
        </SheetHeader>
        <SheetMain>
          <Text size={2}>10:05 Comment added to task</Text>
          <Text size={2}>10:11 Stage moved to review</Text>
          <Text size={2}>10:24 Invoice regenerated</Text>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Blocking Step Sheet

When to use:

- A mobile-first flow must be completed before leaving.

Composition notes:

- Use `closable={false}` only when the completion path is obvious.
- Keep the content short enough to work at every active snap point.

Trade-offs:

- Strong task guidance.
- Higher risk of trapping users in a confusing flow if copy is weak.

```tsx
<Sheet closable={false} snapPoints={[0.6, 1]}>
  <SheetTrigger asChild>
    <Button>Verify details</Button>
  </SheetTrigger>
  <SheetPortal>
    <SheetContent>
      <SheetMain>
        <Text size={3}>Review the legal name and billing region before final submission.</Text>
      </SheetMain>
    </SheetContent>
  </SheetPortal>
</Sheet>
```
