# DataGrid Patterns

## Spreadsheet Navigation

When to use:

users move across a dense matrix with the keyboard.

Composition notes:

Keep row and cell coordinates explicit and define wrap behavior intentionally.

Trade-offs:

Powerful keyboard control, but higher integration complexity than a static table.

```tsx
<DataGrid defaultActive='0:0' wrap='horizontal'>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>Mon</DataGridCell>
      <DataGridCell col={1}>Tue</DataGridCell>
      <DataGridCell col={2}>Wed</DataGridCell>
    </DataGridRow>
    <DataGridRow row={1}>
      <DataGridCell col={0}>Draft</DataGridCell>
      <DataGridCell col={1}>Review</DataGridCell>
      <DataGridCell col={2}>Publish</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```

## Sparse Planner Grid

When to use:

the visual layout contains intentional gaps.

Composition notes:

Use exclusion logic that matches the visible matrix.

Trade-offs:

Keeps navigation aligned with the layout, but requires explicit maintenance of excluded cells.

```tsx
<DataGrid exclude={['0:0', '0:1']}>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={2}>Value</DataGridCell>
      <DataGridCell col={3}>Delta</DataGridCell>
    </DataGridRow>
    <DataGridRow row={1}>
      <DataGridCell col={0}>North</DataGridCell>
      <DataGridCell col={1}>12</DataGridCell>
      <DataGridCell col={2}>+2</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```

## Controlled Active Cell

When to use:

the parent flow needs to sync grid position with other UI.

Composition notes:

Own `active` state in the parent and use external controls carefully.

Trade-offs:

More control, but more state coordination work.

```tsx
<DataGrid active={active} onChangeActive={setActive}>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>A</DataGridCell>
      <DataGridCell col={1}>B</DataGridCell>
    </DataGridRow>
    <DataGridRow row={1}>
      <DataGridCell col={0}>1</DataGridCell>
      <DataGridCell col={1}>2</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```
