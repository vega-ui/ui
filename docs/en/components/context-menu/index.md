# ContextMenu

## Doc Profile

`advanced interactive`

## Summary

`ContextMenu` is a [compound component](../../glossary.md#compound-component) for a menu that opens where the user asks for it: a right click, a long touch or the context menu key on an area. `ContextMenuTrigger` is the area, and the menu itself is built from the parts of [Menu](../menu/): `MenuContent` and its items. It opens at the point instead of the menu of the browser, moves the focus to its first item, and gives the arrow keys, typeahead and submenus the behavior of `Menu`.

## Imports

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuItemIndicator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  type ContextMenuProps,
  type ContextMenuTriggerProps,
} from '@vega-ui/react';
```

## Exported Types

- `ContextMenuProps`
- `ContextMenuTriggerProps`

## Minimal Composition

<!-- example: context-menu/minimal-composition.tsx -->
```tsx
import { ContextMenu, ContextMenuTrigger, MenuContent, MenuItem, Separator, Text } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={{
          display: 'grid',
          placeItems: 'center',
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: 360,
          height: 160,
          padding: 'var(--spacing-8)',
          border: '1px dashed var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Right click or long press here</Text>
      </ContextMenuTrigger>
      <MenuContent aria-label='Edit'>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem disabled>Paste</MenuItem>
        <Separator />
        <MenuItem>Select all</MenuItem>
      </MenuContent>
    </ContextMenu>
  );
}
```
<!-- /example -->

## Required Parts

- `ContextMenu`: root that owns the open state and the size; it renders only a hidden point for the menu to open at
- `ContextMenuTrigger`: the area that opens the menu, a `<div>` or your own element with `asChild`
- `MenuContent`: the `role="menu"` popover that holds the items, named by your `aria-label`
- `MenuItem`: a `<button role="menuitem">` that runs an action

## Optional Parts

- `MenuCheckboxItem`, `MenuRadioGroup` with `MenuRadioItem`, `MenuGroup` and `MenuItemIndicator`, as in [Menu](../menu/anatomy.md)
- `MenuSubmenu` and `MenuSubmenuTrigger`: a submenu inside the menu
- [Separator](../separator/): a line between groups of items

## Composition Order

1. `ContextMenu`
2. `ContextMenuTrigger`
3. `MenuContent`
4. Items, groups, separators and `MenuSubmenu` in the order they are shown

## Variants

- Followed through `onChangeOpen`; there is no `open` or `defaultOpen`, as the menu opens only at a point the user gives
- Size variants through `size`: `xs`, `sm`, `md`, `lg`, `xl`
- The area as a `<div>` or, with `asChild`, your own element, like a list row, a card or the wrapper of a canvas
- Plain items, checkbox items, radio groups and submenus, as in `Menu`

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

- A long touch opens the menu after 700 ms when the finger stays in place, moving less than 10 px. It works on iOS too, which fires no `contextmenu` event. The long touch takes the touch from the page, so the page does not scroll, and swallows the click that ends it.
- The context menu key and Shift+F10 open the menu while the focus is inside the area, where the browser fires `contextmenu` for them; macOS has no context menu key. A menu opened from the keyboard appears at the focused element.
- The menu of the browser is not shown, neither inside the area nor inside the open menu. A text field, a select or an editable element inside the area keeps it, with paste and spelling, and a long touch on one selects its text as usual.
- A right click elsewhere in the area while the menu is open moves the menu to the new point.
- Near the edges of the viewport the menu flips up or toward the start of the line, or both, to stay visible.
- The library does not move the focus when the menu closes: the browser gives it back to the element that had it when the menu opened. After a right click on an area with nothing focused, the focus goes to the page.
- A context menu opened from an area nested inside the area of another context menu, and a menubar, are not part of this version.

## Common Mistakes

- Putting the only way to do something in a context menu. A context menu is not discoverable, and many users never right click: every action in it must also be reachable another way, like a visible button or a [Menu](../menu/) on a "More" button.
- Leaving `MenuContent` without `aria-label` or `aria-labelledby`: there is no button to name the menu, and the components never set a label themselves.
- Expecting menu button semantics on the area: `ContextMenuTrigger` gets no role, no `aria-haspopup` and no `aria-expanded`.
- Expecting a `placement` prop: the menu opens at the point.
- Putting fields, sliders or other controls inside `MenuContent`: a menu holds only items. Use [Popover](../popover/) for interactive content.
