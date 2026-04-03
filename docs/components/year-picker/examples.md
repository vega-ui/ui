# YearPicker Examples

## Basic

### Basic: standalone year selection

```tsx
<YearPicker>
  <YearPickerScroller>
    <YearPickerScrollerContent>
      <YearPickerScrollerLayout rows={4} cols={3} />
    </YearPickerScrollerContent>
  </YearPickerScroller>
</YearPicker>
```

## Controlled/Stateful

### Controlled/Stateful: controlled visible year

```tsx
<YearPicker year={2030}>
  <YearPickerScroller>
    <YearPickerScrollerContent>
      <YearPickerScrollerLayout rows={4} cols={3} />
    </YearPickerScrollerContent>
  </YearPickerScroller>
</YearPicker>
```

## Form/Integration

### Form/Integration: compact year grid

```tsx
<YearPicker>
  <YearPickerRowGroup>
    {createYearPickerGrid({ start: 2024, rows: 4, cols: 3, offset: 0 }).map(({ row, data }) => (
      <YearPickerRow row={row} key={row}>
        {data.map(({ col, year }) => (
          <YearPickerItem col={col} value={year} key={year}>
            {year}
          </YearPickerItem>
        ))}
      </YearPickerRow>
    ))}
  </YearPickerRowGroup>
</YearPicker>
```

## Layout/Overlay

### Layout/Overlay: scrollable year picker

```tsx
<YearPicker>
  <YearPickerScroller>
    <YearPickerScrollerContent>
      <YearPickerScrollerLayout rows={4} cols={3} />
    </YearPickerScrollerContent>
  </YearPickerScroller>
</YearPicker>
```

## Error

### Error: unavailable year hint

```tsx
<>
  <YearPicker>
    <YearPickerScroller>
      <YearPickerScrollerContent>
        <YearPickerScrollerLayout rows={4} cols={3} />
      </YearPickerScrollerContent>
    </YearPickerScroller>
  </YearPicker>
  <HelperText error>The selected fiscal year is unavailable.</HelperText>
</>
```

## Disabled

### Disabled: bounded year range

```tsx
<YearPicker from={2020} to={2030}>
  <YearPickerScroller>
    <YearPickerScrollerContent>
      <YearPickerScrollerLayout rows={4} cols={3} />
    </YearPickerScrollerContent>
  </YearPickerScroller>
</YearPicker>
```

## Edge

### Edge: custom year labels

```tsx
<YearPicker>
  <YearPickerRowGroup>
    {createYearPickerGrid({ start: 2020, rows: 4, cols: 3, offset: 0 }).map(({ row, data }) => (
      <YearPickerRow row={row} key={row}>
        {data.map(({ col, year }) => (
          <YearPickerItem
            col={col}
            value={year}
            key={year}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          >
            <span>{year}</span>
            <span style={{ fontSize: 12, color: 'var(--color-gray-accent-600)' }}>
              {year % 4 === 0 ? 'Leap cycle' : 'Standard year'}
            </span>
          </YearPickerItem>
        ))}
      </YearPickerRow>
    ))}
  </YearPickerRowGroup>
</YearPicker>
```
