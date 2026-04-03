# NumberField Patterns

## Quantity Stepper

When to use:

- a compact row needs exact quantity control

Composition notes:

- keep decrement and increment on opposite sides of the input
- set realistic `min` and `max`

Trade-offs:

- precise and compact
- denser than a simple text input

```tsx
<NumberField min={1} max={12}>
  <NumberFieldDecrementButton />
  <NumberFieldInput defaultValue={1} />
  <NumberFieldIncrementButton />
</NumberField>
```

## Decimal Adjustment

When to use:

- pricing, percentages, or measurements require small increments

Composition notes:

- set `step` and `maximumFractionDigits` intentionally
- test rounding behavior with real values

Trade-offs:

- precise
- more fragile than integer-only flows

```tsx
<NumberField step={0.25} maximumFractionDigits={2}>
  <NumberFieldDecrementButton />
  <NumberFieldInput defaultValue={1} />
  <NumberFieldIncrementButton />
</NumberField>
```

## Form-Friendly Numeric Row

When to use:

- a native form should submit the value directly

Composition notes:

- put `name` on `NumberFieldInput`
- choose default or controlled value model explicitly

Trade-offs:

- easy native submission
- still needs backend validation

```tsx
<NumberField min={0} max={99}>
  <NumberFieldDecrementButton />
  <NumberFieldInput name='quantity' defaultValue={2} />
  <NumberFieldIncrementButton />
</NumberField>
```
