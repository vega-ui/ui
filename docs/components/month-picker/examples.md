# MonthPicker Examples

## Basic

### Basic: standalone month chooser

```tsx
<MonthPicker>
  <MonthPickerLayout rows={4} cols={3} start={0} />
</MonthPicker>
```

## Controlled/Stateful

### Controlled/Stateful: range selection

```tsx
<MonthPicker selection='range'>
  <MonthPickerLayout rows={4} cols={3} start={0} />
</MonthPicker>
```

## Form/Integration

### Form/Integration: compact picker block

```tsx
<MonthPicker>
  <MonthPickerRowGroup>
    {createMonthPickerGrid({ start: 0, rows: 4, cols: 3 }).map(({ row, data }) => (
      <MonthPickerRow row={row} key={row}>
        {data.map(({ col, month }) => (
          <MonthPickerItem col={col} value={month} key={month}>
            {new Date(2026, month, 1).toLocaleString(navigator.language, { month: 'short' })}
          </MonthPickerItem>
        ))}
      </MonthPickerRow>
    ))}
  </MonthPickerRowGroup>
</MonthPicker>
```

## Layout/Overlay

### Layout/Overlay: embedded custom layout

```tsx
<MonthPicker>
  <MonthPickerLayout rows={3} cols={4} start={0} />
</MonthPicker>
```

## Error

### Error: unavailable month hint

```tsx
<>
  <MonthPicker>
    <MonthPickerLayout rows={4} cols={3} start={0} />
  </MonthPicker>
  <HelperText error>Some months are unavailable for booking in the current fiscal year.</HelperText>
</>
```

## Disabled

### Disabled: bounded range selection

```tsx
<MonthPicker selection='range' from={2} to={8}>
  <MonthPickerLayout rows={4} cols={3} start={0} />
</MonthPicker>
```

## Edge

### Edge: custom month labels

```tsx
<MonthPicker style={{ width: 420 }}>
  <MonthPickerRowGroup>
    {createMonthPickerGrid({ start: 0, rows: 4, cols: 3 }).map(({ row, data }) => (
      <MonthPickerRow row={row} key={row}>
        {data.map(({ col, month }) => (
          <MonthPickerItem
            col={col}
            value={month}
            key={month}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          >
            <span>{new Date(2026, month, 1).toLocaleString(navigator.language, { month: 'long' })}</span>
            <span style={{ fontSize: 12, color: 'var(--color-gray-accent-600)' }}>
              {month <= 1 || month === 11 ? 'Winter' : month <= 4 ? 'Spring' : month <= 7 ? 'Summer' : 'Autumn'}
            </span>
          </MonthPickerItem>
        ))}
      </MonthPickerRow>
    ))}
  </MonthPickerRowGroup>
</MonthPicker>
```
