# PageControl Patterns

## Carousel Indicators

When to use:

- a short carousel or hero sequence needs compact navigation

Composition notes:

- keep the sequence short
- sync active state with the actual slide

Trade-offs:

- compact and familiar
- not informative enough for long sequences

```tsx
<PageControl>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
</PageControl>
```

## Timed Progress Dots

When to use:

- autoplay or timed advancement is part of the experience

Composition notes:

- use `PageControlProgress`
- keep duration aligned with the real autoplay timing

Trade-offs:

- communicates progression visually
- adds temporal complexity and potential accessibility risks

```tsx
<PageControl active={0}>
  <PageControlProgress index={0} duration={5000} />
  <PageControlProgress index={1} duration={5000} />
</PageControl>
```

## Step Indicators Above A Form

When to use:

- a multi-step flow needs lightweight progress cues

Composition notes:

- keep step semantics elsewhere if labels matter
- use `active` to reflect the real current step

Trade-offs:

- compact
- less explanatory than a labeled stepper

```tsx
<PageControl active={2}>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
</PageControl>
```
