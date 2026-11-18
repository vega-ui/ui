---
'@vega-ui/react': minor
'@vega-ui/widgets': minor
---

New `Menu`: a list of actions or options that a menu button shows, following the WAI-ARIA menu button and menu patterns.

- `Menu` holds whether the menu is shown in `open`, `defaultOpen` and `onChangeOpen`, and takes a `placement` and a `size` (`xs`, `sm`, `md`, `lg` or `xl`, as in Select and Listbox). It renders no element of its own.
- `MenuTrigger` is the `<button aria-haspopup="menu">` with `aria-expanded` and `aria-controls`, or your own element with `asChild`. A click, Enter or Space shows the menu with the focus on its first item; the Down arrow shows it on the first item and the Up arrow on the last one.
- `MenuContent` is the `role="menu"` popover in the top layer, anchored to the trigger with CSS anchor positioning and named by the trigger unless you pass `aria-label` or `aria-labelledby`. The focus moves on the items themselves: the Up and Down arrows wrap around the ends, Home and End jump to the first and last item, typing moves to the next item whose label starts with the typed text, and the item under the pointer takes the focus. Escape and Shift+Tab close the menu with the focus back on the trigger, Tab closes it and moves on, and a click outside closes it.
- `MenuItem` is a `<button role="menuitem">`, or an `<a>` that navigates with `asChild`. A click, Enter or Space runs its `onClick`, closes the menu and gives the focus back to the trigger; `preventDefault` in `onClick` keeps the menu open. `disabled` sets `aria-disabled`, so the item stays focusable as the pattern asks but never runs.
- `MenuCheckboxItem` (`menuitemcheckbox`) holds `checked`, `defaultChecked` and `onChangeChecked`; `MenuRadioGroup` holds the `value`, `defaultValue` and `onChangeValue` of its `MenuRadioItem` (`menuitemradio`). A click or Enter checks the item and closes the menu, Space checks it and keeps the menu open. `MenuItemIndicator` is a check mark that keeps its place in every item and shows only in a checked one.
- `MenuGroup` is a `role="group"` for related items; `Separator` divides the groups.
- `@vega-ui/widgets/menu` is the framework-free widget behind it, with `menuCheckboxWidget` and `menuRadioGroupWidget` for the checked state.
