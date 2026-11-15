---
'@vega-ui/react': major
'@vega-ui/tokens-core': minor
---

BREAKING: components get their own layout defaults, so the common workarounds are no longer needed.

- **Roundness.** New `--br-ratio` token in `@vega-ui/tokens-core` (default `0.333`). `Button`, `IconButton`, the fields, `TextArea`, `PinField`, `Checkbox`, `Option`, `Select`, `SegmentedControl`, `GridItem` and `Badge` read their `--*-br-ratio` from it, and `Code` takes its radius as its line height times it, so one value makes them all square, rounder or pill-shaped. It works on a nested element too. Update `@vega-ui/tokens-core` with `@vega-ui/react`.
- **`Badge` radius variable.** `--badge-border-radius-ratio` is renamed to `--badge-br-ratio`, like on the other components.
- **`Fieldset`.** The browser margin is reset. A transparent `Fieldset` puts `var(--spacing-6)` under its legend, which the flex `gap` does not reach.
- **`FieldsetLegend` size.** The legend uses the `Label` text size instead of a larger one.
- **`Checkbox` layout.** The root is an `inline-flex` row with centered items and a `var(--spacing-4)` gap, so the box no longer sits on its own line above the text. `CheckboxIndicator` does not shrink.
- **`SegmentedControl`.** Segments share the width equally and can shrink in a narrow container instead of overflowing it. A disabled segment uses `--disable-label-text-color`, like a disabled `Option`.
- **`Pagination`.** The list has no browser margin or padding, and the gap between items is `var(--spacing-2)` instead of `var(--spacing-6)`.
- **`TextArea` size.** The sizes match `TextField`: one row is 36, 42 and 48px tall for `sm`, `md` and `lg`, like a `Button` or `IconButton` of the same size.
- **`Calendar` width.** `CalendarContent` no longer reports the width of all its scrolled pages, so a calendar in a flex row or a shrink-to-fit container is as wide as one month instead of several.
- **Picker items.** `GridItem` has `var(--spacing-3)` inline padding inside its minimum width, so month and year labels no longer touch.
- **`Table`.** The default `dataAlign="between"` aligns the middle columns to the start instead of centering them. A `TableHeading` inside `TableHead` draws the line under the row itself, so the line stays with sticky headings.
- **`AvatarFallback`.** Its font size no longer uses `!important`, so `style` can override it.
- **Selected `Option`.** Inside a selected option `--label-secondary` and `--label-tertiary` follow `--option-color`, so secondary text stays readable on the selected fill.
- **`Code` wrapping.** Long tokens wrap with `overflow-wrap: anywhere`.
- **`Avatar`.** The avatar does not shrink in a flex row.
- **`MeterStack`.** The root has `role="group"`. Name it with `aria-label` or `aria-labelledby`.
- **`Switch`.** `--switch-indicator-transition-delay` applies again.
