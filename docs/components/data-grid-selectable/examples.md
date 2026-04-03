# DataGridSelectable Examples

## Basic

### Basic: quarter selector grid

```tsx
<DataGridSelectable defaultActive='0:0'>
  <DataGridSelectableRowGroup>
    <DataGridSelectableRow row={0}>
      <DataGridSelectableCell col={0}>Q1</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>Q2</DataGridSelectableCell>
    </DataGridSelectableRow>
  </DataGridSelectableRowGroup>
</DataGridSelectable>
```

## Controlled/Stateful

### Controlled/Stateful: parent-managed multi-select

```tsx
<DataGridSelectable
  selection='multiple'
  selected={selected}
  onSelectCell={setSelected}
>
  <DataGridSelectableRowGroup>
    <DataGridSelectableRow row={0}>
      <DataGridSelectableCell col={0}>Q1</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>Q2</DataGridSelectableCell>
    </DataGridSelectableRow>
    <DataGridSelectableRow row={1}>
      <DataGridSelectableCell col={0}>Q3</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>Q4</DataGridSelectableCell>
    </DataGridSelectableRow>
  </DataGridSelectableRowGroup>
</DataGridSelectable>
```

## Form/Integration

### Form/Integration: constrained availability matrix

```tsx
<DataGridSelectable
  from='1:0'
  to='3:0'
  defaultActive='1:0'
>
  <DataGridSelectableRowGroup>
    <DataGridSelectableRow row={1}>
      <DataGridSelectableCell col={0}>09:00</DataGridSelectableCell>
    </DataGridSelectableRow>
    <DataGridSelectableRow row={2}>
      <DataGridSelectableCell col={0}>10:00</DataGridSelectableCell>
    </DataGridSelectableRow>
    <DataGridSelectableRow row={3}>
      <DataGridSelectableCell col={0}>11:00</DataGridSelectableCell>
    </DataGridSelectableRow>
  </DataGridSelectableRowGroup>
</DataGridSelectable>
```

## Layout/Overlay

### Layout/Overlay: wrapped keyboard navigation grid

```tsx
<DataGridSelectable wrap='horizontal' defaultActive='0:0'>
  <DataGridSelectableRowGroup>
    <DataGridSelectableRow row={0}>
      <DataGridSelectableCell col={0}>A1</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>A2</DataGridSelectableCell>
    </DataGridSelectableRow>
    <DataGridSelectableRow row={1}>
      <DataGridSelectableCell col={0}>B1</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>B2</DataGridSelectableCell>
    </DataGridSelectableRow>
  </DataGridSelectableRowGroup>
</DataGridSelectable>
```

## Disabled

### Disabled: exclude blocked cells from movement

```tsx
<DataGridSelectable
  disabled={['0:2', '0:3']}
  excludeDisabled
>
  <DataGridSelectableRowGroup>
    <DataGridSelectableRow row={0}>
      <DataGridSelectableCell col={0}>A1</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>A2</DataGridSelectableCell>
      <DataGridSelectableCell col={2}>A3</DataGridSelectableCell>
      <DataGridSelectableCell col={3}>A4</DataGridSelectableCell>
    </DataGridSelectableRow>
  </DataGridSelectableRowGroup>
</DataGridSelectable>
```

## Edge

### Edge: custom range resolution

```tsx
<DataGridSelectable
  selection='range'
  resolveRange={(start, end) => [start.key, end.key]}
>
  <DataGridSelectableRowGroup>
    <DataGridSelectableRow row={0}>
      <DataGridSelectableCell col={0}>Start</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>Middle</DataGridSelectableCell>
      <DataGridSelectableCell col={2}>End</DataGridSelectableCell>
    </DataGridSelectableRow>
  </DataGridSelectableRowGroup>
</DataGridSelectable>
```
