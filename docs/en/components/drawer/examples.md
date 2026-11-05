# Drawer Examples

## Basic

### Basic: order inspector

A drawer that shows details of one record next to the page. The heading names the drawer through `aria-labelledby`, and the round close button sits in the top end corner; a backdrop click, `Escape` or a touch swipe toward the edge also closes it.

<!-- example: drawer/side-inspector.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Badge,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const details = [
  { term: 'Customer', value: 'Kestrel Robotics' },
  { term: 'Placed', value: 'Nov 2, 2026, 14:08' },
  { term: 'Items', value: '3 × Sensor kit, 1 × Charging dock' },
  { term: 'Total', value: '$1,284.00' },
  { term: 'Ship to', value: '41 Harbour Road, Bristol BS1 5TY' },
];

export default function SideInspector() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <div style={{ marginBlockStart: 'var(--spacing-4)' }}>
          <Badge variant='warning' size='sm'>Awaiting payment</Badge>
        </div>
        <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-12) 0 0' }}>
          {details.map((detail) => (
            <div key={detail.term} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{detail.term}</Text></dt>
              <dd style={{ margin: 0 }}><Text size={3}>{detail.value}</Text></dd>
            </div>
          ))}
        </dl>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: one drawer for a list with previous and next

The parent owns `open` and the selected ticket, so any row opens the same drawer and the arrows inside it move through the list without closing it. `aria-current` marks the row that is shown.

<!-- example: drawer/controlled-open-state.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { ChevronDownIcon, ChevronUpIcon, XIcon } from '@vega-ui/icons';

const tickets = [
  { id: 'SUP-311', title: 'Export to CSV times out', requester: 'Maria Chen', priority: 'High' },
  { id: 'SUP-312', title: 'Invoice shows the wrong VAT number', requester: 'Tom Okafor', priority: 'Medium' },
  { id: 'SUP-313', title: 'Cannot invite members with a + in the email', requester: 'Lea Novak', priority: 'High' },
  { id: 'SUP-314', title: 'Dark mode resets after sign in', requester: 'Sam Rivera', priority: 'Low' },
];

export default function ControlledOpenState() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const ticket = tickets[index];

  const openTicket = (next: number) => {
    setIndex(next);
    setOpen(true);
  };

  return (
    <div
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {tickets.map((item, itemIndex) => (
        <Button
          key={item.id}
          variant='secondary'
          appearance={open && itemIndex === index ? 'ghost' : 'transparent'}
          aria-current={open && itemIndex === index ? 'true' : undefined}
          style={{ justifyContent: 'flex-start', gap: 'var(--spacing-4)', minWidth: 0 }}
          onClick={() => openTicket(itemIndex)}
        >
          <span style={{ flexShrink: 0, color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{item.id}</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
        </Button>
      ))}

      <Drawer open={open} onChangeOpen={setOpen}>
        <DrawerContent aria-labelledby={titleId} style={{ width: 380 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{ticket.id} · {index + 1} of {tickets.length}</Text>
              <Heading id={titleId} as='h2' size={4} fontWeight={600}>{ticket.title}</Heading>
            </div>
            <DrawerClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DrawerClose>
          </div>
          <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>Requested by {ticket.requester} · {ticket.priority} priority</Text>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBlockStart: 'auto', paddingBlockStart: 'var(--spacing-12)' }}>
            <IconButton aria-label='Previous ticket' variant='secondary' appearance='ghost' disabled={index === 0} onClick={() => setIndex(index - 1)}>
              <Icon><ChevronUpIcon /></Icon>
            </IconButton>
            <IconButton aria-label='Next ticket' variant='secondary' appearance='ghost' disabled={index === tickets.length - 1} onClick={() => setIndex(index + 1)}>
              <Icon><ChevronDownIcon /></Icon>
            </IconButton>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: invite form with native validation

A `<form method="dialog">` with `type="email" multiple required`: the browser validates the addresses, and a valid submit reads them with `FormData` in `onSubmit` and closes the drawer. The page shows the pending invites below the trigger.

<!-- example: drawer/short-form-flow.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function ShortFormFlow() {
  const titleId = useId();
  const emailsId = useId();
  const emailsHintId = useId();
  const messageId = useId();
  const [invited, setInvited] = useState<string[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const emails = String(data.get('emails')).split(',').map((email) => email.trim());

    setInvited([...invited, ...emails]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Invite members</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 420 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Invite members</Heading>
            <DrawerClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DrawerClose>
          </div>
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={emailsId}>Emails</Label>
              <TextField>
                <TextFieldInput
                  id={emailsId}
                  name='emails'
                  type='email'
                  multiple
                  required
                  autoFocus
                  placeholder='maria@northwind.dev, tom@northwind.dev'
                  aria-describedby={emailsHintId}
                />
              </TextField>
              <HelperText id={emailsHintId}>Separate several addresses with commas.</HelperText>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={messageId}>Personal note (optional)</Label>
              <TextArea id={messageId} name='message' rows={3} fullWidth />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
              <DrawerClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DrawerClose>
              <Button type='submit'>Send invites</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
      <Text size={2} style={{ minHeight: '1lh', textAlign: 'center', overflowWrap: 'anywhere', color: 'var(--label-secondary)' }}>
        {invited.length > 0 ? `Pending invites: ${invited.join(', ')}` : ''}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: long scrollable list

With `fullHeight` the drawer takes the full height of the viewport, and only the list scrolls: it takes the remaining space with `flex: 1` and `min-height: 0`, and `overscroll-behavior: contain` keeps its scroll from reaching the page.

<!-- example: drawer/activity-panel.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const people = ['Maria Chen', 'Tom Okafor', 'Lea Novak', 'Sam Rivera'];
const actions = ['commented on Homepage hero', 'moved Pricing table to Review', 'uploaded 3 files', 'resolved a thread', 'changed the due date'];

const events = Array.from({ length: 60 }, (_, index) => ({
  id: index,
  who: people[index % people.length],
  what: actions[(index * 2) % actions.length],
  when: index < 6 ? `${(index + 1) * 9} min ago` : `${Math.floor(index / 6)} d ago`,
}));

export default function ActivityPanel() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Activity</Button>
      </DrawerTrigger>
      <DrawerContent fullHeight aria-labelledby={titleId} style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Activity</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <ol
          tabIndex={0}
          aria-label='Recent activity'
          style={{
            display: 'grid',
            gap: 'var(--spacing-8)',
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
            overscrollBehavior: 'contain',
            margin: 'var(--spacing-8) 0 0',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {events.map((event) => (
            <li key={event.id} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={3}><b>{event.who}</b> {event.what}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>{event.when}</Text>
            </li>
          ))}
        </ol>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

### Layout/Overlay: drawer without a backdrop

`overlay={false}` and `blurred={false}` leave the page visible behind an inspector pinned to the top end corner with `position='end-start'`. The drawer is still modal: the page behind it is inert until it closes.

<!-- example: drawer/drawer-without-overlay.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const metrics = [
  { label: 'Source', value: 'Warehouse · orders_daily' },
  { label: 'Refresh', value: 'Every 15 minutes' },
  { label: 'Last updated', value: '14:45 UTC' },
  { label: 'Owner', value: 'Data team' },
];

export default function DrawerWithoutOverlay() {
  const titleId = useId();

  return (
    <Drawer position='end-start'>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Inspect revenue widget</Button>
      </DrawerTrigger>
      <DrawerContent shadowed overlay={false} blurred={false} aria-labelledby={titleId} style={{ width: 320 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Revenue widget</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-8) 0 0' }}>
          {metrics.map((metric) => (
            <div key={metric.label} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{metric.label}</Text></dt>
              <dd style={{ margin: 0 }}><Text size={3}>{metric.value}</Text></dd>
            </div>
          ))}
        </dl>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Error

### Error: invalid IBAN in a drawer form

The check runs on submit, so the form uses `noValidate` and a controlled drawer: an invalid IBAN keeps the drawer open and shows an error linked with `aria-describedby` and `aria-invalid`, a valid one saves and closes it. Change a digit of the prefilled IBAN to see the error.

<!-- example: drawer/form-error.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const isValidIban = (value: string) => {
  const iban = value.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const digits = rearranged.replace(/[A-Z]/g, (letter) => String(letter.charCodeAt(0) - 55));
  let remainder = 0;

  for (const digit of digits) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }

  return remainder === 1;
};

export default function FormError() {
  const titleId = useId();
  const ibanId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [payout, setPayout] = useState('Not set');

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const iban = String(new FormData(event.currentTarget).get('iban'));

    if (!isValidIban(iban)) {
      setError('This IBAN is not valid. Check the country code and the digits.');
      return;
    }
    setPayout(iban);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Payout account</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums', overflowWrap: 'anywhere' }}>{payout}</Text>
      </div>
      <Drawer open={open} onChangeOpen={changeOpen}>
        <DrawerTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Edit</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 420 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Payout account</Heading>
            <DrawerClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DrawerClose>
          </div>
          <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={ibanId}>IBAN</Label>
            <TextField error={error !== ''}>
              <TextFieldInput
                id={ibanId}
                name='iban'
                defaultValue='DE89 3704 0044 0532 0130 01'
                autoComplete='off'
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error>{error}</HelperText>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
              <DrawerClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DrawerClose>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: read-only settings for non-admins

`<Fieldset disabled>` disables every field and the Save button inside it at once, and `aria-describedby` on the fieldset explains why. Toggle the checkbox to see the same drawer for an admin.

<!-- example: drawer/read-only-settings.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Fieldset,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function ReadOnlySettings() {
  const titleId = useId();
  const nameId = useId();
  const domainId = useId();
  const noteId = useId();
  const [canEdit, setCanEdit] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={canEdit} onChange={(event) => setCanEdit(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Signed in as a workspace admin
      </Checkbox>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Workspace settings</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Workspace settings</Heading>
            <DrawerClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DrawerClose>
          </div>
          <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            {!canEdit && <HelperText id={noteId}>Only workspace admins can change these settings.</HelperText>}
            <Fieldset disabled={!canEdit} aria-describedby={canEdit ? undefined : noteId} style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0 }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor={nameId}>Workspace name</Label>
                <TextField>
                  <TextFieldInput id={nameId} name='name' defaultValue='Northwind Studio' />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor={domainId}>Allowed email domain</Label>
                <TextField>
                  <TextFieldInput id={domainId} name='domain' defaultValue='northwind.dev' />
                </TextField>
              </div>
              <Button type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>Save</Button>
            </Fieldset>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: drawer inside a drawer

The address form opens in a second drawer over the order. `Escape` and the backdrop close only the top drawer, and saving the address returns you to the order with the new value.

<!-- example: drawer/nested-drawers.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function NestedDrawers() {
  const orderTitleId = useId();
  const addressTitleId = useId();
  const streetId = useId();
  const cityId = useId();
  const [address, setAddress] = useState({ street: '41 Harbour Road', city: 'Bristol' });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setAddress({ street: String(data.get('street')), city: String(data.get('city')) });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={orderTitleId} style={{ width: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={orderTitleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>Ship to</Text>
            <Text size={3}>{address.street}, {address.city}</Text>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>Change</Button>
            </DrawerTrigger>
            <DrawerContent aria-labelledby={addressTitleId} style={{ width: 360 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={addressTitleId} as='h3' size={4} fontWeight={600}>Shipping address</Heading>
                <DrawerClose asChild>
                  <IconButton
                    aria-label='Close'
                    variant='secondary'
                    appearance='ghost'
                    style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
                  >
                    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                  </IconButton>
                </DrawerClose>
              </div>
              <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                  <Label htmlFor={streetId}>Street</Label>
                  <TextField>
                    <TextFieldInput id={streetId} name='street' defaultValue={address.street} required autoComplete='street-address' />
                  </TextField>
                </div>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                  <Label htmlFor={cityId}>City</Label>
                  <TextField>
                    <TextFieldInput id={cityId} name='city' defaultValue={address.city} required autoComplete='address-level2' />
                  </TextField>
                </div>
                <Button type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>Save address</Button>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

### Edge: start side in right-to-left text

`position='start'` follows the writing direction of `DrawerContent`, like CSS logical properties. The drawer renders into `document.body`, so it takes `dir` from there or from its own `dir` prop: here the button switches it to Arabic and the drawer opens from the right.

<!-- example: drawer/drawer-from-the-start-side.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const sections = {
  ltr: { title: 'Navigation', links: ['Inbox', 'Projects', 'Reports', 'Settings'], toggle: 'Switch to right-to-left' },
  rtl: { title: 'التنقل', links: ['البريد الوارد', 'المشاريع', 'التقارير', 'الإعدادات'], toggle: 'Switch to left-to-right' },
};

export default function DrawerFromTheStartSide() {
  const titleId = useId();
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const [current, setCurrent] = useState(1);

  const section = sections[dir];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <Drawer position='start'>
        <DrawerTrigger asChild>
          <Button>Open navigation</Button>
        </DrawerTrigger>
        <DrawerContent dir={dir} fullHeight aria-labelledby={titleId} style={{ width: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>{section.title}</Heading>
            <DrawerClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DrawerClose>
          </div>
          <nav aria-labelledby={titleId} style={{ display: 'grid', gap: 'var(--spacing-1)', marginBlockStart: 'var(--spacing-8)' }}>
            {section.links.map((link, index) => (
              <DrawerClose asChild key={link}>
                <Button
                  variant='secondary'
                  appearance={index === current ? 'ghost' : 'transparent'}
                  aria-current={index === current ? 'page' : undefined}
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => setCurrent(index)}
                >
                  {link}
                </Button>
              </DrawerClose>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
      <Button variant='secondary' appearance='ghost' onClick={() => setDir(dir === 'ltr' ? 'rtl' : 'ltr')}>{section.toggle}</Button>
    </div>
  );
}
```
<!-- /example -->
