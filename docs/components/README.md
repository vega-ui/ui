# Components

This section documents the public component API from `@vega-ui/react`.

## Coverage

The pages below cover all current public exports from `packages/ui/src`, except `Stepper`, which is present as an empty directory and is not part of the public API.

## Documentation Contract

See [Component Documentation Structure](./structure.md) for the declared file layout, file roles, and required doc profiles for `primitive`, `form-control`, `compound`, and `advanced interactive` components.

For decision-oriented navigation across related controls, see [Component Families](../families/README.md).

## Components

- [Accordion](./accordion/)
- [Alert](./alert/)
- [Avatar](./avatar/)
- [AvatarStack](./avatar-stack/)
- [Backdrop](./backdrop/)
- [Badge](./badge/)
- [Button](./button/)
- [ButtonBase](./button-base/)
- [Calendar](./calendar/)
- [CalendarBase](./calendar-base/)
- [Card](./card/)
- [Checkbox](./checkbox/)
- [CheckboxCard](./checkbox-card/)
- [Code](./code/)
- [Collapsible](./collapsible/)
- [DataGrid](./data-grid/)
- [DataGridPicker](./data-grid-picker/)
- [DataGridSelectable](./data-grid-selectable/)
- [DateField](./date-field/)
- [DateRangeField](./date-range-field/)
- [DateTimeField](./date-time-field/)
- [DayPicker](./day-picker/)
- [Dialog](./dialog/)
- [Drawer](./drawer/)
- [Fieldset](./fieldset/)
- [Heading](./heading/)
- [HelperText](./helper-text/)
- [Icon](./icon/)
- [IconButton](./icon-button/)
- [IndexedSnapScroller](./indexed-snap-scroller/)
- [Label](./label/)
- [Link](./link/)
- [Meter](./meter/)
- [MeterStack](./meter-stack/)
- [MonthPicker](./month-picker/)
- [NumberField](./number-field/)
- [Option](./option/)
- [PageControl](./page-control/)
- [Pagination](./pagination/)
- [PasswordField](./password-field/)
- [PhoneField](./phone-field/)
- [PinField](./pin-field/)
- [Popover](./popover/)
- [Progress](./progress/)
- [Radio](./radio/)
- [RangeSlider](./range-slider/)
- [SegmentedControl](./segmented-control/)
- [Select](./select/)
- [Separator](./separator/)
- [Sheet](./sheet/)
- [Slider](./slider/)
- [SliderBase](./slider-base/)
- [Slot](./slot/)
- [SnapScroller](./snap-scroller/)
- [Spinner](./spinner/)
- [Switch](./switch/)
- [Table](./table/)
- [Text](./text/)
- [TextArea](./text-area/)
- [TextField](./text-field/)
- [TimeField](./time-field/)
- [Tooltip](./tooltip/)
- [VisuallyHidden](./visually-hidden/)
- [YearPicker](./year-picker/)

## Per-Component Layout

Each component now lives in its own directory under `docs/components/<component>/`.

- `index.md`: primary component overview, examples, variants, edge cases, and mistakes
- `examples.md`: optional deeper scenarios and cookbook-style recipes
- `api.md`: optional prop and type reference
- `styling.md`: optional CSS variable and theming contract
- `accessibility.md`: optional keyboard, focus, labeling, and screen-reader guidance
- `comparison.md`: optional component-choice guidance against similar controls
- `patterns.md`: optional reusable integration patterns
- `troubleshooting.md`: optional common failure modes and fixes
- `anatomy.md`: optional compound-component structure and composition contract

For now, every component has `index.md`. Use the additional files for higher-complexity components such as `Select`, `Dialog`, `Calendar`, `PhoneField`, and `DataGrid`.

## Doc Profiles

Each public component should match one required profile from [structure.md](./structure.md):

- `primitive`: `index.md`
- `form-control`: `index.md`, `examples.md`, `api.md`, `accessibility.md`
- `compound`: `index.md`, `anatomy.md`, `examples.md`, `api.md`
- `advanced interactive`: full component set including `styling.md`, `comparison.md`, `patterns.md`, and `troubleshooting.md`

## Scope Per Page

Each page is intentionally source-driven:

1. Import path and exported public parts.
2. At least one concrete example.
3. Scenario examples labeled with the shared taxonomy where applicable:
   `Basic`, `Controlled/Stateful`, `Form/Integration`, `Layout/Overlay`, `Error`, `Disabled`, `Edge`.
4. Variants or composition variants.
5. Source-visible types when they matter to consumers.
6. Edge cases already implied by stories, tests, or composition.
7. Common mistakes that are easy to make during integration.
