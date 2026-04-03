# DataGrid Examples

## Basic

### Basic: spreadsheet-like row

```tsx
<DataGrid>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>Q1</DataGridCell>
      <DataGridCell col={1}>$12,000</DataGridCell>
      <DataGridCell col={2}>Approved</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```

## Controlled/Stateful

### Controlled/Stateful: controlled active cell

```tsx
const [active, setActive] = useState('0:0');

<DataGrid active={active} onChangeActive={(key) => setActive(String(key))}>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>Mon</DataGridCell>
      <DataGridCell col={1}>Tue</DataGridCell>
      <DataGridCell col={2}>Wed</DataGridCell>
    </DataGridRow>
    <DataGridRow row={1}>
      <DataGridCell col={0}>Design</DataGridCell>
      <DataGridCell col={1}>Review</DataGridCell>
      <DataGridCell col={2}>Ship</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```

## Form/Integration

### Form/Integration: grid with interactive navigation controls

```tsx
<div>
  <IconButton size='xs' aria-label='Previous range'>
    <Icon><ChevronLeft /></Icon>
  </IconButton>
  <DataGrid defaultActive='0:0'>
    <DataGridRowGroup>
      <DataGridRow row={0}>
        <DataGridCell col={0}>Room A</DataGridCell>
        <DataGridCell col={1}>Room B</DataGridCell>
        <DataGridCell col={2}>Room C</DataGridCell>
      </DataGridRow>
      <DataGridRow row={1}>
        <DataGridCell col={0}>09:00</DataGridCell>
        <DataGridCell col={1}>10:00</DataGridCell>
        <DataGridCell col={2}>11:00</DataGridCell>
      </DataGridRow>
    </DataGridRowGroup>
  </DataGrid>
</div>
```

## Layout/Overlay

### Layout/Overlay: planner grid

```tsx
<DataGrid>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>Design</DataGridCell>
      <DataGridCell col={1}>In review</DataGridCell>
      <DataGridCell col={2}>Approved</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```

## Error

### Error: sparse grid without matching exclusion logic

```tsx
<DataGrid wrap='both'>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>Header</DataGridCell>
      <DataGridCell col={2}>Value</DataGridCell>
    </DataGridRow>
    <DataGridRow row={2}>
      <DataGridCell col={0}>Planned</DataGridCell>
      <DataGridCell col={2}>Actual</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```

## Disabled

### Disabled: excluded header row

```tsx
<DataGrid defaultActive='1:0' exclude={['0:0', '0:1', '0:2', '0:3', '0:4']}>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>Mon</DataGridCell>
      <DataGridCell col={1}>Tue</DataGridCell>
      <DataGridCell col={2}>Wed</DataGridCell>
      <DataGridCell col={3}>Thu</DataGridCell>
      <DataGridCell col={4}>Fri</DataGridCell>
    </DataGridRow>
    <DataGridRow row={1}>
      <DataGridCell col={0}>Free</DataGridCell>
      <DataGridCell col={1}>Busy</DataGridCell>
      <DataGridCell col={2}>Busy</DataGridCell>
      <DataGridCell col={3}>Free</DataGridCell>
      <DataGridCell col={4}>Free</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```

## Edge

### Edge: both-wrapped navigation

```tsx
<DataGrid defaultActive='0:0' wrap='both'>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>A1</DataGridCell>
      <DataGridCell col={1}>A2</DataGridCell>
    </DataGridRow>
    <DataGridRow row={1}>
      <DataGridCell col={0}>B1</DataGridCell>
      <DataGridCell col={1}>B2</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```
