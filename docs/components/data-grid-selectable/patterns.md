# DataGridSelectable Patterns

## Availability Matrix

When to use:
Build a schedule or capacity grid where the app owns the visual cell treatment.

Composition notes:
Keep cell keys stable and use `disabled` or `exclude` for blocked positions.

Trade-offs:
You get fine-grained control, but also own the visible selected and active states in the cell UI.

```tsx
<DataGridSelectable selection='multiple'>
  <DataGridSelectableRowGroup>
    <DataGridSelectableRow row={0}>
      <DataGridSelectableCell col={0}>Mon</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>Tue</DataGridSelectableCell>
      <DataGridSelectableCell col={2}>Wed</DataGridSelectableCell>
    </DataGridSelectableRow>
  </DataGridSelectableRowGroup>
</DataGridSelectable>
```

## Custom Range Grid

When to use:
Range selection should follow domain-specific ordering instead of simple matrix order.

Composition notes:
Provide `compare` and `resolveRange` so expansion matches the product model.

Trade-offs:
The behavior becomes powerful, but debugging range edges is more involved.

```tsx
<DataGridSelectable
  selection='range'
  compare={compareSlots}
  resolveRange={resolveSlots}
>
  <DataGridSelectableRowGroup>
    <DataGridSelectableRow row={0}>
      <DataGridSelectableCell col={0}>09:00</DataGridSelectableCell>
      <DataGridSelectableCell col={1}>10:00</DataGridSelectableCell>
      <DataGridSelectableCell col={2}>11:00</DataGridSelectableCell>
    </DataGridSelectableRow>
  </DataGridSelectableRowGroup>
</DataGridSelectable>
```
