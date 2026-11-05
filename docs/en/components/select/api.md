# Select API

## Root API

`Select` is the root state container for the whole composition.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | No | Whether the select is disabled. Prevents interaction and applies a disabled style. |
| `readOnly` | `boolean` | `false` | No | If true, the select cannot be changed but remains focusable. |
| `variant` | `SelectVariant` | `'field'` | No | Visual style variant for the select control. |
| `size` | `SelectSize` | `'md'` | No | Visual size of the select control. |
| `value` | `V \| null` | — | No | The currently selected value (controlled). `null` clears the selection, while `undefined` makes the select uncontrolled. |
| `defaultValue` | `V` | — | No | The default selected value (uncontrolled). |
| `onChangeValue` | `(value: V \| undefined) => void` | — | No | Callback fired when an option is selected. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root element. |
| `open` | `boolean` | — | No | Controls the open state of the Select dropdown. When provided, the Select becomes a controlled component and relies on this value to determine whether the listbox is open or closed. |
| `onChangeOpen` | `(open: boolean) => void` | — | No | Callback fired when the open state changes. Called with the next open state (`true` or `false`) whenever the Select is opened or closed by user interaction. Useful for synchronizing the Select state with external logic. |
| `defaultOpen` | `boolean` | `false` | No | Sets the initial open state of the Select when used in uncontrolled mode. Applied only on the first render and ignored afterward. |
| `typeahead` | `boolean` | `true` | No | Enables moving to an option by typing the start of its label. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `SelectCombobox`

Visible trigger surface for the select.

<!-- AUTO-GENERATED:PART_API:SelectCombobox:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref to the underlying `<button>` element. Useful for focus management, positioning, and imperative access. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:SelectCombobox:end -->

- Typical children: `SelectValue`, `SelectIcon`
- Should remain inside `Select`

## `SelectValue`

Renders the selected value or placeholder.

<!-- AUTO-GENERATED:PART_API:SelectValue:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `placeholder` | `string` | — | No | Placeholder text shown when no option is selected. Displayed when the select value is empty or undefined. Once a value is selected, the placeholder is replaced by the selected option’s content. |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref forwarded to the root span element. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:SelectValue:end -->

- Supports placeholder content
- May render custom children for richer selected-value UI

## `SelectIcon`

Optional trigger affordance.

<!-- AUTO-GENERATED:PART_API:SelectIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:SelectIcon:end -->

- Usually rendered at the end of `SelectCombobox`
- Purely visual unless custom interaction is intentionally added

## `SelectListbox`

Container for registered options.

<!-- AUTO-GENERATED:PART_API:SelectListbox:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the listbox container element. Can be used for imperative access, for example measurements. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SelectListbox:end -->

- Expected children: `SelectOption`
- Common place for scroll limits, search fields, and custom list layout
- Renders in the top layer via `popover="manual"` and handles focus management itself

## `SelectOption`

Selectable list item.

<!-- AUTO-GENERATED:PART_API:SelectOption:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `V` | — | Yes | The value of this option, passed to the change callback when it is selected. |
| `label` | `string` | — | No | Plain text of this option for typeahead, used instead of the text of its content. |
| `children` | `ReactNode` | — | No | The content displayed for this option. Can include text, icons, or complex markup. |
| `size` | `OptionSize` | — | No | Size of the option for visual styling. |
| `disabled` | `boolean` | — | No | Disables the entire Option. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root div of the option. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SelectOption:end -->

- `value` must be `string` or `number`
- Registers itself into the root option model
- Can render richer child content, but selection value remains scalar

## `SelectHiddenSelect`

Hidden native select element.

<!-- AUTO-GENERATED:PART_API:SelectHiddenSelect:start -->
Also accepts all `<select>` attributes.
<!-- AUTO-GENERATED:PART_API:SelectHiddenSelect:end -->

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
| `SelectSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | Visual size token. |
| `SelectVariant` | `'inline' \| 'field' \| string` | Visual trigger variant. |

## State Model

- Selected value can be controlled with `value` or uncontrolled with `defaultValue`.
- Open state can be controlled with `open` or uncontrolled with `defaultOpen`.
- Keyboard navigation, the active option, and typeahead are managed by the root.
- `value={null}` clears a controlled value, while `undefined` makes the select uncontrolled.
- `typeahead={false}` is recommended when an actual text input is rendered inside the listbox.

## Integration Notes

- Use `SelectHiddenSelect` when the value should participate in native form submission.
- The listbox renders in the top layer, so `overflow`, transforms, and modal dialogs do not clip or cover it.
- Avoid object values. The public API is built for `string` and `number` values only.
