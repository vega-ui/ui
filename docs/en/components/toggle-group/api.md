# ToggleGroup API

## Root Props

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `multiple` | `Multiple` | — | No | Lets every button turn on and off by itself, and makes the value an array. |
| `value` | `Multiple extends true ? string[] : string \| null` | — | No | The value of the pressed button, or the values of the pressed buttons with `multiple`. Enables controlled mode when set. |
| `defaultValue` | `Multiple extends true ? string[] : string \| null` | — | No | The value of the pressed button, or the values of the pressed buttons with `multiple`, on mount. |
| `onChangeValue` | `(value: ToggleGroupValue<Multiple>) => void` | — | No | Called when a click, Enter or Space presses a button, or releases one with `multiple`. |
| `disabled` | `boolean` | `false` | No | Disables every button. |
| `size` | `ButtonSize` | `'md'` | No | Size of the buttons. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the group element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

- A `role="radiogroup"` `<div>`, or `role="group"` with `multiple`; name it with `aria-label` or `aria-labelledby`.
- Inside a [Toolbar](../toolbar/) it has no Tab stop and no arrow keys of its own: its items are items of the toolbar.

## Child Parts

- `ToggleGroupToggle`: an item of the group, with the look of a [Toggle](../toggle/).

### `ToggleGroupToggle`

<!-- AUTO-GENERATED:PART_API:ToggleGroupToggle:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | Yes | The value the toggle adds to the value of its ToggleGroup when pressed. |
| `asChild` | `boolean` | — | No | Renders the only child element as the toggle instead of a Button, like a link. |
| `disabled` | `boolean` | — | No | Disables the toggle, also the child element with `asChild`. The arrow keys of the ToggleGroup or a Toolbar skip it. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |
| `square` | `false` | — | No | Makes the button a square as wide as it is high, for a single icon. Name it with `aria-label` or `aria-labelledby`. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:ToggleGroupToggle:end -->

- Every item needs its own `value`, the key of the item.
- `size` on an item overrides the `size` of the group; `disabled` on an item disables only that item.
- Without `multiple` it is a `role="radio"` with `aria-checked`; with `multiple` a button with `aria-pressed`.

## Types

- `ToggleGroupProps<Multiple>`
- `ToggleGroupToggleProps`
- `ToggleGroupValue<Multiple>`: `string` without `multiple`, `string[]` with it, the type `onChangeValue` gets
- `ButtonSize`, the type of `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`

## State Model

- Uncontrolled: `defaultValue` sets the value on mount, and the group keeps it.
- Controlled: `value` sets the value, and `onChangeValue` reports the value a click, Enter or Space asks for. Without an update from the parent, the group stays as `value` says.
- Without `multiple`: the value is the `value` of the pressed item or `null`. A press on another item replaces it; a press on the pressed item changes nothing.
- With `multiple`: the value is an array of the values of the pressed items, in the order they were pressed. A press adds or removes the value of the item.
- An item is pressed when its `value` is in the value of the group; it has no pressed state of its own.
- Without `multiple`, an item is a `role="radio"` with `aria-checked` and `data-pressed`; with `multiple`, a button with `aria-pressed` and `data-pressed`.
- The group keeps which item had the focus, for the Tab stop; it goes back to the pressed item once the focus leaves the group.

## Integration Notes

- The items are buttons, not inputs, and the group renders no hidden inputs: a form does not submit its value. Keep it in state and send it yourself, or use [SegmentedControl](../segmented-control/) for a form value.
- With `asChild`, `ToggleGroupToggle` passes `type="button"` to the child, unless the child sets its own `type`.
- Inside a [Toolbar](../toolbar/), the items join the toolbar by themselves; a separate toggle next to the group goes inside `ToolbarItem` with `asChild`.
- `@vega-ui/widgets/toggle-group` exports `toggleGroupWidget`, the framework-free behavior of the group.
