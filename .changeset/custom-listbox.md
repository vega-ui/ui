---
"@vega-ui/react": major
"@vega-ui/utils": minor
---

BREAKING: new `Listbox`, and `Select` is built on it instead of the floating-ui interaction hooks. Positioning stays on floating-ui.

- New `Listbox`, `ListboxOption`, and `ListboxGroup`: an always visible list like a native `select` with `size`. Name it with `aria-labelledby` or `aria-label`. `label` on an option sets its text for typeahead and does not change what `SelectValue` shows. With `multiple`, `value`, `defaultValue`, and `onChangeValue` use arrays, `Space` and `Enter` toggle the active option, and adjacent selected options merge into one shape. `Enter` and `Space` select the active option without calling its `onClick`, and only the options whose active state changes re-render on arrows.
- `Option` is a `div` instead of a `button`: its `ref` points to an `HTMLDivElement`, it no longer takes `value` and is not generic, `focusable` is replaced by `active`, and `disabled` sets `aria-disabled` and uses the `--disable-label-text-color` and `--disable-background-color` tokens like `DataGridPicker` items.
- `SelectListbox` has no `data-status`, style it with `:popover-open`, and `useSelectContext` no longer returns `status`.
- `SelectHiddenSelect` renders only the selected `option`: it submits the value and no longer lists all options.
- `SelectListbox` is hidden with `visibility` instead of the `inert` and `hidden` attributes, and its options no longer shrink to fit `max-height`, so a long list scrolls at the full option height.
- `value={null}` clears a controlled `Select` or single `Listbox`, `undefined` still makes it uncontrolled. `Select` stays closed while `disabled` or `readOnly`, even with `open` or `defaultOpen`, ignores arrows with `Meta` or `Ctrl`, and typing that matches nothing no longer opens it. A disabled `Option` does not call `onClick`.
- `SelectListbox` is a native `popover="auto"` element: the browser closes it on `Escape` and an outside click. In a `Dialog`, `Escape` closes only the list.
- The focus stays on the `SelectCombobox`, which points to the active option with `aria-activedescendant` and sets `aria-haspopup`, `aria-expanded`, and `aria-controls`. A form field inside `SelectListbox`, such as a search input, can take the focus, and the list closes when the focus leaves it.
- `Select` keyboard follows the WAI-ARIA select-only combobox: arrows stop at the ends of the list, typing while closed opens the list and moves to the match instead of selecting it, typeahead matches from the start of the label instead of anywhere in it, `typeMatchEnabled` is renamed to `typeahead`, `Tab` selects the option moved to with the keyboard and moves on, and without such a move keeps the value, `Alt+ArrowUp` closes the list, and `PageUp` and `PageDown` jump by ten options.
- `useSelectContext` no longer returns the floating-ui `context`, `itemProps`, `listboxProps`, `elementsRef`, `labelsRef`, `activeIndex`, `selectedIndex`, `selectRef`, `update`, and `onSelect`, and `valueRef` is replaced by `valueElement` and `setValueElement`. `SelectComboboxProps` no longer has `readOnly` and `variant`, set them on `Select`. `SelectValueProps` extends the attributes of a `span` instead of `TextProps`. `SelectListbox` ignores `id`, and `ListboxOption` and `SelectOption` do not take `id`, `selected`, or `active`.

`@vega-ui/utils` adds `isActivationKey`, `matchTypeahead`, and `scrollIntoContainer`.
