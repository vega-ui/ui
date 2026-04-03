# Radio Examples

## Basic

### Basic: labeled radio option

Use this when one option belongs to a mutually exclusive group.

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Radio name='plan' value='starter' />
  Starter
</label>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned selected plan

Use a controlled wrapper when the parent owns the selected value.

```tsx
const [plan, setPlan] = useState('pro');

<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Radio
    name='plan'
    value='pro'
    checked={plan === 'pro'}
    onChange={() => setPlan('pro')}
  />
  Pro
</label>
```

## Form/Integration

### Form/Integration: radio group inside a form row

Use this when exactly one visible option must be chosen in a form.

```tsx
<FormRow label='Billing cycle'>
  <div style={{ display: 'grid', gap: 8 }}>
    <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Radio name='billing-cycle' value='monthly' />
      Monthly
    </label>
    <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Radio name='billing-cycle' value='yearly' />
      Yearly
    </label>
  </div>
</FormRow>
```

## Layout/Overlay

### Layout/Overlay: radio list inside a dialog

Use this when one option must be picked inside an overlay flow.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Choose environment</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Radio name='environment' value='prod' />
          Production
        </label>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: missing required radio selection

Use this when the user must pick one option before submit.

```tsx
<FormRow label='Theme' error='Choose one theme option.'>
  <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Radio name='theme' value='dark' aria-invalid='true' />
    Dark
  </label>
</FormRow>
```

## Disabled

### Disabled: checked archived option

Use this when the selected option is visible but no longer editable.

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 0.7 }}>
  <Radio name='plan' value='legacy' checked disabled />
  Legacy plan
</label>
```

## Edge

### Edge: secondary variant row

Use this when radios need a less prominent visual treatment within dense settings.

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Radio name='theme' value='dark' variant='secondary' />
  Dark theme
</label>
```
