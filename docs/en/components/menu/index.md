# Menu

## Doc Profile

`advanced interactive`

## Summary

`Menu` is a [compound component](../../glossary.md#compound-component) for a list of actions or options that a button shows. `MenuTrigger` is the menu button, `MenuContent` is the `role="menu"` popover in the top layer, and `MenuItem`, `MenuCheckboxItem` and `MenuRadioItem` are its items. It follows the WAI-ARIA menu button and menu patterns: opening moves the focus to an item, the arrow keys and typeahead move it between the items, and running an item closes the menu with the focus back on the trigger.

## Imports

```tsx
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuItemIndicator,
  type MenuProps,
  type MenuTriggerProps,
  type MenuContentProps,
  type MenuItemProps,
  type MenuCheckboxItemProps,
  type MenuRadioGroupProps,
  type MenuRadioItemProps,
  type MenuGroupProps,
  type MenuItemIndicatorProps,
} from '@vega-ui/react';
```

## Exported Types

- `MenuProps`
- `MenuTriggerProps`
- `MenuContentProps`
- `MenuItemProps`
- `MenuCheckboxItemProps`
- `MenuRadioGroupProps`
- `MenuRadioItemProps`
- `MenuGroupProps`
- `MenuItemIndicatorProps`
- `MenuSize`

## Minimal Composition

<!-- example: menu/minimal-composition.tsx -->
```tsx
import { Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Edit</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Undo</MenuItem>
        <MenuItem disabled>Redo</MenuItem>
        <Separator />
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->

## Required Parts

- `Menu`: root that owns the open state, the placement and the size; it renders no element
- `MenuTrigger`: the `<button aria-haspopup="menu">` that opens the menu
- `MenuContent`: the `role="menu"` popover that holds the items
- `MenuItem`: a `<button role="menuitem">` that runs an action, or a link with `asChild`

## Optional Parts

- `MenuCheckboxItem`: an item that is checked or unchecked (`menuitemcheckbox`)
- `MenuRadioGroup` and `MenuRadioItem`: a group of items where one is checked (`menuitemradio`)
- `MenuGroup`: a `role="group"` around related items
- `MenuItemIndicator`: the check mark of a checkbox or radio item
- [Separator](../separator/): a line between groups of items

## Composition Order

1. `Menu`
2. `MenuTrigger`
3. `MenuContent`
4. `MenuItem`, `MenuCheckboxItem`, `MenuRadioGroup` with `MenuRadioItem`, `MenuGroup` and `Separator`, in the order they are shown
5. `MenuItemIndicator` inside a checkbox or radio item

## Variants

- Uncontrolled through `defaultOpen` versus [controlled](../../glossary.md#controlled) through `open` and `onChangeOpen`
- Placement through `placement`: a side (`top`, `right`, `bottom`, `left`) with an optional `-start` or `-end`; `bottom-start` by default
- Size variants through `size`: `xs`, `sm`, `md`, `lg`, `xl`
- Plain items that run an action, checkbox items, radio groups and link items with `asChild`
- Submenus through `MenuSubmenu` and `MenuSubmenuTrigger`, nested to any depth

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- A disabled item gets `aria-disabled="true"`, not native `disabled`: the arrow keys and typeahead still reach it, but its `onClick` is not called and the menu stays open.
- `preventDefault()` in the `onClick` of an item keeps the menu open. Your `onClick` runs before the menu reacts.
- A click, Enter or Space on a checkbox or radio item changes it and keeps the menu open, for view options a user toggles one after another; `keepOpen={false}` makes a click and Enter close the menu as on a plain item.
- `MenuContent` and its items stay rendered while the menu is closed, so state inside them is kept and the trigger can open the menu on its last item.
- An item of a submenu that runs closes every menu and gives the focus back to the menu button. Escape and the arrow out of a submenu close only that submenu.
- While the pointer moves from a submenu item toward its open submenu, the items it crosses on the way do not take the focus, so the submenu stays open.
- A menu opened by a right click or a long touch is [ContextMenu](../context-menu/), built from the same parts. A menubar is not part of this version.

## Common Mistakes

- An icon-only trigger without `aria-label`: the trigger names the menu, so both stay unnamed. The components never set a label themselves.
- Using `Menu` to pick a value that is submitted with a form; use [Select](../select/) for that. Radio items in a menu are view options, like a sort order, that apply at once.
- Putting fields, sliders or other controls inside `MenuContent`: a menu holds only items. Use [Popover](../popover/) for interactive content.
- Expecting native `disabled` on an item: menu items stay focusable when disabled, so style `[aria-disabled="true"]`, not `:disabled`.
- Leaving a `MenuGroup` or `MenuRadioGroup` without a name when it has a visible heading; point `aria-labelledby` at the heading.
