# Fieldset API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `appearance` | `FieldsetAppearance` | `'transparent'` | No | Visual appearance of the fieldset container. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `FieldsetLegend`: semantic legend for the group.
- `FieldsetHeader`: optional descriptive block below the legend.

## Types

- `FieldsetAppearance = 'transparent' | 'outlined' | string`
- `FieldsetProps`
- `FieldsetLegendProps`
- `FieldsetHeaderProps`

## State Model

- `Fieldset` itself does not manage controlled state.
- Native `disabled` on the root disables descendant form controls by browser semantics.
- Validation, selection, and value state belong to the controls rendered inside the group.
