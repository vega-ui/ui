# Progress Patterns

## Async Task Progress

When to use:

- A task advances over time toward completion.

Composition notes:

- Keep the bar paired with explanatory text.
- Use determinate values only when they reflect real task state.

Trade-offs:

- Strong sense of progress.
- Misleading if the values are only guessed.

```tsx
<Progress value={72}>
  <ProgressTrack />
</Progress>
```

## Indeterminate Operation

When to use:

- Work is happening but the completion amount is unknown.

Composition notes:

- Distinguish the state clearly from determinate progress.
- Keep nearby copy explicit about the running operation.

Trade-offs:

- Better than fake percentages.
- Less informative than determinate progress.

```tsx
<Progress indeterminate>
  <ProgressTrack />
</Progress>
```

## Embedded Progress In Overlays

When to use:

- A dialog or sheet owns a running operation.

Composition notes:

- Keep the progress local to the task that owns it.
- Use full width when the overlay layout supports it.

Trade-offs:

- Keeps feedback close to the running operation.
- Can feel visually heavy if stacked with too many status indicators.

```tsx
<Dialog>
  <DialogContent>
    <Progress fullWidth value={65}>
      <ProgressTrack />
    </Progress>
  </DialogContent>
</Dialog>
```
