# CalendarBase Examples

## Basic

### Basic: compact calendar shell

```tsx
<CalendarBase size='sm' variant='primary'>
  <CalendarBaseHeader>
    <CalendarBaseControlIconButton>
      <Icon><ChevronLeft /></Icon>
    </CalendarBaseControlIconButton>
    <div style={{ display: 'flex', gap: 4 }}>
      <CalendarBasePickerButton>May</CalendarBasePickerButton>
      <CalendarBasePickerButton>2026</CalendarBasePickerButton>
    </div>
    <CalendarBaseControlIconButton>
      <Icon><ChevronRight /></Icon>
    </CalendarBaseControlIconButton>
  </CalendarBaseHeader>
  <CalendarBaseWeekLabels>
    {getWeekDayNames(navigator.language, 'short').map((name) => (
      <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
    ))}
  </CalendarBaseWeekLabels>
  <DayPicker year={2026} month={4}>
    <DayPickerLayout includeOverflowDays />
  </DayPicker>
</CalendarBase>
```

## Controlled/Stateful

### Controlled/Stateful: header with dynamic labels

```tsx
<CalendarBase>
  <CalendarBaseHeader>
    <CalendarBaseControlIconButton>
      <Icon><ChevronLeft /></Icon>
    </CalendarBaseControlIconButton>
    <div style={{ display: 'flex', gap: 4 }}>
      <CalendarBasePickerButton>May</CalendarBasePickerButton>
      <CalendarBasePickerButton>2026</CalendarBasePickerButton>
    </div>
    <CalendarBaseControlIconButton>
      <Icon><ChevronRight /></Icon>
    </CalendarBaseControlIconButton>
  </CalendarBaseHeader>
  <CalendarBaseWeekLabels>
    {getWeekDayNames(navigator.language, 'short').map((name) => (
      <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
    ))}
  </CalendarBaseWeekLabels>
  <DayPicker year={2026} month={4}>
    <DayPickerLayout includeOverflowDays />
  </DayPicker>
</CalendarBase>
```

## Form/Integration

### Form/Integration: shell around a day picker

```tsx
<CalendarBase>
  <CalendarBaseWeekLabels>
    {getWeekDayNames(navigator.language, 'short').map((name) => (
      <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
    ))}
  </CalendarBaseWeekLabels>
  <DayPicker year={2026} month={4}>
    <DayPickerLayout includeOverflowDays />
  </DayPicker>
</CalendarBase>
```

## Layout/Overlay

### Layout/Overlay: custom picker button row

```tsx
<CalendarBase>
  <CalendarBaseHeader>
    <CalendarBaseControlIconButton>
      <Icon><ChevronLeft /></Icon>
    </CalendarBaseControlIconButton>
    <div style={{ display: 'flex', gap: 4 }}>
      <CalendarBasePickerButton>May</CalendarBasePickerButton>
      <CalendarBasePickerButton>2026</CalendarBasePickerButton>
    </div>
    <CalendarBaseControlIconButton>
      <Icon><ChevronRight /></Icon>
    </CalendarBaseControlIconButton>
  </CalendarBaseHeader>
  <CalendarBaseWeekLabels>
    {getWeekDayNames(navigator.language, 'short').map((name) => (
      <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
    ))}
  </CalendarBaseWeekLabels>
  <DayPicker year={2026} month={4}>
    <DayPickerLayout includeOverflowDays />
  </DayPicker>
</CalendarBase>
```

## Error

### Error: unavailable period hint

```tsx
<>
  <CalendarBase>
    <CalendarBaseHeader>
      <CalendarBaseControlIconButton>
        <Icon><ChevronLeft /></Icon>
      </CalendarBaseControlIconButton>
      <div style={{ display: 'flex', gap: 4 }}>
        <CalendarBasePickerButton>May</CalendarBasePickerButton>
        <CalendarBasePickerButton>2026</CalendarBasePickerButton>
      </div>
      <CalendarBaseControlIconButton>
        <Icon><ChevronRight /></Icon>
      </CalendarBaseControlIconButton>
    </CalendarBaseHeader>
    <CalendarBaseWeekLabels>
      {getWeekDayNames(navigator.language, 'short').map((name) => (
        <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
      ))}
    </CalendarBaseWeekLabels>
    <DayPicker year={2026} month={4}>
      <DayPickerLayout includeOverflowDays />
    </DayPicker>
  </CalendarBase>
  <HelperText error>That period is outside the allowed booking range.</HelperText>
</>
```

## Disabled

### Disabled: read-only calendar chrome

```tsx
<CalendarBase>
  <CalendarBaseHeader>
    <CalendarBaseControlIconButton disabled>
      <Icon><ChevronLeft /></Icon>
    </CalendarBaseControlIconButton>
    <div style={{ display: 'flex', gap: 4 }}>
      <CalendarBasePickerButton disabled>May</CalendarBasePickerButton>
      <CalendarBasePickerButton disabled>2026</CalendarBasePickerButton>
    </div>
    <CalendarBaseControlIconButton disabled>
      <Icon><ChevronRight /></Icon>
    </CalendarBaseControlIconButton>
  </CalendarBaseHeader>
  <CalendarBaseWeekLabels>
    {getWeekDayNames(navigator.language, 'short').map((name) => (
      <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
    ))}
  </CalendarBaseWeekLabels>
  <DayPicker year={2026} month={4} disabled={new Date(2026, 4, 1).getTime()}>
    <DayPickerLayout includeOverflowDays />
  </DayPicker>
</CalendarBase>
```

## Edge

### Edge: compact weekday labels

```tsx
<CalendarBase compact>
  <CalendarBaseWeekLabels>
    {getWeekDayNames(navigator.language, 'narrow').map((name) => (
      <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
    ))}
  </CalendarBaseWeekLabels>
  <DayPicker year={2026} month={4}>
    <DayPickerLayout includeOverflowDays />
  </DayPicker>
</CalendarBase>
```
