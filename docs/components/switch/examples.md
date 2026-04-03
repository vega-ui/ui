# Switch Examples

## Basic

### Basic: settings toggle

Use this for one immediate binary setting.

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Switch>
    <SwitchHiddenInput name='notifications' />
    <SwitchIndicator />
  </Switch>
  <span>Enable notifications</span>
</label>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned switch state

Use a controlled wrapper when parent state owns the binary setting.

```tsx
const [enabled, setEnabled] = useState(true);

<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Switch>
    <SwitchHiddenInput checked={enabled} onChange={() => setEnabled((v) => !v)} />
    <SwitchIndicator />
  </Switch>
  <span>Incident alerts</span>
</label>
```

## Form/Integration

### Form/Integration: switch in a settings row

Use this when the switch belongs to a settings form that still wants native semantics.

```tsx
<div style={{ display: 'grid', gap: 6 }}>
  <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Switch>
      <SwitchHiddenInput name='incident-alerts' />
      <SwitchIndicator />
    </Switch>
    <span>Incident alerts</span>
  </label>
  <HelperText>Send a notification when a production incident is detected.</HelperText>
</div>
```

## Layout/Overlay

### Layout/Overlay: switch inside a sheet

Use this when one immediate setting lives inside a mobile-first overlay flow.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Notification settings</Button>
  </SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Switch>
            <SwitchHiddenInput name='alerts' />
            <SwitchIndicator />
          </Switch>
          <span>Incident alerts</span>
        </label>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Error

### Error: required binary setting not aligned with product rule

Use this when product logic rejects the current toggle state and copy needs to explain why.

```tsx
<FormRow label='Public access' error='Public access must stay disabled for archived workspaces.'>
  <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Switch>
      <SwitchHiddenInput checked aria-invalid='true' />
      <SwitchIndicator />
    </Switch>
    <span>Public access</span>
  </label>
</FormRow>
```

## Disabled

### Disabled: checked archived switch

Use this when the binary state is visible but locked.

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 0.7 }}>
  <Switch variant='secondary'>
    <SwitchHiddenInput checked disabled />
    <SwitchIndicator />
  </Switch>
  <span>Legacy automation</span>
</label>
```

## Edge

### Edge: secondary variant in dense settings

Use this when a lower-emphasis binary control fits better visually.

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Switch variant='secondary'>
    <SwitchHiddenInput />
    <SwitchIndicator />
  </Switch>
  <span>Beta previews</span>
</label>
```
