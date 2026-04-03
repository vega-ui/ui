# Checkbox Examples

## Basic

### Basic: labeled checkbox

Use this for one independent selectable option.

```tsx
<Checkbox>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Receive product updates
</Checkbox>
```

## Controlled/Stateful

### Controlled/Stateful: indeterminate parent selector

Use this when a parent item reflects partial selection in a nested list.

```tsx
<Checkbox indeterminate>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Select all
</Checkbox>
```

## Form/Integration

### Form/Integration: checkbox in a native form row

Use the hidden input when the value should appear in native form submission.

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Checkbox>
    <CheckboxHiddenInput name='marketing' />
    <CheckboxIndicator>
      <CheckboxCheckedIcon />
      <CheckboxIndeterminateIcon />
    </CheckboxIndicator>
  </Checkbox>
  Receive marketing updates
</label>
```

## Layout/Overlay

### Layout/Overlay: checkbox list inside a drawer

Use this when several independent choices live inside an overlay form.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Notification settings</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <Checkbox>
          <CheckboxHiddenInput />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
            <CheckboxIndeterminateIcon />
          </CheckboxIndicator>
          Incident alerts
        </Checkbox>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Error

### Error: required agreement checkbox

Use this when one independent agreement must be accepted before submit.

```tsx
<FormRow label='Agreement' error='You must accept the policy to continue.'>
  <Checkbox>
    <CheckboxHiddenInput aria-invalid='true' />
    <CheckboxIndicator>
      <CheckboxCheckedIcon />
      <CheckboxIndeterminateIcon />
    </CheckboxIndicator>
    Accept terms
  </Checkbox>
</FormRow>
```

## Disabled

### Disabled: checked mandatory policy

Use this when the value is visible but locked.

```tsx
<Checkbox checked disabled>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Mandatory policy accepted
</Checkbox>
```

## Edge

### Edge: secondary variant in dense settings

Use this when a less prominent checkbox treatment fits better.

```tsx
<Checkbox variant='secondary'>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Optional analytics events
</Checkbox>
```
