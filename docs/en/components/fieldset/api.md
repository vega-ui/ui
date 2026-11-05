# Fieldset API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `appearance` | `FieldsetAppearance` | `'transparent'` | No | Visual appearance of the fieldset container. |

Also accepts all `<fieldset>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `FieldsetLegend`: semantic legend for the group.
- `FieldsetHeader`: optional descriptive block below the legend.

### `FieldsetLegend`

<!-- AUTO-GENERATED:PART_API:FieldsetLegend:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | No | Visual size of the text, typically mapped to the design system’s type scale. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:FieldsetLegend:end -->

### `FieldsetHeader`

<!-- AUTO-GENERATED:PART_API:FieldsetHeader:start -->
Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:FieldsetHeader:end -->

## Types

- `FieldsetAppearance = 'transparent' | 'outlined' | string`
- `FieldsetProps`
- `FieldsetLegendProps`
- `FieldsetHeaderProps`

## State Model

- `Fieldset` itself does not manage controlled state.
- Native `disabled` on the root disables descendant form controls by browser semantics.
- Validation, selection, and value state belong to the controls rendered inside the group.
