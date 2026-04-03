# PinField Patterns

## OTP Verification

When to use:

- users enter a short verification code from SMS, email, or authenticator apps

Composition notes:

- keep the length fixed
- place helper or error copy nearby

Trade-offs:

- easy to scan and correct
- more specialized than a standard text field

```tsx
<PinField maxLength={6}>
  <PinFieldHiddenInput name='otp' />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
  <PinFieldSlot index={4} />
  <PinFieldSlot index={5} />
</PinField>
```

## Grouped Legacy Code

When to use:

- the code is visually grouped in the product or in the external source users copy from

Composition notes:

- use `PinFieldSeparator` only for visual grouping
- keep actual input length consistent

Trade-offs:

- mirrors real-world code formatting
- adds one more layout decision

```tsx
<PinField maxLength={4}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSeparator />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
</PinField>
```

## Alphanumeric Activation Code

When to use:

- the code accepts letters and digits

Composition notes:

- pass a matching mask
- align the frontend mask with backend validation

Trade-offs:

- flexible
- easier to drift from backend expectations if the mask is guessed

```tsx
<PinField mask={/^[A-Za-z0-9]+$/} maxLength={4}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
</PinField>
```
