# Popover Examples

## Basic

### Basic: account menu

`role='dialog'` on the root gives the content `role="dialog"` and the trigger `aria-haspopup="dialog"`, and `aria-label` names the content. Layout styles go on an inner element: a `display` set on `PopoverContent` itself would override the browser's hiding of a closed popover.

<!-- example: popover/anchored-user-menu.tsx -->
```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

export default function AnchoredUserMenu() {
  return (
    <Popover role='dialog' placement='bottom-end'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Maria Chen</Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Account' style={{ padding: 'var(--spacing-2)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 220 }}>
          <div style={{ display: 'grid', paddingInline: 'var(--spacing-6)', paddingBlock: 'var(--spacing-4)' }}>
            <Text size={3} fontWeight={600}>Maria Chen</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>maria@northwind.dev</Text>
          </div>
          <Separator />
          <Button asChild variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>
            <a href='#profile'>Profile</a>
          </Button>
          <Button asChild variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>
            <a href='#billing'>Billing</a>
          </Button>
          <Separator />
          <Button variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: notifications that mark themselves read

`onChangeOpen` reports every open and close, from the trigger, an outside click or `Escape`. Opening clears the unread count, and the trigger's `aria-label` carries the count for screen readers.

<!-- example: popover/controlled-open-state.tsx -->
```tsx
import { useId, useState } from 'react';
import {
  Badge,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { BellIcon } from '@vega-ui/icons';

const notifications = [
  { id: 1, text: 'Tom Okafor mentioned you in Pricing table', time: '4 min ago' },
  { id: 2, text: 'Export of Q3 invoices is ready', time: '1 h ago' },
  { id: 3, text: 'Lea Novak shared Homepage hero with you', time: 'Yesterday' },
];

export default function ControlledOpenState() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(notifications.length);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (next) setUnread(0);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-4)',
        paddingInlineEnd: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <Popover role='dialog' placement='bottom-start' open={open} onChangeOpen={changeOpen}>
        <PopoverTrigger asChild>
          <IconButton aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'} variant='secondary' appearance='ghost'>
            <Icon><BellIcon /></Icon>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent aria-labelledby={titleId}>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 280 }}>
            <Heading id={titleId} as='h3' size={5} fontWeight={600}>Notifications</Heading>
            {notifications.map((item) => (
              <div key={item.id} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
                <Text size={3}>{item.text}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{item.time}</Text>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {unread > 0 && <Badge variant='info' size='sm'>{unread} new</Badge>}
      <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)' }}>Popover is {open ? 'open' : 'closed'}</Text>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: menu that closes on select

A popover does not close by itself when a button inside is pressed. Wrap each item in `PopoverClose` with `asChild`: it closes the popover, and the item's own `onClick` records the chosen action, so no `open` state is needed.

<!-- example: popover/menu-closes-on-select.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const actions = ['Duplicate', 'Move to folder', 'Download as PDF', 'Archive'];

export default function MenuClosesOnSelect() {
  const [last, setLast] = useState('');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Popover placement='bottom-start'>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Brand guidelines.fig</Button>
        </PopoverTrigger>
        <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
          <div role='group' aria-label='File actions' style={{ display: 'grid', minWidth: 200 }}>
            {actions.map((action) => (
              <PopoverClose key={action} asChild>
                <Button
                  variant='secondary'
                  appearance='transparent'
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => setLast(action)}
                >
                  {action}
                </Button>
              </PopoverClose>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Text size={2} style={{ minHeight: '1lh', color: 'var(--label-secondary)' }}>{last ? `Last action: ${last}` : ''}</Text>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: lightweight delete confirmation

Each comment has its own popover with Keep and Delete. Keep is wrapped in `PopoverClose`, so it closes the popover without any `open` state. `autoFocus` puts focus on the safe answer when the popover opens, and the content is named by its question through `aria-labelledby`.

<!-- example: popover/destructive-confirm-in-a-popover.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

const initialComments = [
  { id: 1, author: 'Tom Okafor', text: 'Can we try the darker blue for the header?' },
  { id: 2, author: 'Lea Novak', text: 'Typo in the second paragraph: “recieve”.' },
];

export default function DestructiveConfirmInAPopover() {
  const [comments, setComments] = useState(initialComments);

  return (
    <div
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 160,
        alignContent: 'start',
        paddingInline: 'var(--spacing-8)',
        paddingBlock: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--spacing-6)',
            paddingBlock: 'var(--spacing-6)',
            borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
          }}
        >
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>{comment.author}</Text>
            <Text size={3} style={{ color: 'var(--label-secondary)' }}>{comment.text}</Text>
          </div>
          <DeleteComment onDelete={() => setComments(comments.filter((item) => item.id !== comment.id))} />
        </div>
      ))}
      {comments.length === 0 && <Text size={3} style={{ paddingBlock: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>No comments yet.</Text>}
    </div>
  );
}

function DeleteComment({ onDelete }: { onDelete: () => void }) {
  const textId = useId();

  return (
    <Popover role='dialog' placement='bottom-end'>
      <PopoverTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>Delete</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={textId}>
        <div style={{ display: 'grid', gap: 'var(--spacing-8)', maxWidth: 240 }}>
          <Text id={textId} size={3}>Delete this comment? It cannot be restored.</Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
            <PopoverClose asChild>
              <Button size='sm' variant='secondary' appearance='ghost' autoFocus>Keep</Button>
            </PopoverClose>
            <Button size='sm' style={destructive} onClick={onDelete}>Delete</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: inline rename form

The form validates natively (`required`, `pattern`, `maxLength`), reads the new name with `FormData` and closes the popover by setting `open` to `false`. The round close button is a plain `IconButton` that sets `open` to `false`, since there is no close part for popovers.

<!-- example: popover/inline-rename-flow.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function InlineRenameFlow() {
  const titleId = useId();
  const fieldId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Q4 launch plan');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName(String(new FormData(event.currentTarget).get('name')).trim());
    setOpen(false);
  };

  return (
    <Popover role='dialog' placement='bottom-start' open={open} onChangeOpen={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>{name}</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={titleId}>
        <form onSubmit={onSubmit} style={{ display: 'grid', width: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h3' size={5} fontWeight={600}>Rename document</Heading>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              onClick={() => setOpen(false)}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-6)' }}>
            <Label htmlFor={fieldId}>Name</Label>
            <TextField size='sm'>
              <TextFieldInput id={fieldId} name='name' defaultValue={name} required pattern='.*\S.*' maxLength={80} autoFocus />
            </TextField>
          </div>
          <Button type='submit' size='sm' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-8)' }}>Rename</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: popovers inside a scrolling list

Each row has its own popover. The content renders in the top layer, so the list's `overflow: auto` never clips it, and it follows its trigger while the list scrolls and flips when there is no room below.

<!-- example: popover/scroll-container.tsx -->
```tsx
import {
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { InfoIcon } from '@vega-ui/icons';

const names = ['Maria Chen', 'Tom Okafor', 'Lea Novak', 'Sam Rivera', 'Ana Silva'];

const members = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  name: names[index % names.length],
  role: index % 4 === 0 ? 'Admin' : 'Editor',
  lastSeen: `${index + 2} h ago`,
}));

export default function ScrollContainer() {
  return (
    <ul
      tabIndex={0}
      aria-label='Team members'
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 220,
        overflow: 'auto',
        overscrollBehavior: 'contain',
        margin: 0,
        paddingBlock: 'var(--spacing-2)',
        paddingInline: 0,
        listStyle: 'none',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {members.map((member) => (
        <li key={member.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', paddingInline: 'var(--spacing-8)', paddingBlock: 'var(--spacing-3)' }}>
          <Text size={3}>{member.name}</Text>
          <Popover role='dialog' placement='bottom-end'>
            <PopoverTrigger asChild>
              <IconButton aria-label={`Details for ${member.name}`} size='sm' variant='secondary' appearance='ghost'>
                <Icon size='xs'><InfoIcon /></Icon>
              </IconButton>
            </PopoverTrigger>
            <PopoverContent aria-label={`${member.name} details`}>
              <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 180 }}>
                <Text size={3} fontWeight={600}>{member.name}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{member.role} · last seen {member.lastSeen}</Text>
              </div>
            </PopoverContent>
          </Popover>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

### Layout/Overlay: filters anchored to a search field

The filters button sits inside the search field, but the panel should line up with the whole field. `PopoverAnchor` wraps the field, so the content is positioned against it, while opening, `aria-*`, and focus return stay on the trigger. Cancel, Apply, and the close button are `PopoverClose`: Apply also commits the draft in its own `onClick`.

<!-- example: popover/filters-anchored-to-a-search-field.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Icon,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { SlidersHorizontal, XIcon } from '@vega-ui/icons';

const statuses = ['Open', 'In review', 'Merged', 'Closed'];

const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

export default function FiltersAnchoredToASearchField() {
  const titleId = useId();
  const [applied, setApplied] = useState<string[]>(['Open']);
  const [draft, setDraft] = useState(applied);

  const toggle = (status: string) => {
    setDraft(draft.includes(status) ? draft.filter((item) => item !== status) : [...draft, status]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <Popover role='dialog' placement='bottom-start' onChangeOpen={(open) => open && setDraft(applied)}>
        <PopoverAnchor>
          <TextField>
            <TextFieldInput type='search' aria-label='Search pull requests' placeholder='Search pull requests' />
            <PopoverTrigger asChild>
              <IconButton
                size='xs'
                variant='secondary'
                appearance='transparent'
                aria-label={`Filters, ${applied.length} applied`}
                style={{ flexShrink: 0, marginInlineEnd: 'var(--spacing-3)' }}
              >
                <Icon size='sm'><SlidersHorizontal /></Icon>
              </IconButton>
            </PopoverTrigger>
          </TextField>
        </PopoverAnchor>
        <PopoverContent aria-labelledby={titleId}>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)', minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Text id={titleId} size={3} fontWeight={600}>Status</Text>
              <PopoverClose asChild>
                <IconButton aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </PopoverClose>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
              {statuses.map((status) => (
                <Checkbox key={status} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <CheckboxInput checked={draft.includes(status)} onChange={() => toggle(status)} />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                  </CheckboxIndicator>
                  {status}
                </Checkbox>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <PopoverClose asChild>
                <Button size='xs' variant='secondary' appearance='ghost'>Cancel</Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button size='xs' onClick={() => setApplied(draft)}>Apply</Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {applied.length > 0 ? `Showing: ${applied.join(', ')}` : 'Showing all pull requests'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: invalid link address

The form uses `noValidate` and checks the address on submit: an invalid one keeps the popover open and shows an error linked with `aria-describedby` and `aria-invalid`, a valid one is inserted and closes it. Submit the prefilled value to see the error.

<!-- example: popover/link-error.tsx -->
```tsx
import { useId, useState, type FormEvent } from 'react';
import {
  Button,
  HelperText,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { LinkIcon } from '@vega-ui/icons';

const parseUrl = (value: string) => {
  const withProtocol = /^[a-z]+:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes('.')) return null;
    return url.href;
  } catch {
    return null;
  }
};

export default function LinkError() {
  const fieldId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [href, setHref] = useState('');

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = parseUrl(String(new FormData(event.currentTarget).get('url')).trim());

    if (!url) {
      setError('Enter a full address, for example northwind.dev/pricing.');
      return;
    }
    setHref(url);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-4)',
        paddingInlineEnd: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <Popover role='dialog' placement='bottom-start' open={open} onChangeOpen={changeOpen}>
        <PopoverTrigger asChild>
          <IconButton aria-label='Insert link' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
            <Icon><LinkIcon /></Icon>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent aria-label='Insert link'>
          <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: 280 }}>
            <Label htmlFor={fieldId}>Link address</Label>
            <TextField size='sm' error={error !== ''}>
              <TextFieldInput
                id={fieldId}
                name='url'
                inputMode='url'
                defaultValue='northwind'
                autoFocus
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error size='sm'>{error}</HelperText>}
            <Button type='submit' size='sm' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-5)' }}>Insert</Button>
          </form>
        </PopoverContent>
      </Popover>
      <Text size={2} style={{ minWidth: 0, color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{href ? `Linked to ${href}` : 'No link yet'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: trigger disabled until something is selected

The Bulk actions trigger is disabled while no file is selected, and the hint is linked with `aria-describedby` while it is. A disabled button cannot open its popover through `popovertarget`.

<!-- example: popover/disabled-trigger.tsx -->
```tsx
import { useId, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const actions = ['Download', 'Move to archive', 'Share'];

const files = ['Contract – Kestrel Robotics.pdf', 'Invoice INV-2041.pdf', 'Brand guidelines.fig'];

export default function DisabledTrigger() {
  const hintId = useId();
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  const toggle = (file: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, file]);
      return;
    }
    setSelected(selected.filter((item) => item !== file));
  };

  const run = (action: string) => {
    setStatus(`${action}: ${selected.length} file(s)`);
    setOpen(false);
  };

  const none = selected.length === 0;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gap: 'var(--spacing-6)',
          padding: 'var(--spacing-8)',
          background: 'var(--surface-primary)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        {files.map((file) => (
          <Checkbox key={file} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minWidth: 0 }}>
            <CheckboxInput checked={selected.includes(file)} onChange={(event) => toggle(file, event.currentTarget.checked)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file}</span>
          </Checkbox>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Popover placement='bottom-start' open={open} onChangeOpen={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='secondary' appearance='ghost' disabled={none} aria-describedby={none ? hintId : undefined} style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
              {none ? 'Bulk actions' : `Bulk actions (${selected.length})`}
            </Button>
          </PopoverTrigger>
          <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
            <div role='group' aria-label='Bulk actions' style={{ display: 'grid', minWidth: 180 }}>
              {actions.map((action) => (
                <Button key={action} variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }} onClick={() => run(action)}>
                  {action}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {none && <HelperText id={hintId}>Select at least one file.</HelperText>}
        {!none && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{status}</Text>}
      </div>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: popover inside a popover

The label picker opens from inside the filters popover. Nested `popover="auto"` elements stack natively: choosing a label closes only the inner one, and an outside click closes both.

<!-- example: popover/nested-popover.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const labels = ['Bug', 'Feature', 'Design', 'Docs'];

export default function NestedPopover() {
  const [label, setLabel] = useState('Bug');
  const [labelOpen, setLabelOpen] = useState(false);

  const choose = (next: string) => {
    setLabel(next);
    setLabelOpen(false);
  };

  return (
    <Popover role='dialog' placement='bottom-start'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Filters · {label}</Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Filters'>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Text size={3}>Label</Text>
          <Popover placement='right-start' open={labelOpen} onChangeOpen={setLabelOpen}>
            <PopoverTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>{label}</Button>
            </PopoverTrigger>
            <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
              <div role='group' aria-label='Labels' style={{ display: 'grid', minWidth: 120 }}>
                {labels.map((item) => (
                  <Button
                    key={item}
                    size='sm'
                    variant='secondary'
                    appearance={item === label ? 'ghost' : 'transparent'}
                    aria-pressed={item === label}
                    style={{ justifyContent: 'flex-start' }}
                    onClick={() => choose(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

### Edge: long unbreakable content

`PopoverContent` is `width: max-content`, so a long URL would make it as wide as the URL. A `max-width` on the inner element and `overflow-wrap: anywhere` keep it within the screen.

<!-- example: popover/long-content.tsx -->
```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const webhook = 'https://hooks.northwind.dev/integrations/v2/workspaces/8f3a9c1e-42b7-4d0a-9e61-b5c7d2f40a18/events?signature=sha256';

export default function LongContent() {
  return (
    <Popover role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Webhook URL</Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Webhook URL'>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', maxWidth: 'min(320px, calc(100vw - 48px))' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Events are sent to</Text>
          <Text size={3} style={{ overflowWrap: 'anywhere', fontFamily: 'monospace' }}>{webhook}</Text>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->
