# Table Accessibility

## Labeling

Use clear column labels in `TableHead` whenever the data has meaningful columns. If the table needs a title or summary, provide it in the surrounding UI.

## Keyboard Behavior

- Native table navigation is usually enough for read-only and lightly interactive data.
- Do not assume `Table` provides grid-style cell navigation.
- Interactive controls inside cells should still be individually keyboard reachable.

## Focus Behavior

- The table itself usually does not need focus.
- Focus behavior comes from interactive content placed inside cells.
- Tables inside overlays should still be tested for overflow and reading order.

## Screen Reader Semantics

- Semantic sections like `TableHead` and `TableBody` improve structural understanding.
- Use `TableHeading` for true headings rather than styling data cells to look like headings.
- Footer summaries belong in `TableFoot` when they are part of the table structure.

## Form Semantics

- `Table` is a data-display component, not a field component.
- If inputs are placed inside cells, their form semantics belong to those inputs rather than to the table root.

## Accessibility Risks

- Replacing semantic headers with styled plain text.
- Using `Table` for grid-like interactions that need richer keyboard support.
- Letting horizontal overflow clip columns without an explicit consumer strategy.
