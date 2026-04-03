# TimeField Patterns

## Reminder Time

When to use:

- users schedule a reminder or notification time

Composition notes:

- keep the label explicit about what the time controls
- use helper text if the timezone context matters

Trade-offs:

- compact and clear
- requires explicit format expectations

```tsx
<TimeField>
  <TimeFieldInput name='reminder_time' placeholder='14:00' />
</TimeField>
```

## Seconds-Precision Rule

When to use:

- scheduling logic or automation requires seconds

Composition notes:

- switch `format` to `HH:MM:SS`
- keep bounds in the same shape

Trade-offs:

- precise
- more cognitively demanding than minute-level entry

```tsx
<TimeField format='HH:MM:SS'>
  <TimeFieldInput placeholder='HH:MM:SS' />
</TimeField>
```

## Bound Time Window

When to use:

- only a subset of the day is valid

Composition notes:

- set `min` and `max`
- explain the allowed window in nearby copy if it is not obvious

Trade-offs:

- prevents invalid entry early
- users need clear feedback when bounds reject values

```tsx
<TimeField min='09:00' max='18:00'>
  <TimeFieldInput placeholder='HH:MM' />
</TimeField>
```
