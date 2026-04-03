# Switch Patterns

## Immediate Settings Toggle

When to use:

- One preference or feature should turn on or off directly.

Composition notes:

- Keep the visible label state-oriented.
- Use hidden input participation if the setting also lives in a native form.

Trade-offs:

- Strong binary affordance.
- Weak fit for groups of mutually exclusive options.

```tsx
<Switch>
  <SwitchHiddenInput />
  <SwitchIndicator />
</Switch>
```

## Settings Row With Helper Text

When to use:

- A settings screen needs a compact toggle plus short explanatory copy.

Composition notes:

- Keep the switch and primary label on one row.
- Put optional helper text below instead of inside the label itself.

Trade-offs:

- Easy to scan in preferences panels.
- Can become noisy if every row adds too much helper copy.

```tsx
<div style={{ display: 'grid', gap: 6 }}>
  <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Switch>
      <SwitchHiddenInput />
      <SwitchIndicator />
    </Switch>
    <span>Incident alerts</span>
  </label>
</div>
```

## Overlay Toggle List

When to use:

- A drawer or sheet contains a short list of binary settings.

Composition notes:

- Keep the list short and clearly state-oriented.
- Avoid mixing toggles with mutually exclusive choice patterns in the same visual cluster.

Trade-offs:

- Works well for compact preference panels.
- Harder to scan if too many switches are stacked with weak labels.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Notification settings</Button>
  </SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetHeader>
          <Text size={4}>Notification settings</Text>
        </SheetHeader>
        <SheetMain style={{ display: 'grid', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Switch>
              <SwitchHiddenInput name='alerts' />
              <SwitchIndicator />
            </Switch>
            <span>Incident alerts</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Switch>
              <SwitchHiddenInput name='weekly_digest' />
              <SwitchIndicator />
            </Switch>
            <span>Weekly digest</span>
          </label>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```
