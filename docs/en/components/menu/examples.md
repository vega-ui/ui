# Menu Examples

## Basic

### Basic: row actions behind an icon button

The actions of a file row sit behind a "⋯" `IconButton`. The button has no text, so `aria-label` names it, and the trigger names the menu too. `placement='bottom-end'` lines the menu up with the end of the row, and each item reports its result in the row.

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

### Basic: account menu with links

`MenuItem asChild` renders an `<a href>` as the item: the menu closes and the browser follows the link, while the last item is a plain action. A screen reader announces the link items as menu items.

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

## Controlled/Stateful

### Controlled/Stateful: view options with checkbox and radio items

Two `MenuCheckboxItem` switch parts of a task list on and off, and a `MenuRadioGroup` picks the sort order. The parent keeps all three values, so the summary next to the trigger follows them. `MenuItemIndicator` keeps its space in every item and shows the check mark only in the checked ones. Space checks an item and keeps the menu open for the next change; Enter or a click checks it and closes the menu.

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

### Controlled/Stateful: row highlighted while its menu is open

Each row controls its menu through `open` and `onChangeOpen`, and the parent keeps which row's menu is open to highlight that row. Opening another row's menu closes the first one through the browser, so `onChangeOpen(false)` of the first row only clears the state when it still points at that row.

<!-- example: menu/file-list-open-state.tsx -->
```tsx
import { useState } from 'react';
import { Icon, IconButton, Menu, MenuContent, MenuItem, MenuTrigger, Text } from '@vega-ui/react';
import { EllipsisIcon } from '@vega-ui/icons';

const files = [
  { id: 'brief', name: 'Campaign brief.docx', meta: 'Edited 2 hours ago' },
  { id: 'budget', name: 'Budget 2027.xlsx', meta: 'Edited yesterday' },
  { id: 'deck', name: 'Kickoff deck.key', meta: 'Edited 12 Nov' },
];

export default function FileListOpenState() {
  const [openFile, setOpenFile] = useState<string | null>(null);

  const changeOpen = (id: string, open: boolean) => {
    if (open) {
      setOpenFile(id);
      return;
    }

    setOpenFile((current) => (current === id ? null : current));
  };

  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-1)', margin: 0, padding: 0, listStyle: 'none', width: '100%', maxWidth: 420 }}>
      {files.map((file) => (
        <li
          key={file.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-6)',
            padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
            borderRadius: 'var(--radius-4)',
            background: openFile === file.id ? 'var(--fills-secondary)' : 'transparent',
          }}
        >
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>{file.name}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{file.meta}</Text>
          </div>
          <Menu placement='bottom-end' size='sm' open={openFile === file.id} onChangeOpen={(open) => changeOpen(file.id, open)}>
            <MenuTrigger asChild>
              <IconButton size='sm' aria-label={`Actions for ${file.name}`} variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
                <Icon><EllipsisIcon /></Icon>
              </IconButton>
            </MenuTrigger>
            <MenuContent>
              <MenuItem>Open</MenuItem>
              <MenuItem>Share</MenuItem>
              <MenuItem>Download</MenuItem>
            </MenuContent>
          </Menu>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: grouped items with headings

Each `MenuGroup` is named by the plain-text heading inside it through `aria-labelledby`, and a `Separator` divides the groups. The headings are not items: the arrow keys and typeahead move only between the items.

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

### Layout/Overlay: file actions with submenus

Move to, Share and Label open their submenus beside them when the pointer rests on them, or on Enter, Space or the Right arrow with the focus on the first item; Projects is a submenu inside a submenu. The folder the file is in is disabled, so the user still finds it. Label is a radio group: Space changes the label and keeps the submenu open, Enter or a click changes it and closes every menu. The Left arrow or Escape closes only the current submenu. The icons and chevrons are your own: `MenuSubmenuTrigger` draws nothing besides its children.

<!-- example: menu/file-submenus.tsx -->
```tsx
import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  Icon,
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';
import {
  ArchiveIcon,
  ChevronRightIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  FileTextIcon,
  FolderIcon,
  FolderInputIcon,
  InboxIcon,
  LinkIcon,
  MailIcon,
  MessageCircleIcon,
  PencilIcon,
  Share2Icon,
  TagIcon,
  Trash2Icon,
} from '@vega-ui/icons';

const labels = [
  { value: 'none', name: 'No label', color: 'transparent' },
  { value: 'review', name: 'In review', color: 'var(--color-amber-500)' },
  { value: 'approved', name: 'Approved', color: 'var(--color-green-500)' },
  { value: 'blocked', name: 'Blocked', color: 'var(--color-red-500)' },
];

const projects = ['Design', 'Finance', 'Marketing'];

const muted: CSSProperties = { color: 'var(--label-secondary)' };

const dot = (color: string): CSSProperties => ({
  flexShrink: 0,
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: color,
  boxShadow: color === 'transparent' ? 'inset 0 0 0 1px var(--label-tertiary)' : undefined,
});

function Lead({ children }: { children: ReactNode }) {
  return <Icon size='sm' style={muted}>{children}</Icon>;
}

function Chevron() {
  return <Icon size='xs' style={{ ...muted, marginInlineStart: 'auto' }}><ChevronRightIcon /></Icon>;
}

export default function FileSubmenus() {
  const [folder, setFolder] = useState('Finance');
  const [label, setLabel] = useState('review');
  const [status, setStatus] = useState('Edited 2 hours ago');
  const current = labels.find((item) => item.value === label) ?? labels[0];

  const moveTo = (target: string) => {
    setFolder(target);
    setStatus(`Moved to ${target}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
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
      <Icon size='lg' style={muted}><FileTextIcon /></Icon>
      <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Text size={3} fontWeight={500}>Q3 report.pdf</Text>
          {label !== 'none' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <span aria-hidden style={dot(current.color)} />
              <Text size={1} style={muted}>{current.name}</Text>
            </span>
          )}
        </div>
        <Text size={2} role='status' style={{ ...muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{folder} · {status}</Text>
      </div>
      <Menu placement='bottom-end' size='sm'>
        <MenuTrigger asChild>
          <IconButton size='sm' aria-label='Actions for Q3 report.pdf' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
            <Icon><EllipsisIcon /></Icon>
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => setStatus('Opened in a new tab')}><Lead><ExternalLinkIcon /></Lead>Open</MenuItem>
          <MenuItem onClick={() => setStatus('Renamed just now')}><Lead><PencilIcon /></Lead>Rename</MenuItem>
          <MenuItem onClick={() => setStatus('Copy saved')}><Lead><CopyIcon /></Lead>Duplicate</MenuItem>
          <Separator />
          <MenuSubmenu>
            <MenuSubmenuTrigger><Lead><FolderInputIcon /></Lead>Move to<Chevron /></MenuSubmenuTrigger>
            <MenuContent>
              <MenuItem disabled={folder === 'Inbox'} onClick={() => moveTo('Inbox')}><Lead><InboxIcon /></Lead>Inbox</MenuItem>
              <MenuSubmenu>
                <MenuSubmenuTrigger><Lead><FolderIcon /></Lead>Projects<Chevron /></MenuSubmenuTrigger>
                <MenuContent>
                  {projects.map((project) => (
                    <MenuItem key={project} disabled={folder === project} onClick={() => moveTo(project)}>
                      <Lead><FolderIcon /></Lead>{project}
                    </MenuItem>
                  ))}
                </MenuContent>
              </MenuSubmenu>
              <MenuItem disabled={folder === 'Archive'} onClick={() => moveTo('Archive')}><Lead><ArchiveIcon /></Lead>Archive</MenuItem>
            </MenuContent>
          </MenuSubmenu>
          <MenuSubmenu>
            <MenuSubmenuTrigger><Lead><Share2Icon /></Lead>Share<Chevron /></MenuSubmenuTrigger>
            <MenuContent>
              <MenuItem onClick={() => setStatus('Link copied')}><Lead><LinkIcon /></Lead>Copy link</MenuItem>
              <MenuItem onClick={() => setStatus('Sent by email')}><Lead><MailIcon /></Lead>Email</MenuItem>
              <MenuItem onClick={() => setStatus('Sent in Messages')}><Lead><MessageCircleIcon /></Lead>Messages</MenuItem>
            </MenuContent>
          </MenuSubmenu>
          <MenuSubmenu>
            <MenuSubmenuTrigger><Lead><TagIcon /></Lead>Label<Chevron /></MenuSubmenuTrigger>
            <MenuContent>
              <MenuRadioGroup aria-label='Label' value={label} onChangeValue={setLabel}>
                {labels.map((item) => (
                  <MenuRadioItem key={item.value} value={item.value}>
                    <MenuItemIndicator />
                    <span aria-hidden style={dot(item.color)} />
                    {item.name}
                  </MenuRadioItem>
                ))}
              </MenuRadioGroup>
            </MenuContent>
          </MenuSubmenu>
          <Separator />
          <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => setStatus('Moved to trash')}>
            <Icon size='sm'><Trash2Icon /></Icon>Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: item unavailable on the current plan

A disabled item gets `aria-disabled="true"` and stays focusable, so keyboard and screen reader users still find it and hear why it is unavailable: the `Badge` is part of its name. Its `onClick` is not called, and a click, Enter or Space leaves the menu open.

<!-- example: menu/plan-limited-export.tsx -->
```tsx
import { Badge, Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator } from '@vega-ui/react';

export default function PlanLimitedExport() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Export</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>PDF document</MenuItem>
        <MenuItem>Word document</MenuItem>
        <MenuItem>Markdown</MenuItem>
        <Separator />
        <MenuItem disabled>
          Publish to web
          <Badge size='xs' variant='info' appearance='ghost' style={{ marginInlineStart: 'auto' }}>Business plan</Badge>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->

## Edge

### Edge: keeping the menu open with preventDefault

`event.preventDefault()` in the `onClick` of "Zoom in" and "Zoom out" keeps the menu open, so the user can press them several times and watch the level change in the trigger. "Reset to 100%" does not prevent the default and closes the menu. At the ends of the range the item becomes disabled and keeps the focus. The trigger text changes, so `aria-label` on `MenuContent` gives the menu a steady name.

<!-- example: menu/zoom-keep-open.tsx -->
```tsx
import { useState, type MouseEvent } from 'react';
import { Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator } from '@vega-ui/react';

const levels = [50, 75, 100, 125, 150, 200];

export default function ZoomKeepOpen() {
  const [zoom, setZoom] = useState(100);
  const position = levels.indexOf(zoom);

  const zoomBy = (event: MouseEvent, offset: number) => {
    event.preventDefault();
    setZoom(levels[position + offset]);
  };

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost' style={{ minWidth: 112, fontVariantNumeric: 'tabular-nums' }}>Zoom {zoom}%</Button>
      </MenuTrigger>
      <MenuContent aria-label='Zoom'>
        <MenuItem disabled={position === levels.length - 1} onClick={(event) => zoomBy(event, 1)}>Zoom in</MenuItem>
        <MenuItem disabled={position === 0} onClick={(event) => zoomBy(event, -1)}>Zoom out</MenuItem>
        <Separator />
        <MenuItem onClick={() => setZoom(100)}>Reset to 100%</MenuItem>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->

### Edge: typeahead label for items with a leading badge

The text of each item starts with the code in its `Badge`, such as "P2High", so typing "h" would find nothing. The `label` prop gives typeahead the plain word instead. The badge is `aria-hidden`, so the accessible name is the word alone.

<!-- example: menu/priority-typeahead.tsx -->
```tsx
import { useState } from 'react';
import { Badge, Button, Menu, MenuContent, MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuTrigger } from '@vega-ui/react';

const priorities = [
  { value: 'urgent', label: 'Urgent', code: 'P1', variant: 'error' },
  { value: 'high', label: 'High', code: 'P2', variant: 'warning' },
  { value: 'medium', label: 'Medium', code: 'P3', variant: 'info' },
  { value: 'low', label: 'Low', code: 'P4', variant: 'info' },
];

export default function PriorityTypeahead() {
  const [priority, setPriority] = useState('medium');
  const current = priorities.find((item) => item.value === priority);

  return (
    <Menu size='sm'>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Priority: {current?.label}</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuRadioGroup aria-label='Priority' value={priority} onChangeValue={setPriority}>
          {priorities.map((item) => (
            <MenuRadioItem key={item.value} value={item.value} label={item.label}>
              <Badge size='xs' variant={item.variant} appearance='ghost' aria-hidden='true' style={{ fontVariantNumeric: 'tabular-nums' }}>{item.code}</Badge>
              {item.label}
              <MenuItemIndicator style={{ marginInlineStart: 'auto' }} />
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->
