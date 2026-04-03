# Table Examples

## Basic

### Basic: full-width pricing table

Use this for straightforward read-only tabular data with clear column labels.

```tsx
<Table fullWidth>
  <TableHead>
    <TableRow>
      <TableHeading>Plan</TableHeading>
      <TableHeading>Price</TableHeading>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableData>Starter</TableData>
      <TableData>$9</TableData>
    </TableRow>
  </TableBody>
</Table>
```

## Controlled/Stateful

### Controlled/Stateful: alignment owned by parent layout state

Use this when a surrounding view controls how values align.

```tsx
const [align, setAlign] = useState<'start' | 'center' | 'end' | 'between'>('between');

<>
  <Button variant='secondary' onClick={() => setAlign('end')}>Align end</Button>
  <Table dataAlign={align}>
    <TableBody>
      <TableRow>
        <TableData>Invoice #1042</TableData>
        <TableData>$999</TableData>
      </TableRow>
    </TableBody>
  </Table>
</>
```

## Form/Integration

### Form/Integration: table with footer summary

Use this when totals or summaries should stay in semantic footer structure.

```tsx
<Table>
  <TableBody>
    <TableRow>
      <TableData>Starter</TableData>
      <TableData>$9</TableData>
    </TableRow>
    <TableRow>
      <TableData>Pro</TableData>
      <TableData>$29</TableData>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableData>Total</TableData>
      <TableData>$38</TableData>
    </TableRow>
  </TableFoot>
</Table>
```

## Layout/Overlay

### Layout/Overlay: billing table inside a dialog

Use this when a compact semantic table appears inside an overlay review flow.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>View invoice breakdown</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <Table fullWidth>
          <TableBody>
            <TableRow>
              <TableData>Base subscription</TableData>
              <TableData>$499</TableData>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: empty-state row when data is unavailable

Use this when the table structure stays visible but the data set is missing or failed to load.

```tsx
<Table fullWidth>
  <TableBody>
    <TableRow>
      <TableData colSpan={3}>No invoice rows are available for the selected period.</TableData>
    </TableRow>
  </TableBody>
</Table>
```

## Disabled

### Disabled: visually subdued archived rows

Use row-level styling when the data remains visible but should read as inactive.

```tsx
<Table>
  <TableBody>
    <TableRow style={{ opacity: 0.5 }}>
      <TableData>Archived plan</TableData>
      <TableData>$0</TableData>
    </TableRow>
  </TableBody>
</Table>
```

## Edge

### Edge: flush edges without extra padding

Use this when the table already sits inside a padded container and should align flush with surrounding content.

```tsx
<Table edgePadded={false} fullWidth>
  <TableBody>
    <TableRow>
      <TableData>VegaUI</TableData>
      <TableData>Design system</TableData>
    </TableRow>
  </TableBody>
</Table>
```
