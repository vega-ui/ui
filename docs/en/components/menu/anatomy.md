# Menu Anatomy

## Overview

`Menu` is split into a root, a trigger, the menu itself and its items. The root owns the state and renders nothing, `MenuTrigger` opens the menu, and `MenuContent` moves the focus between the items. The items register in the order they are rendered, and that order is the order of the arrow keys and typeahead; groups and separators do not change it.

## Required Parts

### `Menu`

Owns whether the menu is shown (`open`, `defaultOpen`, `onChangeOpen`), the `placement` and the `size`. It renders no element of its own.

### `MenuTrigger`

Renders `<button type="button">` with `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` and `popovertarget` pointing at the menu. With `asChild` it renders your own button, such as a `Button`, with text or `square`. It is the CSS anchor the menu is positioned against, and it names the menu.

### `MenuContent`

Renders `<div popover="auto" role="menu" tabindex="-1">` labelled by the trigger through `aria-labelledby`, unless you pass `aria-label` or `aria-labelledby` yourself. The browser shows it in the top layer, so `overflow` and stacking contexts never clip it. It stays rendered while closed.

### `MenuItem`

Renders `<button type="button" role="menuitem" tabindex="-1">`. With `asChild` it renders your own element instead, such as an `<a href>` that navigates. `disabled` sets `aria-disabled="true"` and keeps the item focusable.

## Optional Parts

### `MenuCheckboxItem`

Renders `<button role="menuitemcheckbox">` with `aria-checked`. It holds its own `checked`, `defaultChecked` and `onChangeChecked`.

### `MenuRadioGroup` and `MenuRadioItem`

`MenuRadioGroup` renders `<div role="group">` and holds the `value`, `defaultValue` and `onChangeValue` of its items. Each `MenuRadioItem` renders `<button role="menuitemradio">` with `aria-checked` and a `value`. Name the group with `aria-label` or `aria-labelledby`.

### `MenuGroup`

Renders `<div role="group">` around related items. Name it with `aria-labelledby` pointing at a visible heading inside it, or with `aria-label`.

### `MenuItemIndicator`

Renders the icon passed as its children, such as a check mark, with `aria-hidden`; it draws none of its own. Inside a checkbox or radio item it keeps its space in every item and is visible only in a checked one, so the labels of checked and unchecked items line up.

### `MenuSubmenu` and `MenuSubmenuTrigger`

`MenuSubmenu` holds a submenu inside a `MenuContent`: whether it is shown (`open`, `defaultOpen`, `onChangeOpen`), with no element of its own. `MenuSubmenuTrigger` renders `<button role="menuitem" aria-haspopup="menu">` with `aria-expanded` and `aria-controls`: it is an item of the menu around it and names the submenu. The submenu is the `MenuContent` that follows it inside the same `MenuSubmenu`; it opens beside the item, at the end of the line in the writing direction, and takes the size of the menu around it. A submenu can hold another `MenuSubmenu`.

### `Separator`

The [Separator](../separator/) component, a `role="separator"` line between groups of items. The menu adds space around it.

## Composition Order

1. `Menu`
2. `MenuTrigger`
3. `MenuContent`
4. Items, groups, separators and `MenuSubmenu` in the order they are shown
5. Inside `MenuSubmenu`: `MenuSubmenuTrigger`, then the `MenuContent` of the submenu
6. `MenuItemIndicator` and the label inside a checkbox or radio item

## Valid Composition Patterns

A menu can mix plain items, a named group of checkbox items and a radio group, divided by separators. Here the indicators sit at the end of their items, so every label starts at the same place as the plain items above.

<!-- example: menu/valid-composition-patterns.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

const indicatorEnd: CSSProperties = { marginInlineStart: 'auto' };

export default function ValidCompositionPatterns() {
  const panelsId = useId();
  const widthId = useId();

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Editor</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Focus mode</MenuItem>
        <MenuItem>Full screen</MenuItem>
        <Separator />
        <MenuGroup aria-labelledby={panelsId}>
          <Text id={panelsId} size={2} fontWeight={500} style={groupHeading}>Panels</Text>
          <MenuCheckboxItem defaultChecked>Outline<MenuItemIndicator style={indicatorEnd}><CheckIcon /></MenuItemIndicator></MenuCheckboxItem>
          <MenuCheckboxItem>Comments<MenuItemIndicator style={indicatorEnd}><CheckIcon /></MenuItemIndicator></MenuCheckboxItem>
        </MenuGroup>
        <Separator />
        <MenuRadioGroup aria-labelledby={widthId} defaultValue='standard'>
          <Text id={widthId} size={2} fontWeight={500} style={groupHeading}>Page width</Text>
          <MenuRadioItem value='standard'>Standard<MenuItemIndicator style={indicatorEnd}><CheckIcon /></MenuItemIndicator></MenuRadioItem>
          <MenuRadioItem value='wide'>Wide<MenuItemIndicator style={indicatorEnd}><CheckIcon /></MenuItemIndicator></MenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Items outside `MenuContent`

An item outside the menu is not part of the `role="menu"`, and the menu does not handle its clicks and keys. Keep every item inside `MenuContent`.

### `MenuRadioItem` outside `MenuRadioGroup`

A radio item needs its group to hold the value; outside a group it is never checked.

### `MenuSubmenuTrigger` outside `MenuSubmenu`

The item that opens a submenu belongs to its `MenuSubmenu`; outside one it takes the place of the menu button of the menu around it. Put it and the `MenuContent` of the submenu inside the same `MenuSubmenu`.

### Headings and controls as children of the menu

A `role="menu"` holds items, groups and separators. A heading element directly in the menu, a text field or a button that is not an item is not a menu item to a screen reader and cannot be reached with the arrow keys. Put a group heading as plain text inside a `MenuGroup` and point its `aria-labelledby` at it; put interactive content in a [Popover](../popover/).
