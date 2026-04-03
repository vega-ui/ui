# DataGridPicker Examples

## Basic

### Basic: compact month-like matrix

```tsx
<DataGridPicker size='sm'>
  <DataGridPickerRowGroup>
    <DataGridPickerRow row={0}>
      <DataGridPickerItem col={0} value='jan'>Jan</DataGridPickerItem>
      <DataGridPickerItem col={1} value='feb'>Feb</DataGridPickerItem>
    </DataGridPickerRow>
    <DataGridPickerRow row={1}>
      <DataGridPickerItem col={0} value='mar'>Mar</DataGridPickerItem>
      <DataGridPickerItem col={1} value='apr'>Apr</DataGridPickerItem>
    </DataGridPickerRow>
  </DataGridPickerRowGroup>
</DataGridPicker>
```

## Controlled/Stateful

### Controlled/Stateful: controlled range picker grid

```tsx
<DataGridPicker
  selection='range'
  selected={selected}
  onSelectCell={setSelected}
>
  <DataGridPickerRowGroup>
    <DataGridPickerRow row={0}>
      <DataGridPickerItem col={0} value='q1'>Q1</DataGridPickerItem>
      <DataGridPickerItem col={1} value='q2'>Q2</DataGridPickerItem>
    </DataGridPickerRow>
    <DataGridPickerRow row={1}>
      <DataGridPickerItem col={0} value='q3'>Q3</DataGridPickerItem>
      <DataGridPickerItem col={1} value='q4'>Q4</DataGridPickerItem>
    </DataGridPickerRow>
  </DataGridPickerRowGroup>
</DataGridPicker>
```

## Form/Integration

### Form/Integration: quarter selector in a billing flow

```tsx
<DataGridPicker defaultActive='0:0'>
  <DataGridPickerRowGroup>
    <DataGridPickerRow row={0}>
      <DataGridPickerItem col={0} value='q1'>Q1</DataGridPickerItem>
      <DataGridPickerItem col={1} value='q2'>Q2</DataGridPickerItem>
    </DataGridPickerRow>
    <DataGridPickerRow row={1}>
      <DataGridPickerItem col={0} value='q3'>Q3</DataGridPickerItem>
      <DataGridPickerItem col={1} value='q4'>Q4</DataGridPickerItem>
    </DataGridPickerRow>
  </DataGridPickerRowGroup>
</DataGridPicker>
```

## Layout/Overlay

### Layout/Overlay: paged emoji picker

```tsx
<DataGridPicker selection='range'>
  <DataGridPickerScroller style={{ width: 210 }}>
    <DataGridPickerScrollerContent>
      <DataGridPickerRowGroup scope={pageIndex}>
        {emojiPages[pageIndex].map((row, rowIndex) => (
          <DataGridPickerRow row={rowIndex} key={rowIndex}>
            {row.map((emoji, col) => (
              <DataGridPickerItem key={`${pageIndex}:${rowIndex}:${col}`} col={col} value={`${pageIndex}:${rowIndex}:${col}`}>
                {emoji}
              </DataGridPickerItem>
            ))}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    </DataGridPickerScrollerContent>
  </DataGridPickerScroller>
</DataGridPicker>
```

## Disabled

### Disabled: blocked cells inside a dense picker

```tsx
<DataGridPicker disabled={['0:1', '0:2']}>
  <DataGridPickerRowGroup>
    <DataGridPickerRow row={0}>
      <DataGridPickerItem col={0} value='A1'>A1</DataGridPickerItem>
      <DataGridPickerItem col={1} value='A2'>A2</DataGridPickerItem>
      <DataGridPickerItem col={2} value='A3'>A3</DataGridPickerItem>
    </DataGridPickerRow>
    <DataGridPickerRow row={1}>
      <DataGridPickerItem col={0} value='B1'>B1</DataGridPickerItem>
      <DataGridPickerItem col={1} value='B2'>B2</DataGridPickerItem>
      <DataGridPickerItem col={2} value='B3'>B3</DataGridPickerItem>
    </DataGridPickerRow>
  </DataGridPickerRowGroup>
</DataGridPicker>
```

## Edge

### Edge: wrapped keyboard movement in a compact grid

```tsx
<DataGridPicker wrap='both' defaultActive='0:0'>
  <DataGridPickerRowGroup>
    <DataGridPickerRow row={0}>
      <DataGridPickerItem col={0} value='1'>1</DataGridPickerItem>
      <DataGridPickerItem col={1} value='2'>2</DataGridPickerItem>
    </DataGridPickerRow>
    <DataGridPickerRow row={1}>
      <DataGridPickerItem col={0} value='3'>3</DataGridPickerItem>
      <DataGridPickerItem col={1} value='4'>4</DataGridPickerItem>
    </DataGridPickerRow>
  </DataGridPickerRowGroup>
</DataGridPicker>
```
