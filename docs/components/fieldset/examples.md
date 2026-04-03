# Fieldset Examples

## Basic

### Basic: notification preferences

Use `Fieldset` when several controls belong to one named preference area.

```tsx
<Fieldset appearance='outlined'>
  <FieldsetLegend>Notifications</FieldsetLegend>
  <Checkbox>Email alerts</Checkbox>
  <Checkbox>Weekly digest</Checkbox>
</Fieldset>
```

## Controlled/Stateful

### Controlled/Stateful: grouped radio choice

Let the group semantics come from `Fieldset` and the single-choice behavior come from the radios.

```tsx
const [value, setValue] = useState('email');

<Fieldset appearance='outlined'>
  <FieldsetLegend>Invoice delivery</FieldsetLegend>
  <Radio name='delivery' checked={value === 'email'} onChange={() => setValue('email')}>
    Email PDF
  </Radio>
  <Radio name='delivery' checked={value === 'portal'} onChange={() => setValue('portal')}>
    Vendor portal
  </Radio>
</Fieldset>
```

## Form/Integration

### Form/Integration: address section with helper copy

Add `FieldsetHeader` when the group needs context before the controls.

```tsx
<Fieldset appearance='outlined'>
  <FieldsetLegend>Billing address</FieldsetLegend>
  <FieldsetHeader>Use the legal entity address shown on invoices.</FieldsetHeader>
  <TextField>
    <TextFieldInput placeholder='Company name' />
  </TextField>
  <TextField>
    <TextFieldInput placeholder='Street address' />
  </TextField>
</Fieldset>
```

## Layout/Overlay

### Layout/Overlay: transparent grouping in a dialog

Use `transparent` when the overlay already provides the main visual container.

```tsx
<Fieldset appearance='transparent'>
  <FieldsetLegend>Access scope</FieldsetLegend>
  <Switch>Allow export</Switch>
  <Switch>Allow billing changes</Switch>
</Fieldset>
```

## Error

### Error: validation summary above grouped controls

Keep the legend stable and surface validation as supporting copy.

```tsx
<Fieldset appearance='outlined' aria-invalid='true'>
  <FieldsetLegend>Notification channel</FieldsetLegend>
  <FieldsetHeader>Choose at least one channel before continuing.</FieldsetHeader>
  <Checkbox>Email</Checkbox>
  <Checkbox>SMS</Checkbox>
</Fieldset>
```

## Disabled

### Disabled: inherited disabled group

Disable the whole group when none of its controls should change.

```tsx
<Fieldset appearance='outlined' disabled>
  <FieldsetLegend>Security notifications</FieldsetLegend>
  <Checkbox>Email</Checkbox>
  <Checkbox>Push</Checkbox>
</Fieldset>
```

## Edge

### Edge: nested groups for advanced settings

Only nest fieldsets when the inner and outer legends clearly describe different scopes.

```tsx
<Fieldset appearance='outlined'>
  <FieldsetLegend>Integrations</FieldsetLegend>
  <Fieldset appearance='transparent'>
    <FieldsetLegend>Slack</FieldsetLegend>
    <Checkbox>Send incident alerts</Checkbox>
  </Fieldset>
</Fieldset>
```
