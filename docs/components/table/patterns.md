# Table Patterns

## Pricing Or Comparison Table

When to use:

- A small set of rows and clear columns should stay semantically tabular.

Composition notes:

- Keep column labels explicit in `TableHead`.
- Prefer `fullWidth` when the table should read as a primary content block.

Trade-offs:

- Strong semantic clarity.
- Requires a consumer-owned overflow strategy on small screens.

```tsx
<Table fullWidth>
  <TableHead>
    <TableRow>
      <TableCell as='th'>Plan</TableCell>
      <TableCell as='th'>Seats</TableCell>
      <TableCell as='th'>Price</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Starter</TableCell>
      <TableCell>5</TableCell>
      <TableCell>$29</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Pro</TableCell>
      <TableCell>20</TableCell>
      <TableCell>$99</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Summary Table With Footer Totals

When to use:

- The table needs aggregated totals or summary values.

Composition notes:

- Keep summaries in `TableFoot` rather than inventing ad-hoc footer rows.
- Align numeric columns consistently between body and footer.

Trade-offs:

- Keeps totals semantically tied to the table.
- Can feel heavy if the table contains only one or two rows.

```tsx
<Table>
  <TableBody>
    <TableRow>
      <TableCell>Storage</TableCell>
      <TableCell>240 GB</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bandwidth</TableCell>
      <TableCell>1.2 TB</TableCell>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell>1.44 TB equivalent</TableCell>
    </TableRow>
  </TableFoot>
</Table>
```

## Table Inside Review Overlays

When to use:

- A dialog or drawer needs a compact tabular summary.

Composition notes:

- Keep the table narrow and scannable.
- Do not let the overlay become dependent on horizontal scrolling unless the layout is designed for it.

Trade-offs:

- Good for summaries and invoice breakdowns.
- Less robust for wide multi-column datasets.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>View summary</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>$120</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell>$24</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>$144</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```
