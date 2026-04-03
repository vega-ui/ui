# TimeField Examples

## Basic

### Basic: standalone schedule input

```tsx
<TimeField>
  <TimeFieldInput placeholder='09:30' />
</TimeField>
```

## Controlled/Stateful

### Controlled/Stateful: controlled time value

```tsx
const [value, setValue] = useState('');

<TimeField>
  <TimeFieldInput value={value} onChange={(e) => setValue(e.currentTarget.value)} />
</TimeField>
```

## Form/Integration

### Form/Integration: meeting reminder field

```tsx
<>
  <Label htmlFor='reminder-time'>Reminder time</Label>
  <TimeField>
    <TimeFieldInput id='reminder-time' name='reminder_time' placeholder='14:00' />
  </TimeField>
</>
```

## Layout/Overlay

### Layout/Overlay: seconds-precision schedule rule

```tsx
<TimeField format='HH:MM:SS'>
  <TimeFieldInput placeholder='HH:MM:SS' />
</TimeField>
```

## Error

### Error: time outside allowed range

```tsx
<>
  <TimeField error min='09:00' max='18:00'>
    <TimeFieldInput placeholder='HH:MM' />
  </TimeField>
  <HelperText error>Choose a time during support hours.</HelperText>
</>
```

## Disabled

### Disabled: read-only schedule slot

```tsx
<TimeField>
  <TimeFieldInput disabled placeholder='HH:MM' />
</TimeField>
```

## Edge

### Edge: lower-bounded start time

```tsx
<TimeField min='12:00'>
  <TimeFieldInput placeholder='HH:MM (min: 12:00)' />
</TimeField>
```
