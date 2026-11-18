# Menu Patterns

## Actions Of A Row Or Card

When to use:

- A list row, a card or a table row has more actions than fit next to it, such as rename, duplicate and delete.

Composition notes:

- Use an `IconButton` with a "⋯" icon as the trigger and give it an `aria-label` that names the object, like "Actions for Q3 report.pdf"; the label also names the menu.
- Use `placement='bottom-end'` so the menu lines up with the end of the row.
- Put a destructive action last, after a `Separator`.

Trade-offs:

- Keeps rows calm, but hides the actions: keep the most frequent one as a visible button next to the trigger.

<!-- example: menu/row-actions.tsx -->
```tsx
import { useState } from 'react';
import { Icon, IconButton, Menu, MenuContent, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';
import { EllipsisIcon } from '@vega-ui/icons';

export default function RowActions() {
  const [status, setStatus] = useState('Edited 2 hours ago');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 420,
        padding: 'var(--spacing-6) var(--spacing-6) var(--spacing-6) var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={3} fontWeight={500}>Q3 report.pdf</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{status}</Text>
      </div>
      <Menu placement='bottom-end' size='sm'>
        <MenuTrigger asChild>
          <IconButton size='sm' aria-label='Actions for Q3 report.pdf' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
            <Icon><EllipsisIcon /></Icon>
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => setStatus('Renamed just now')}>Rename</MenuItem>
          <MenuItem onClick={() => setStatus('Copy saved as Q3 report (1).pdf')}>Duplicate</MenuItem>
          <MenuItem onClick={() => setStatus('Download started')}>Download</MenuItem>
          <Separator />
          <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => setStatus('Moved to trash')}>Move to trash</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
```
<!-- /example -->

## View Options

When to use:

- A toolbar offers settings of the current view, such as which items to show and how to sort them, that apply at once.

Composition notes:

- Use `MenuCheckboxItem` for independent switches and a `MenuRadioGroup` for one choice out of several, each with a `MenuItemIndicator`.
- Name the radio group by a heading inside it through `aria-labelledby`.
- Show the current settings outside the menu, so users see them without opening it.

Trade-offs:

- Compact and quick to change one setting; for many settings that depend on each other, a [Popover](../popover/) with a form is clearer.

<!-- example: menu/view-options.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

const sorts = [
  { value: 'due', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
];

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

export default function ViewOptions() {
  const sortHeadingId = useId();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [sort, setSort] = useState('due');
  const sortLabel = sorts.find((item) => item.value === sort)?.label ?? '';

  const hidden: string[] = [];
  if (!showCompleted) hidden.push('completed');
  if (!showSubtasks) hidden.push('subtasks');

  const sorted = `Sorted by ${sortLabel.toLowerCase()}`;
  const summary = hidden.length === 0 ? sorted : `${sorted} · ${hidden.join(' and ')} hidden`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{summary}</Text>
      <Menu placement='bottom-end'>
        <MenuTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>View</Button>
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem checked={showCompleted} onChangeChecked={setShowCompleted}>
            <MenuItemIndicator />
            Show completed
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showSubtasks} onChangeChecked={setShowSubtasks}>
            <MenuItemIndicator />
            Show subtasks
          </MenuCheckboxItem>
          <Separator />
          <MenuRadioGroup aria-labelledby={sortHeadingId} value={sort} onChangeValue={setSort}>
            <Text id={sortHeadingId} size={2} fontWeight={500} style={groupHeading}>Sort by</Text>
            {sorts.map((item) => (
              <MenuRadioItem key={item.value} value={item.value}>
                <MenuItemIndicator />
                {item.label}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    </div>
  );
}
```
<!-- /example -->

## Account Menu

When to use:

- The header shows the signed-in user, and a few account pages and the sign-out action hang off it.

Composition notes:

- Render the pages as links with `MenuItem asChild` around an `<a href>`, so they open in a new tab with a modifier key like any link.
- Keep sign-out a plain item after a `Separator`.

Trade-offs:

- Familiar and small, but pages that people visit often belong in the main navigation, not behind a menu.

<!-- example: menu/account-menu.tsx -->
```tsx
import { useState } from 'react';
import { Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';

export default function AccountMenu() {
  const [signedOut, setSignedOut] = useState(false);

  if (signedOut) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>You are signed out.</Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setSignedOut(false)}>Sign in</Button>
      </div>
    );
  }

  return (
    <Menu placement='bottom-end'>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Maria Chen</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild><a href='#profile'>Profile</a></MenuItem>
        <MenuItem asChild><a href='#billing'>Billing</a></MenuItem>
        <MenuItem asChild><a href='#shortcuts'>Keyboard shortcuts</a></MenuItem>
        <Separator />
        <MenuItem onClick={() => setSignedOut(true)}>Sign out</MenuItem>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->

## Create Menu With Groups

When to use:

- A "Create" or "New" button offers several kinds of things to create, falling into a few groups.

Composition notes:

- Wrap each group in a `MenuGroup` with a plain-text heading inside it, named through `aria-labelledby`.
- Divide the groups with `Separator`.

Trade-offs:

- Scales to a dozen items; beyond that, a dialog with a searchable list is easier to scan than a long menu.

<!-- example: menu/create-menu-groups.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import { Button, Menu, MenuContent, MenuGroup, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

export default function CreateMenuGroups() {
  const documentsId = useId();
  const workspaceId = useId();

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm'>Create</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup aria-labelledby={documentsId}>
          <Text id={documentsId} size={2} fontWeight={500} style={groupHeading}>Documents</Text>
          <MenuItem>Document</MenuItem>
          <MenuItem>Spreadsheet</MenuItem>
          <MenuItem>Presentation</MenuItem>
        </MenuGroup>
        <Separator />
        <MenuGroup aria-labelledby={workspaceId}>
          <Text id={workspaceId} size={2} fontWeight={500} style={groupHeading}>Workspace</Text>
          <MenuItem>Project</MenuItem>
          <MenuItem>Team</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->
