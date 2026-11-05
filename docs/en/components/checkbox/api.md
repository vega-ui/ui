# Checkbox API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `CheckboxVariant` | `'primary'` | No | Visual variant of the checkbox, for theme or context switching. |
| `size` | `CheckboxSize` | `'md'` | No | Size of the checkbox input and its visual marker. |
| `ref` | `Ref<HTMLLabelElement>` | — | No | Ref to the native label element. |

Also accepts all `<label>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `CheckboxInput`: the native `<input type="checkbox">`. Takes `checked`, `defaultChecked`, `onChange`, `disabled`, `name`, `value` and `indeterminate`.
- `CheckboxIndicator`: visible checkbox surface.
- `CheckboxCheckedIcon`: optional checked-state icon.
- `CheckboxIndeterminateIcon`: optional indeterminate-state icon.

### `CheckboxInput`

<!-- AUTO-GENERATED:PART_API:CheckboxInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `indeterminate` | `boolean` | — | No | Sets the native `indeterminate` property of the input. Often used when only some nested items are selected. It has no HTML attribute, so it is applied imperatively. |
| `ref` | `Ref<HTMLInputElement>` | — | No | The optional `ref` provides direct access to the underlying * `<input type="checkbox">` element for advanced use cases such * as focus management or imperative state inspection. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxInput:end -->

### `CheckboxIndicator`

<!-- AUTO-GENERATED:PART_API:CheckboxIndicator:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxIndicator:end -->

### `CheckboxCheckedIcon`

<!-- AUTO-GENERATED:PART_API:CheckboxCheckedIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxCheckedIcon:end -->

### `CheckboxIndeterminateIcon`

<!-- AUTO-GENERATED:PART_API:CheckboxIndeterminateIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxIndeterminateIcon:end -->

## Types

- `CheckboxProps`
- `CheckboxInputProps`
- `CheckboxIndicatorProps`
- `CheckboxCheckedIconProps`
- `CheckboxIndeterminateIconProps`
- `CheckboxVariant`
- `CheckboxSize`

## State Model

- Checked state lives on `CheckboxInput`, like on a native checkbox: uncontrolled through `defaultChecked`, controlled through `checked` and `onChange`.
- `indeterminate` on `CheckboxInput` sets the native `indeterminate` property. It is usually a visual partial-selection state.
- `Checkbox` owns only `size` and `variant`; `useCheckboxContext` exposes them to custom parts.
