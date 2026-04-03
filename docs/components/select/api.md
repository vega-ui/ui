# Select API

## Root API

`Select` is the root state container for the whole composition.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | No | the select is disabled. |
| `readOnly` | `boolean` | `false` | No | the select cannot be changed but remains focusable. |
| `variant` | `SelectVariant` | `'field'` | No | Visual style variant for the select control. |
| `size` | `SelectSize` | `'md'` | No | Visual size of the select control. |
| `value` | `V \\| undefined` | `—` | No | currently selected value (controlled). |
| `defaultValue` | `V \\| undefined` | `'' as V` | No | default selected value (uncontrolled). |
| `onSelectValue` | `(value: V \\\| undefined) => void` | `—` | No | Callback fired when an option is selected. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref to the trigger button element. |
| `open` | `boolean` | `—` | No | Controls the open state of the Select dropdown. |
| `onOpenChange` | `(open: boolean) => void` | `—` | No | Callback fired when the open state changes. |
| `defaultOpen` | `boolean` | `false` | No | Sets the initial open state of the Select when used in uncontrolled mode. |
| `typeMatchEnabled` | `boolean` | `true` | No | Enables type-based matching for typeahead navigation. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `SelectCombobox`

Visible trigger surface for the select.

- Typical children: `SelectValue`, `SelectIcon`
- Should remain inside `Select`

## `SelectValue`

Renders the selected value or placeholder.

- Supports placeholder content
- May render custom children for richer selected-value UI

## `SelectIcon`

Optional trigger affordance.

- Usually rendered at the end of `SelectCombobox`
- Purely visual unless custom interaction is intentionally added

## `SelectPortal`

Optional overlay mount wrapper.

- Use when the listbox should escape clipping or stacking contexts

## `SelectListbox`

Container for registered options.

- Expected children: `SelectOption`
- Common place for scroll limits, search fields, and custom list layout

## `SelectOption`

Selectable list item.

- `value` must be `string` or `number`
- Registers itself into the root option model
- Can render richer child content, but selection value remains scalar

## `SelectHiddenSelect`

Hidden native select element.

- Recommended for forms
- Helps with native submission and form tooling integration

## Hooks

## `useSelectContext`

Advanced hook for custom wrappers around the shipped parts.

Use it only when the exported parts are insufficient for the desired composition.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `SelectProps<V extends string \| number = string>` | Root prop type | Generic value type for selection. |
| `SelectSize` | `'sm' \| 'md' \| 'lg' \| string` | Visual size token. |
| `SelectVariant` | `'inline' \| 'field' \| string` | Visual trigger variant. |

## State Model

- Selected value can be controlled with `value` or uncontrolled with `defaultValue`.
- Open state can be controlled with `open` or uncontrolled with `defaultOpen`.
- Keyboard navigation, active index, and typeahead are managed by the root.
- `typeMatchEnabled={false}` is recommended when an actual text input is rendered inside the listbox.

## Integration Notes

- Use `SelectHiddenSelect` when the value should participate in native form submission.
- Use `SelectPortal` when the listbox needs to avoid clipping, overflow, or stacking-context issues.
- Avoid object values. The public API is built for `string` and `number` values only.
