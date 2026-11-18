# ContextMenu Anatomy

## Overview

`ContextMenu` is split into a root, an area and the menu with its items. The root owns the state and renders only the hidden point the menu opens at, `ContextMenuTrigger` is the area that opens the menu, and the menu is the `MenuContent` of [Menu](../menu/) with the same items. The items register in the order they are rendered, and that order is the order of the arrow keys and typeahead.

## Required Parts

### `ContextMenu`

Owns whether the menu is shown, reported through `onChangeOpen`, and the `size` of its items. It renders only a hidden, empty point in the top layer that the menu is anchored to, and has no `placement`: the menu opens at the point.

### `ContextMenuTrigger`

Renders a `<div>`, or with `asChild` your own element, like a list row, a card or the wrapper of a canvas. It takes all HTML attributes and a `ref`. A right click, a long touch, or the context menu key or Shift+F10 with the focus inside it opens the menu. It gets no role, no `aria-haspopup` and no `aria-expanded`, since the area is not a menu button, and it has `data-open` while the menu is shown. It sets `-webkit-touch-callout: none`, so iOS shows no callout on a long press.

### `MenuContent`

Renders `<div popover="auto" role="menu" tabindex="-1">` in the top layer, and before it an empty `<span aria-hidden>` that marks the point the menu opens at. In a `ContextMenu` it has no `aria-labelledby`, as there is no button to name it: pass `aria-label` or `aria-labelledby` yourself. It stays rendered while closed.

### `MenuItem`

Renders `<button type="button" role="menuitem" tabindex="-1">`, as in `Menu`. `disabled` sets `aria-disabled="true"` and keeps the item focusable.

## Optional Parts

### `MenuCheckboxItem`, `MenuRadioGroup` and `MenuRadioItem`

Items that are checked or unchecked, and a group where one item is checked, as in [Menu](../menu/anatomy.md#menucheckboxitem).

### `MenuGroup` and `MenuItemIndicator`

A named `role="group"` around related items, and the check mark of a checkbox or radio item, as in `Menu`.

### `MenuSubmenu` and `MenuSubmenuTrigger`

A submenu inside the menu: `MenuSubmenuTrigger` is its item, and the `MenuContent` that follows it inside the same `MenuSubmenu` opens beside that item, as in `Menu`.

### `Separator`

The [Separator](../separator/) component, a `role="separator"` line between groups of items.

## Composition Order

1. `ContextMenu`
2. `ContextMenuTrigger`, with the content of the area inside it
3. `MenuContent`, after the area
4. Items, groups, separators and `MenuSubmenu` in the order they are shown

## Valid Composition Patterns

Each row of a list is its own `ContextMenu`, and a `<div>` inside the `<li>` is the area, since `MenuContent` renders where you put it and a `<ul>` holds only `<li>`. The same actions sit in a `Menu` behind a "⋯" button in the row, so users who never right click find them too.

<!-- example: context-menu/file-list.tsx -->
```tsx
import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  Icon,
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';
import {
  ChevronRightIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  LinkIcon,
  MailIcon,
  PencilIcon,
  PresentationIcon,
  Share2Icon,
  Trash2Icon,
} from '@vega-ui/icons';

const files = [
  { id: 'report', name: 'Q3 report.pdf', meta: 'Edited 2 hours ago', icon: <FileTextIcon /> },
  { id: 'budget', name: 'Budget 2027.xlsx', meta: 'Edited yesterday', icon: <FileSpreadsheetIcon /> },
  { id: 'deck', name: 'Kickoff deck.key', meta: 'Edited 12 Nov', icon: <PresentationIcon /> },
];

const muted: CSSProperties = { color: 'var(--label-secondary)' };

function Lead({ children }: { children: ReactNode }) {
  return <Icon size='sm' style={muted}>{children}</Icon>;
}

function FileActions({ onAction }: { onAction: (status: string) => void }) {
  return (
    <>
      <MenuItem onClick={() => onAction('Opened in a new tab')}><Lead><ExternalLinkIcon /></Lead>Open</MenuItem>
      <MenuItem onClick={() => onAction('Renamed just now')}><Lead><PencilIcon /></Lead>Rename</MenuItem>
      <MenuItem onClick={() => onAction('Copy saved')}><Lead><CopyIcon /></Lead>Duplicate</MenuItem>
      <MenuSubmenu>
        <MenuSubmenuTrigger>
          <Lead><Share2Icon /></Lead>
          Share
          <Icon size='xs' style={{ ...muted, marginInlineStart: 'auto' }}><ChevronRightIcon /></Icon>
        </MenuSubmenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => onAction('Link copied')}><Lead><LinkIcon /></Lead>Copy link</MenuItem>
          <MenuItem onClick={() => onAction('Sent by email')}><Lead><MailIcon /></Lead>Email</MenuItem>
        </MenuContent>
      </MenuSubmenu>
      <Separator />
      <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => onAction('Moved to trash')}>
        <Icon size='sm'><Trash2Icon /></Icon>Delete
      </MenuItem>
    </>
  );
}

export default function FileList() {
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-1)', boxSizing: 'border-box', width: '100%', maxWidth: 440, margin: 0, padding: 0, listStyle: 'none' }}>
      {files.map((file) => {
        const report = (status: string) => setStatuses((current) => ({ ...current, [file.id]: status }));

        return (
          <li key={file.id}>
            <ContextMenu size='sm'>
              <ContextMenuTrigger
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-6)',
                  padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
                  borderRadius: 'var(--radius-4)',
                  background: 'var(--surface-primary)',
                  border: '1px solid var(--separator-opaque)',
                }}
              >
                <Icon size='lg' style={muted}>{file.icon}</Icon>
                <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                  <Text size={3} fontWeight={500}>{file.name}</Text>
                  <Text size={2} role='status' style={{ ...muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {statuses[file.id] ?? file.meta}
                  </Text>
                </div>
                <Menu placement='bottom-end' size='sm'>
                  <MenuTrigger asChild>
                    <IconButton size='sm' aria-label={`Actions for ${file.name}`} variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
                      <Icon><EllipsisIcon /></Icon>
                    </IconButton>
                  </MenuTrigger>
                  <MenuContent>
                    <FileActions onAction={report} />
                  </MenuContent>
                </Menu>
              </ContextMenuTrigger>
              <MenuContent aria-label={file.name}>
                <FileActions onAction={report} />
              </MenuContent>
            </ContextMenu>
          </li>
        );
      })}
    </ul>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Items outside `MenuContent`

An item outside the menu is not part of the `role="menu"`, and the menu does not handle its clicks and keys. Keep every item inside `MenuContent`.

### `MenuTrigger` inside `ContextMenu`

`MenuTrigger` is the button of a `Menu`. A `ContextMenu` opens from its area: use `ContextMenuTrigger`, and keep a `Menu` with its own `MenuTrigger` for the visible way to the same actions.

### `MenuContent` without a name

Without `aria-label` or `aria-labelledby` the menu has no name: a screen reader announces only "menu". Name it after the object it acts on, like the file name.

### Controls as children of the menu

A `role="menu"` holds items, groups and separators. A text field or a button that is not an item cannot be reached with the arrow keys; put interactive content in a [Popover](../popover/).
