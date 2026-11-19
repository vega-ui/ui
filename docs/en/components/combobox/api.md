# Combobox API

## Root API

`Combobox` is the root state container for the whole composition.

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | No | Whether the combobox is disabled. Disables the input and keeps the list closed. |
| `readOnly` | `boolean` | `false` | No | If true, the text cannot be changed and the list stays closed, but the input remains focusable. |
| `size` | `ComboboxSize` | `'md'` | No | Size of the options and of the list corners. |
| `autocomplete` | `ComboboxAutocomplete` | `'list'` | No | How the text and the list relate, as in `aria-autocomplete`, which the input gets: `list` when the app filters the options by the text, `none` when the options stay the same, `both` to also complete the text with the first matching option, its rest selected, and `inline` to only complete it, leaving the list closed while typing. |
| `value` | `Value \| null` | — | No | The value of the picked option (controlled). `null` clears it, while `undefined` makes the combobox uncontrolled. |
| `defaultValue` | `NoInfer<Value>` | — | No | The value of the option picked initially (uncontrolled). |
| `onChangeValue` | `(value: Value \| null) => void` | — | No | Called when an option is picked, and with `null` when the text is edited or cleared. |
| `open` | `boolean` | — | No | Whether the list is open (controlled). The list is shown only while it has options. |
| `defaultOpen` | `boolean` | — | No | Whether the list is open initially (uncontrolled). |
| `onChangeOpen` | `(open: boolean) => void` | — | No | Called when the list opens or closes by user interaction. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `ComboboxInput`

The text input with `role="combobox"`. Put it inside a `TextField`.

<!-- AUTO-GENERATED:PART_API:ComboboxInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:ComboboxInput:end -->

- The text is a plain input value: uncontrolled, or `value` with `onChange`
- Picking an option writes its label and fires `input`, so `onChange` receives it
- `name` submits the text with a form
- The root sets `role`, `aria-autocomplete` from the `autocomplete` prop, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `autoComplete="off"`, `disabled` and `readOnly`

## `ComboboxListbox`

The list with `role="listbox"`, a native `popover="manual"` element.

<!-- AUTO-GENERATED:PART_API:ComboboxListbox:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the list element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:ComboboxListbox:end -->

- Expected children: `ListboxOption`, `ListboxGroup`
- Shown while the combobox is open and has options, hidden otherwise
- The `id` comes from the root, so `aria-controls` on the input always points to it
- `onMouseDown` and `onToggle` are merged with the handlers of the part

## `ComboboxTrigger`

A button that opens and closes the list for pointer and touch users. Put it inside the `TextField`, after `ComboboxInput`.

<!-- AUTO-GENERATED:PART_API:ComboboxTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |
| `square` | `false` | — | No | Makes the button a square as wide as it is high, for a single icon. Name it with `aria-label` or `aria-labelledby`. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:ComboboxTrigger:end -->

- For an icon alone, put `ComboboxIcon` inside, add `square` and name the button with `aria-label`; a text button needs no `aria-label`
- Out of the tab order (`tabIndex={-1}`): keyboard users open the list from the input with `ArrowDown` or `Alt+ArrowDown`
- A press keeps the focus in the input and opens the list without an active option, or closes it
- The root sets `aria-controls`, `aria-expanded` and `disabled`; it is disabled while the combobox is `disabled` or `readOnly`
- Takes the size of the surrounding `TextField`

## `ComboboxIcon`

The icon of `ComboboxTrigger`. It draws no icon of its own: pass one as its children, such as a chevron from any icon set.

<!-- AUTO-GENERATED:PART_API:ComboboxIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | Yes | Icon content. Accepts: icons from `@vega-ui/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:ComboboxIcon:end -->

- Sized by the surrounding `TextField`: `xs` and `sm` fields get an `xs` icon, `md` gets `sm`, `lg` and `xl` get `md`
- Has `data-open='true'` while the list is shown and turns upside down

## `ListboxOption`

A suggestion. See [Listbox API](../listbox/api.md) for its props.

- `value` is passed to `onChangeValue` when the option is picked
- `label` is the text written into the input and the text completion matches; without it the text content of the option is used
- `disabled` keeps the option visible but skips it with the arrow keys and ignores clicks on it

## `ListboxGroup`

Groups options like a native `optgroup`. Name it with `aria-labelledby` pointing to your heading, or with `aria-label`.

## Hooks

## `useComboboxContext`

Advanced hook for custom wrappers around the shipped parts. Use it only when the exported parts are insufficient.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `ComboboxProps<V extends string \| number = string>` | Root prop type | Generic value type of the options. |
| `ComboboxInputProps` | `TextFieldInputProps` | Every `<input>` attribute. |
| `ComboboxListboxProps` | `<div>` attributes without `id` | The `id` belongs to the root. |
| `ComboboxTriggerProps` | `ButtonProps` | Props of a `Button`; with `square`, a required `aria-label` or `aria-labelledby`. |
| `ComboboxIconProps` | `IconProps` | Props of an `Icon`. |
| `ComboboxAutocomplete` | `'none' \| 'list' \| 'both' \| 'inline'` | How the text and the list relate, set as `aria-autocomplete` on the input. |
| `ComboboxSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | Size of the options and the list corners. |

## State Model

- The picked value is [controlled](../../glossary.md#controlled) with `value` or [uncontrolled](../../glossary.md#uncontrolled) with `defaultValue`. `null` clears a controlled value, while `undefined` makes it uncontrolled.
- Picking an option calls `onChangeValue` with its value. Editing or clearing the text calls `onChangeValue(null)`.
- The text belongs to the input and is never derived from `value`: a picked option writes its label once, and a `value` set by the parent leaves the text as it is.
- The open state is controlled with `open` or uncontrolled with `defaultOpen`; `onChangeOpen` reports opening and closing by the user. The list is shown only while it is open and has options, and `aria-expanded` follows what is shown.
- An open list with no options stays open but hidden, and it shows again as soon as options arrive while the input has the focus.
- The active option is reset when the list opens by typing, when a key goes back to the text, and when the input is pressed. Moving the caret by other means keeps it. When the active option is filtered out, the nearest remaining option becomes active.
- `aria-selected` follows the active option; while no option is active, the option of the picked value keeps it.
- On a closed list, `ArrowDown` and `ArrowUp` open it at the first or last option. `Alt+ArrowDown` and `ComboboxTrigger` open it without an active option and scroll the picked option into view.
- `autocomplete` sets how the text and the list relate: `list` (the default) when the app filters the options by the text, `none` when the options do not depend on the text, `both` to also complete the text, and `inline` to only complete it: typing does not open the list, while `ArrowDown`, `Alt+ArrowDown` and `ComboboxTrigger` still do.
- With `both` or `inline`, typing a character with the caret at the end writes the `label` of the first enabled option that starts with the text, ignoring case, so the text takes the casing of the label. The part after the typed text is selected and the option becomes active. Typing replaces the rest, `Backspace` and `Delete` remove it without completing again, `Enter` picks the completed option, `Escape` puts back exactly what was typed, and leaving the input picks the completed option. With `inline` and the list closed, `Enter` and `Escape` act on the completion the same way. When the options change after `onChange`, completion runs once more with the new options.
- With `both` or `inline`, `ArrowDown` and `ArrowUp`, also when they open a closed list, write the label of the option they reach into the input when it starts with the typed text, ignoring case, and select the part after the typed text. Otherwise the text stays as it is. With an empty text every label matches. `Escape` puts back the typed text, and leaving the input picks the reached option. With `list` and `none` the arrows never change the text.
- In `both` and `inline`, filter by the typed part, the text before a selection that runs to the end, so the list stays the same while the completion changes:

```tsx
import type { ChangeEvent } from 'react';

const onChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { value, selectionStart, selectionEnd } = event.target;

  setText(value);
  setQuery(selectionEnd === value.length ? value.slice(0, selectionStart ?? undefined) : value);
};
```

- `ComboboxTrigger` opens the list without an active option, scrolled to the picked option, or closes it, and keeps the focus in the input.
- A `disabled` or `readOnly` combobox never shows its list.
- A form reset restores an uncontrolled value to `defaultValue`, and the browser resets an uncontrolled text to the `defaultValue` of the input.

## Integration Notes

- Put `Label`, `HelperText` and status messages next to `Combobox`, not inside it.
- Values are `string` or `number`. Keep objects in your own map and look them up by value.
- The list renders in the top layer, so `overflow`, transforms and modal dialogs do not clip or cover it.
- Inside a `Dialog`, `Escape` first closes the list, then clears the text, and only then reaches the dialog.
