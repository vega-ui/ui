# Dialog Patterns

## Confirm Action

When to use:

- a destructive or high-signal action needs confirmation

Composition notes:

- keep the content short
- use explicit primary and secondary actions
- keep the title consequence-oriented

Trade-offs:

- strong interruption improves safety
- overuse increases friction

<!-- example: dialog/confirm-action.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function ConfirmAction() {
  const titleId = useId();
  const descriptionId = useId();
  const [deleted, setDeleted] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 72,
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {deleted ? (
        <>
          <Text size={3} role='status' style={{ color: 'var(--label-secondary)' }}>Q3 board deck.pdf moved to trash.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setDeleted(false)}>Undo</Button>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>Q3 board deck.pdf</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>4.2 MB · Edited yesterday</Text>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>Delete</Button>
            </DialogTrigger>
            <DialogContent
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              onClose={(event) => setDeleted(event.currentTarget.returnValue === 'delete')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={titleId} as='h2' size={4} fontWeight={600}>Delete Q3 board deck.pdf?</Heading>
                <DialogClose asChild>
                  <IconButton
                    aria-label='Close'
                    variant='secondary'
                    appearance='ghost'
                    style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
                  >
                    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                  </IconButton>
                </DialogClose>
              </div>
              <Text id={descriptionId} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                The file stays in trash for 30 days. Shared links stop working right away.
              </Text>
              <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
                <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Cancel</Button>
                <Button type='submit' value='delete' style={destructive}>Delete file</Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
```
<!-- /example -->

## Form In Modal

When to use:

- a small editing flow should stay on the current page

Composition notes:

- keep the form short
- ensure close and submit remain visible

Trade-offs:

- good for focused edits
- weak fit for long, multi-step forms

<!-- example: dialog/form-in-modal.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
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

export default function FormInModal() {
  const titleId = useId();
  const nameId = useId();
  const slugId = useId();
  const slugHintId = useId();
  const [project, setProject] = useState({ name: 'Mobile banking app', slug: 'mobile-banking' });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setProject({ name: String(data.get('name')), slug: String(data.get('slug')) });
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
        <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{project.name}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>vega.app/{project.slug}</Text>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Rename</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Rename project</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={nameId}>Project name</Label>
              <TextField>
                <TextFieldInput id={nameId} name='name' defaultValue={project.name} required maxLength={60} autoFocus />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={slugId}>URL</Label>
              <TextField>
                <TextFieldInput
                  id={slugId}
                  name='slug'
                  defaultValue={project.slug}
                  required
                  pattern='[a-z0-9-]+'
                  aria-describedby={slugHintId}
                />
              </TextField>
              <HelperText id={slugHintId}>Lowercase letters, digits and hyphens.</HelperText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
              <DialogClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

## Scrollable Modal Content

When to use:

- the content can grow beyond a comfortable modal height

Composition notes:

- give the body a `max-height`, `overflow: auto` and `overscroll-behavior: contain`
- keep the heading and actions outside the scrolling body

Trade-offs:

- preserves modal framing
- requires deliberate layout to avoid trapped content

<!-- example: dialog/scrollable-content-dialog.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const people = ['Ada Lovelace', 'Grace Hopper', 'Linus Torvalds', 'Margaret Hamilton', 'Alan Kay'];
const actions = ['changed the plan to Pro', 'invited a member', 'exported invoices', 'rotated the API key', 'updated billing details'];

const events = Array.from({ length: 40 }, (_, index) => {
  const minutes = 18 * 60 + 55 - index * 7;
  const time = `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

  return { id: index, time, text: `${people[index % people.length]} ${actions[(index * 3) % actions.length]}` };
});

export default function ScrollableContentDialog() {
  const titleId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Activity log</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Activity log</Heading>
          <DialogClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <ol
          tabIndex={0}
          aria-label='Events, newest first'
          style={{
            display: 'grid',
            gap: 'var(--spacing-6)',
            maxHeight: '50vh',
            overflow: 'auto',
            overscrollBehavior: 'contain',
            margin: 'var(--spacing-8) 0 0',
            paddingBlock: 'var(--spacing-6)',
            paddingInline: 0,
            borderBlock: '1px solid var(--separator-opaque)',
            listStyle: 'none',
          }}
        >
          {events.map((event) => (
            <li key={event.id} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-6)' }}>
              <Text size={2} style={{ flexShrink: 0, minWidth: '5ch', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{event.time}</Text>
              <Text size={3}>{event.text}</Text>
            </li>
          ))}
        </ol>
        <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit'>Done</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Nested Confirm Step

When to use:

- a parent modal flow still needs a smaller confirm step

Composition notes:

- treat nested dialogs as an edge case
- retest focus restoration and escape handling

Trade-offs:

- can preserve the parent workflow context
- raises overlay and accessibility complexity quickly

<!-- example: dialog/nested-confirm-step.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function NestedConfirmStep() {
  const memberTitleId = useId();
  const confirmTitleId = useId();
  const [memberOpen, setMemberOpen] = useState(false);
  const [removed, setRemoved] = useState(false);

  const remove = () => {
    setRemoved(true);
    setMemberOpen(false);
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
        <Text size={3} fontWeight={500}>Grace Hopper</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {removed ? 'Removed from the team' : 'Admin · grace@northwind.dev'}
        </Text>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {removed && <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRemoved(false)}>Undo</Button>}
        <Dialog open={memberOpen} onChangeOpen={setMemberOpen}>
          <DialogTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>Manage</Button>
          </DialogTrigger>
          <DialogContent aria-labelledby={memberTitleId}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Heading id={memberTitleId} as='h2' size={4} fontWeight={600}>Grace Hopper</Heading>
              <DialogClose asChild>
                <IconButton
                  aria-label='Close'
                  variant='secondary'
                  appearance='ghost'
                  style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
                >
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </DialogClose>
            </div>
            <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
              grace@northwind.dev · Admin since March 2024
            </Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='secondary' appearance='ghost'>Remove from team…</Button>
                </DialogTrigger>
                <DialogContent aria-labelledby={confirmTitleId}>
                  <Heading id={confirmTitleId} as='h2' size={4} fontWeight={600}>Remove Grace Hopper?</Heading>
                  <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                    She loses access to all team projects. Her files stay in the workspace.
                  </Text>
                  <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
                    <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Keep</Button>
                    <Button type='submit' value='remove' style={destructive} onClick={remove}>Remove</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <DialogClose asChild>
                <Button>Done</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
```
<!-- /example -->
