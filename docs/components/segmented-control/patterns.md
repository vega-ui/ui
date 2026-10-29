# SegmentedControl Patterns

## Short View Or Mode Selector

When to use:

- Users switch between a few always-visible views or modes.

Composition notes:

- Keep the option set short.
- Use concise labels that stay comparable side by side.

Trade-offs:

- Strong visual comparison.
- Weak fit for long option sets.

```tsx
<SegmentedControl name='view' defaultValue='week'>
  <SegmentedControlItem value='day'>
    <SegmentedControlItemInput />
    Day
  </SegmentedControlItem>
  <SegmentedControlItem value='week'>
    <SegmentedControlItemInput />
    Week
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```

## Compact Theme Or Density Selector

When to use:

- A settings surface needs a dense exclusive selector with strong visual affordance.

Composition notes:

- Use icon-only segments only when the meaning is already obvious.
- Keep the option count small and balanced.

Trade-offs:

- Compact and expressive.
- More fragile than radio groups when labels or icons are uneven.

```tsx
<SegmentedControl name='theme' defaultValue='system'>
  <SegmentedControlItem value='light'>
    <SegmentedControlItemInput />
    Light
  </SegmentedControlItem>
  <SegmentedControlItem value='system'>
    <SegmentedControlItemInput />
    System
  </SegmentedControlItem>
  <SegmentedControlItem value='dark'>
    <SegmentedControlItemInput />
    Dark
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```

## Exclusive Selector Inside Overlays

When to use:

- A dialog or drawer needs one short, always-visible choice group.

Composition notes:

- Keep the control compact enough for the overlay width.
- Avoid mixing too many long labels in constrained layouts.

Trade-offs:

- Works well for short overlay forms.
- Breaks down if the content becomes too wide or too numerous.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Display settings</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Display settings</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <SegmentedControl name='density' defaultValue='comfortable'>
          <SegmentedControlItem value='compact'>
            <SegmentedControlItemInput />
            Compact
          </SegmentedControlItem>
          <SegmentedControlItem value='comfortable'>
            <SegmentedControlItemInput />
            Comfortable
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```
