# DayPicker Examples

## Basic

### Basic: standalone day grid

```tsx
<DayPicker>
  <DayPickerScroller>
    <DayPickerScrollerContent>
      <DayPickerScrollerLayout includeOverflowDays />
    </DayPickerScrollerContent>
  </DayPickerScroller>
</DayPicker>
```

## Controlled/Stateful

### Controlled/Stateful: controlled visible period

```tsx
<DayPicker year={2026} month={4}>
  <DayPickerScroller>
    <DayPickerScrollerContent>
      <DayPickerScrollerLayout includeOverflowDays />
    </DayPickerScrollerContent>
  </DayPickerScroller>
</DayPicker>
```

## Form/Integration

### Form/Integration: compact date selection surface

```tsx
<DayPicker>
  {createDayPickerGrid({ year: 2026, month: 4, includeOverflowDays: true }).map(({ row, data }) => (
    <DayPickerRow row={row} key={row}>
      {data.map(({ col, year, month, day, inCurrentMonth }, index) => (
        <DayPickerItem
          col={col}
          value={day ? new Date(year, month, day).getTime() : undefined}
          disabled={!inCurrentMonth}
          excluded={!inCurrentMonth}
          key={index}
        >
          {day}
        </DayPickerItem>
      ))}
    </DayPickerRow>
  ))}
</DayPicker>
```

## Layout/Overlay

### Layout/Overlay: swipable month paging

```tsx
<DayPicker>
  <DayPickerScroller>
    <DayPickerScrollerContent>
      <DayPickerScrollerLayout includeOverflowDays />
    </DayPickerScrollerContent>
  </DayPickerScroller>
</DayPicker>
```

## Error

### Error: out-of-range date hint

```tsx
<>
  <DayPicker>
    <DayPickerScroller>
      <DayPickerScrollerContent>
        <DayPickerScrollerLayout includeOverflowDays />
      </DayPickerScrollerContent>
    </DayPickerScroller>
  </DayPicker>
  <HelperText error>Dates outside the supported booking window are unavailable.</HelperText>
</>
```

## Disabled

### Disabled: overflow days excluded

```tsx
<DayPicker>
  <DayPickerLayout includeOverflowDays={false} />
</DayPicker>
```

## Edge

### Edge: custom day grid from helper output

```tsx
<DayPicker>
  {createDayPickerGrid({ year: 2025, month: 10, offset: 0 }).map(({ row, data }) => (
    <DayPickerRow row={row} key={row}>
      {data.map(({ col, year, month, day, inCurrentMonth }, index) => (
        <DayPickerItem
          col={col}
          value={day ? new Date(year, month, day).getTime() : undefined}
          disabled={!inCurrentMonth}
          excluded={!inCurrentMonth}
          key={index}
        >
          {day}
        </DayPickerItem>
      ))}
    </DayPickerRow>
  ))}
</DayPicker>
```
