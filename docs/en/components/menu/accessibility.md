# Menu Accessibility

## Labeling

- The menu is named by its trigger through `aria-labelledby`, so the trigger text should say what the menu holds. Pass `aria-label` or `aria-labelledby` to `MenuContent` when the trigger text changes with the state, like "Zoom 125%", or does not describe the menu.
- An icon-only trigger, such as a "⋯" `IconButton`, needs an `aria-label` that names the object, like "Actions for Q3 report.pdf". The components never set a label themselves.
- Name every `MenuRadioGroup`, and every `MenuGroup` that has a heading, with `aria-labelledby` pointing at the heading or with `aria-label`.
- Decorative content inside an item, such as an avatar or a badge with a code, should be `aria-hidden`, so the item name stays short. Text that explains why an item is disabled should stay in the name.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger: opens the menu and moves the focus to its first item. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | On the trigger: opens the menu with the focus on the first item (Down) or on the last item (Up). |
| <kbd>↓</kbd> / <kbd>↑</kbd> | In the menu: moves the focus to the next or previous item. From the last item it moves to the first, and from the first to the last. Disabled items take the focus too. |
| <kbd>Home</kbd> / <kbd>End</kbd> | In the menu: moves the focus to the first or last item. |
| <kbd>c</kbd> | Typeahead: a printable character moves the focus to the next item whose label starts with the typed text; characters typed quickly add up, and the same character typed again moves on to the next item that starts with it. Disabled items are included. The label is the text of the item, or its `label` prop. |
| <kbd>Enter</kbd> | In the menu: runs the focused item, closes the menu and returns the focus to the trigger. A checkbox item is checked or unchecked, and a radio item is checked, before the menu closes. A disabled item does nothing, and a `preventDefault()` in the `onClick` of an item keeps the menu open. |
| <kbd>Space</kbd> | In the menu: runs a plain item like Enter. A checkbox or radio item is checked or unchecked, and the menu stays open. |
| <kbd>Escape</kbd> | Closes the menu without running an item and returns the focus to the trigger. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | In the menu: Tab closes the menu and moves the focus on to the next element after it; Shift+Tab closes the menu and returns the focus to the trigger. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- Opening the menu moves the focus to its first item, or to the last one with the Up arrow on the trigger. A controlled parent that sets `open` gets the same focus on the first item.
- The items have `tabIndex={-1}`: the menu is not a Tab stop, and the focus moves only with the arrow keys, Home, End, typeahead and the pointer. The menu itself has `tabIndex={-1}` too, so a click between the items keeps the focus inside and the menu open.
- The pointer moves the focus to the item under it, so the keyboard continues from where the pointer was. Moving over a disabled item does not take the focus.
- Running an item, Escape and Shift+Tab return the focus to the trigger. Tab and a click outside close the menu and leave the focus where the browser puts it.
- A mouse press on the padding or a separator of the menu does not take the focus away from the current item.
- Safari does not put buttons in the Tab order unless "Press Tab to highlight each item on a webpage" is turned on in its settings, so Tab from an item may skip the next buttons on the page there. This is a platform setting.

## Screen Reader Semantics

- `MenuTrigger` is a button with `aria-haspopup="menu"`, `aria-expanded` and `aria-controls`, so it is announced as a menu button with its expanded state.
- `MenuContent` is a `menu`; `MenuItem` is a `menuitem`, `MenuCheckboxItem` a `menuitemcheckbox` and `MenuRadioItem` a `menuitemradio`, both with `aria-checked`. A link item with `asChild` is announced as a menu item too.
- `MenuGroup` and `MenuRadioGroup` are `group`s, and `Separator` is a `separator`.
- Disabled items have `aria-disabled="true"`: they are announced as unavailable but stay focusable, as the WAI-ARIA menu pattern asks, so users can still find them. This differs from [Tabs](../tabs/), where a disabled tab is a native disabled button that the arrow keys skip.
- `MenuItemIndicator` is `aria-hidden`; the checked state comes from `aria-checked`.

## Accessibility Risks

- An icon-only trigger without `aria-label`: neither the button nor the menu has a name.
- A trigger whose text changes while the menu is open: the menu name changes with it unless `MenuContent` has its own label.
- Controls or long text inside the menu: screen readers in a menu expect only items, and the arrow keys never reach the rest.
- Item labels that start with the same words: typeahead jumps between them, and the menu is slower to scan. Put the word that differs first.
- A disabled item that does not say why: users reach it and cannot tell what to change.
