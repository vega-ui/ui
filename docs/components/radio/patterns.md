# Radio Patterns

## Simple Choice Group

When to use:

- A small visible set of mutually exclusive options belongs in a form.

Composition notes:

- Keep all related radios under the same `name`.
- Wrap control and label text together so the full row stays clickable.

Trade-offs:

- Strong native form semantics.
- Weaker fit for dense button-like choice UIs.

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Radio name='plan' value='pro' />
  Pro
</label>
```

## Settings Choice Group

When to use:

- Users must choose one persistent mode or policy from a short list.

Composition notes:

- Give the group a surrounding label or fieldset-level context.
- Keep option labels descriptive rather than action-oriented.

Trade-offs:

- Easy to understand in forms.
- Less compact than `SegmentedControl` when all options should read as adjacent buttons.

```tsx
<FormRow label='Default theme'>
  <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Radio name='theme' value='light' />
    Light
  </label>
</FormRow>
```

## Radio Choice In Overlays

When to use:

- An overlay asks for one required decision before continuing.

Composition notes:

- Keep the list short and scannable.
- Combine with clear dialog or drawer copy so the group meaning is obvious.

Trade-offs:

- Keeps the choice explicit.
- Can feel verbose if there are too many options.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Choose environment</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose environment</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <div style={{ display: 'grid', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Radio name='environment' value='staging' />
            Staging
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Radio name='environment' value='production' />
            Production
          </label>
        </div>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```
