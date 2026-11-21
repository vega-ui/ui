# Toast Patterns

## Feedback In Place First

When to use:

- Deciding whether a result needs a toast at all. Following the [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/feedback), show feedback where the user is looking: a saved field, a copied link or a toggled setting answers in place, next to the control. A toast is for things that happen away from the focus of the user: a background upload that fails, a conversation that left the screen, a change made by someone else.

Composition notes:

- Answer in place first, like a "Copied" label on the button, a status text under the field or the row that moves to an "Archived" list.
- Add a toast when the result of an action leaves the screen or comes later, and the user may have moved on: the toast is the second channel, not the only one.
- Keep the text short: a title of a few words, and a description only when it tells something the title does not.

Trade-offs:

- A toast is easy to add and easy to miss: it appears in a corner, it may close by itself, and many toasts in a row teach the user to ignore them. Fewer, meaningful toasts keep their value.

## Actions That Are Reachable Elsewhere

When to use:

- A toast has an action, like Undo, Try again or View. A toast can time out, be swiped away or never be seen, and a user who needs more time than the timeout gives cannot reach it ([WCAG 2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable)). Every action in a toast must also be reachable another way.

Composition notes:

- Render the action as a `ToastClose` with `asChild` around a `Button` with `size='xs'`, so it runs and dismisses the toast in one press.
- Keep the same action in the page: an "Archived" list with "Move to inbox", Retry in the row of a failed upload, a field that invites a removed person again.
- When that other way is used, close the toast with `queue.close(key)`, with the key `add()` returned, so the toast does not offer an action that no longer makes sense.

Trade-offs:

- The second way takes space in the page, but without it the action is lost for keyboard and screen reader users, and for everyone who looked away.

<!-- example: toast/undo-archive.tsx -->
```tsx
import { useEffect, useId, useState, type CSSProperties } from 'react';
import { Avatar, AvatarFallback, Button, Heading, Icon, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';
import { ArchiveIcon, InboxIcon, XIcon } from '@vega-ui/icons';

interface Conversation {
  id: string
  from: string
  initials: string
  email: string
  subject: string
  body: string
  time: string
}

const conversations: Conversation[] = [
  {
    id: 'roadmap',
    from: 'Mira Chen',
    initials: 'MC',
    email: 'mira@northwind.studio',
    subject: 'Q3 roadmap review',
    body: 'I moved the review to Thursday at 10:00 so the design team can join. The agenda is in the shared doc.',
    time: '9:41',
  },
  {
    id: 'invoice',
    from: 'Jonas Berg',
    initials: 'JB',
    email: 'jonas@berg.finance',
    subject: 'Invoice #2026-118',
    body: 'Attached is the invoice for October. Payment is due in 14 days, the bank details have not changed.',
    time: '8:15',
  },
  {
    id: 'offsite',
    from: 'Ana Souza',
    initials: 'AS',
    email: 'ana@northwind.studio',
    subject: 'Offsite venue options',
    body: 'Three places are free in March. The lake house fits all of us and has a room for workshops.',
    time: 'Mon',
  },
];

interface ArchivedNotice {
  subject: string
  undo: () => void
}

const archiveToasts = createToastQueue<ArchivedNotice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const oneLine: CSSProperties = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const quiet = { variant: 'secondary', appearance: 'transparent' } as const;

const card: CSSProperties = {
  display: 'grid',
  background: 'var(--surface-primary)',
  border: '1px solid var(--separator-opaque)',
  borderRadius: 'var(--radius-5)',
  overflow: 'hidden',
};

function ArchivedToast() {
  const { content } = useToastContext<ArchivedNotice>();
  const titleId = useId();

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>Conversation archived</Text>
        <Text size={2} style={{ ...muted, ...oneLine }}>{content.subject}</Text>
      </div>
      <ToastClose asChild onClick={content.undo}>
        <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0 }}>Undo</Button>
      </ToastClose>
      <ToastClose asChild>
        <Button
          square
          size='xs'
          aria-label='Dismiss'
          variant='secondary'
          appearance='ghost'
          style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

interface Archived {
  id: string
  toast: string
}

export default function UndoArchive() {
  const [archived, setArchived] = useState<Archived[]>([]);
  const archivedHeadingId = useId();
  const isArchived = (id: string) => archived.some((entry) => entry.id === id);
  const inbox = conversations.filter((conversation) => !isArchived(conversation.id));
  const current = inbox.at(0);

  useEffect(() => () => {
    for (const toast of archiveToasts.toasts) archiveToasts.close(toast.key);
  }, []);

  const restore = (id: string) => setArchived((entries) => entries.filter((entry) => entry.id !== id));

  const archive = (conversation: Conversation) => {
    const toast = archiveToasts.add({ subject: conversation.subject, undo: () => restore(conversation.id) }, { timeout: 6000 });
    setArchived((entries) => [{ id: conversation.id, toast }, ...entries]);
  };

  const moveToInbox = (entry: Archived) => {
    archiveToasts.close(entry.toast);
    restore(entry.id);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-8)', boxSizing: 'border-box', width: '100%', maxWidth: 420 }}>
      <article style={card}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-6)',
            padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
            borderBottom: '1px solid var(--separator-opaque)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-3)' }}>
            <Text size={2} fontWeight={600}>Inbox</Text>
            <Text size={1} style={{ ...muted, fontVariantNumeric: 'tabular-nums' }}>{inbox.length} of {conversations.length}</Text>
          </div>
          <Button size='xs' {...quiet} disabled={!current} style={{ gap: 'var(--spacing-2)' }} onClick={() => current && archive(current)}>
            <Icon size='xs'><ArchiveIcon /></Icon>
            Archive
          </Button>
        </header>
        {current ? (
          <div style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-6)', minHeight: 168, padding: 'var(--spacing-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-5)' }}>
              <Avatar size='sm' style={{ flexShrink: 0 }}>
                <AvatarFallback>{current.initials}</AvatarFallback>
              </Avatar>
              <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                <Text size={2} fontWeight={500} style={oneLine}>{current.from}</Text>
                <Text size={1} style={{ ...muted, ...oneLine }}>{current.email}</Text>
              </div>
              <Text size={1} style={{ ...muted, flexShrink: 0 }}>{current.time}</Text>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
              <Heading as='h3' size={3} fontWeight={600}>{current.subject}</Heading>
              <Text size={2} style={muted}>{current.body}</Text>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', placeItems: 'center', alignContent: 'center', gap: 'var(--spacing-3)', minHeight: 168, padding: 'var(--spacing-8)', textAlign: 'center' }}>
            <Icon size='md' style={{ color: 'var(--label-tertiary)' }}><InboxIcon /></Icon>
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={2} fontWeight={500}>You are all caught up</Text>
              <Text size={1} style={muted}>Archived conversations wait below.</Text>
            </div>
          </div>
        )}
      </article>
      {archived.length > 0 && (
        <section aria-labelledby={archivedHeadingId} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Text id={archivedHeadingId} size={1} fontWeight={500} style={{ ...muted, paddingInline: 'var(--spacing-8)' }}>Archived</Text>
          <ul style={{ ...card, margin: 0, padding: 0, listStyle: 'none' }}>
            {archived.map((entry, index) => {
              const conversation = conversations.find((item) => item.id === entry.id);
              if (!conversation) return null;

              return (
                <li
                  key={entry.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-6)',
                    padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
                    borderTop: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
                  }}
                >
                  <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                    <Text size={2} fontWeight={500} style={oneLine}>{conversation.subject}</Text>
                    <Text size={1} style={{ ...muted, ...oneLine }}>{conversation.from}</Text>
                  </div>
                  <Button size='xs' {...quiet} style={{ flexShrink: 0 }} onClick={() => moveToInbox(entry)}>
                    Move to inbox
                  </Button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <ToastRegion queue={archiveToasts} aria-label='Notifications'>
        <ArchivedToast />
      </ToastRegion>
    </div>
  );
}
```
<!-- /example -->

## Choosing Timeouts

When to use:

- Every `add()`: the queue has no default timeout, and a toast without `timeout` stays until it is closed.

Composition notes:

- A short message without an action: about 4 to 6 seconds, longer for longer text.
- A toast with an action, like Undo: long enough to read it and reach the action, 6 to 10 seconds.
- An error, or anything the user must act on: no `timeout`, and `role="alert"` on `Toast`. It stays until the user closes it, retries or fixes the cause.
- The timers already wait for the user: see [Timers That Wait For The User](#timers-that-wait-for-the-user).

Trade-offs:

- A long timeout keeps a stale toast on the screen; a short one hides it before it is read. When in doubt, choose the longer one, since the user can always swipe it away or close it.

## Errors That Wait For The User

When to use:

- A failure the user did not see happen, like an upload in the background, a sync or a save that runs after the user left the screen.

Composition notes:

- Show the failure in place too, like a red "Failed" with Retry in the row of the file.
- Add the toast without `timeout`, with `role="alert"` and an `aria-labelledby` that points at its title.
- Put the recovery action, like Try again, into the toast as a `ToastClose`, and close the toast with `queue.close(key)` when the user retries from the row.

Trade-offs:

- An alert interrupts the screen reader, so keep it for what is urgent; news that can wait stays a `role="status"`.

<!-- example: toast/upload-error.tsx -->
```tsx
import { useEffect, useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Icon,
  Progress,
  ProgressTrack,
  Text,
  Toast,
  ToastClose,
  ToastRegion,
  createToastQueue,
  useToastContext,
} from '@vega-ui/react';
import { CircleAlertIcon, FileImageIcon, FileSpreadsheetIcon, FileTextIcon, RotateCwIcon, UploadIcon, XIcon } from '@vega-ui/icons';

type Status = 'waiting' | 'uploading' | 'done' | 'failed';

interface Upload {
  name: string
  size: string
  kind: 'text' | 'sheet' | 'image'
  progress: number
  status: Status
  failAt?: number
  toast?: string
}

const files: Upload[] = [
  { name: 'Brand guidelines.pdf', size: '4.2 MB', kind: 'text', progress: 0, status: 'waiting' },
  { name: 'Budget 2027.xlsx', size: '1.1 MB', kind: 'sheet', progress: 0, status: 'waiting', failAt: 60 },
  { name: 'Team photo.jpg', size: '2.8 MB', kind: 'image', progress: 0, status: 'waiting' },
];

const kinds = {
  text: { icon: <FileTextIcon />, color: 'var(--color-red-accent-500)' },
  sheet: { icon: <FileSpreadsheetIcon />, color: 'var(--color-green-accent-500)' },
  image: { icon: <FileImageIcon />, color: 'var(--color-amber-accent-500)' },
};

interface UploadError {
  file: string
  retry: () => void
}

const uploadToasts = createToastQueue<UploadError>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const oneLine: CSSProperties = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const quiet = { variant: 'secondary', appearance: 'transparent' } as const;

function UploadErrorToast() {
  const { content } = useToastContext<UploadError>();
  const titleId = useId();

  return (
    <Toast role='alert' aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <span
        aria-hidden='true'
        style={{
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          alignSelf: 'flex-start',
          height: 'var(--spacing-12)',
          marginBlock: 'var(--spacing-2)',
          marginInlineEnd: 'var(--spacing-2)',
          color: 'var(--color-red-accent-500)',
        }}
      >
        <Icon size='sm'><CircleAlertIcon /></Icon>
      </span>
      <div style={{ display: 'grid', gap: 'var(--spacing-4)', flex: 1, minWidth: 0, paddingBlockStart: 'var(--spacing-2)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
          <Text id={titleId} size={2} fontWeight={500}>{content.file} was not uploaded</Text>
          <Text size={2} style={muted}>The connection dropped. Your other files are uploaded.</Text>
        </div>
        <ToastClose asChild onClick={content.retry}>
          <Button size='xs' variant='primary' appearance='ghost' style={{ justifySelf: 'start' }}>
            Try again
          </Button>
        </ToastClose>
      </div>
      <ToastClose asChild>
        <Button
          square
          size='xs'
          aria-label='Dismiss'
          variant='secondary'
          appearance='ghost'
          style={{ flexShrink: 0, alignSelf: 'flex-start', marginBlock: 'var(--spacing-2)', '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

const advance = (upload: Upload): Upload => {
  if (upload.status !== 'uploading') return upload;

  const progress = Math.min(100, upload.progress + 8);
  if (upload.failAt !== undefined && progress >= upload.failAt) return { ...upload, progress: upload.failAt, status: 'failed', failAt: undefined };
  if (progress === 100) return { ...upload, progress, status: 'done' };

  return { ...upload, progress };
};

const retrying = (name: string) => (current: Upload[]) => current.map((upload): Upload => (
  upload.name === name ? { ...upload, status: 'uploading', toast: undefined } : upload
));

const statusText = (upload: Upload) => {
  if (upload.status === 'waiting') return `${upload.size} · Waiting`;
  if (upload.status === 'done') return `${upload.size} · Uploaded`;
  if (upload.status === 'failed') return `Failed at ${upload.progress}% · Connection lost`;

  return `${upload.size} · ${upload.progress}%`;
};

export default function UploadErrorExample() {
  const [uploads, setUploads] = useState(files);
  const busy = uploads.some((upload) => upload.status === 'uploading');
  const fresh = uploads.every((upload) => upload.status === 'waiting');

  const retry = (upload: Upload) => {
    if (upload.toast) uploadToasts.close(upload.toast);
    setUploads(retrying(upload.name));
  };

  useEffect(() => {
    if (!busy) return;

    const timer = setTimeout(() => {
      const next = uploads.map(advance).map((upload, index) => {
        if (upload.status !== 'failed' || uploads[index].status === 'failed') return upload;

        return { ...upload, toast: uploadToasts.add({ file: upload.name, retry: () => setUploads(retrying(upload.name)) }) };
      });
      setUploads(next);
    }, 140);

    return () => clearTimeout(timer);
  }, [busy, uploads]);

  const start = () => {
    for (const upload of uploads) if (upload.toast) uploadToasts.close(upload.toast);
    setUploads(files.map((upload) => ({ ...upload, status: 'uploading' })));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', boxSizing: 'border-box', width: '100%', maxWidth: 420 }}>
      <section
        aria-label='Project files'
        style={{ display: 'grid', background: 'var(--surface-primary)', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-5)', overflow: 'hidden' }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-6)',
            padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
            borderBottom: '1px solid var(--separator-opaque)',
          }}
        >
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={2} fontWeight={600}>Project files</Text>
            <Text size={1} style={muted}>3 files · 8.1 MB</Text>
          </div>
          <Button size='xs' disabled={busy} style={{ flexShrink: 0, gap: 'var(--spacing-2)' }} onClick={start}>
            <Icon size='xs'><UploadIcon /></Icon>
            {fresh ? 'Upload 3 files' : 'Upload again'}
          </Button>
        </header>
        <ul style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', margin: 0, padding: 0, listStyle: 'none' }}>
          {uploads.map((upload, index) => {
            const failed = upload.status === 'failed';
            const kind = kinds[upload.kind];

            return (
              <li
                key={upload.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-6)',
                  padding: 'var(--spacing-6) var(--spacing-4) var(--spacing-6) var(--spacing-8)',
                  borderTop: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
                }}
              >
                <span
                  aria-hidden='true'
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-3)',
                    color: kind.color,
                    background: `color-mix(in oklch, ${kind.color} 14%, transparent)`,
                  }}
                >
                  <Icon size='sm'>{kind.icon}</Icon>
                </span>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'grid' }}>
                    <Text size={2} fontWeight={500} style={oneLine}>{upload.name}</Text>
                    <Text size={1} style={{ ...oneLine, fontVariantNumeric: 'tabular-nums', color: failed ? 'var(--color-error)' : 'var(--label-secondary)' }}>
                      {statusText(upload)}
                    </Text>
                  </div>
                  <Progress
                    value={upload.progress}
                    valueText={failed ? `Failed at ${upload.progress}%` : `${upload.progress}%`}
                    aria-label={upload.name}
                    size='sm'
                    fullWidth
                    style={failed ? { '--progress-track-color': 'var(--color-error)' } as CSSProperties : undefined}
                  >
                    <ProgressTrack />
                  </Progress>
                </div>
                <div style={{ display: 'grid', placeItems: 'center', flexShrink: 0, width: 32 }}>
                  {failed && (
                    <Button square size='xs' {...quiet} aria-label={`Retry ${upload.name}`} onClick={() => retry(upload)}>
                      <Icon size='sm'><RotateCwIcon /></Icon>
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <ToastRegion queue={uploadToasts} aria-label='Notifications'>
        <UploadErrorToast />
      </ToastRegion>
    </div>
  );
}
```
<!-- /example -->

## Timers That Wait For The User

When to use:

- Always: the region pauses the timers itself, and this pattern only explains when.

Composition notes:

- The timers pause while the pointer is on the toasts and while the focus is inside them, so reading a toast or reaching its action never runs out the time.
- They also pause while the window has no focus and while the tab is hidden, and run on with the time they had left when the user comes back. A page that is not in use keeps its toasts: a page in another tab, or in an iframe without the focus, like a docs preview or an embedded widget, shows its toasts once the user returns to it.
- A toast that waits beyond `limit`, or that newer toasts pushed back, keeps the time it had left until it is shown again.

Trade-offs:

- A toast added while the user is away waits for them, which is what makes a timeout safe; a toast that only matters at a certain moment, like "Your call starts now", may need to be closed by your code with `queue.close(key)` once it is stale.

## Limit And Swipe Directions

When to use:

- Toasts can come in bursts, or the swipe that closes a toast should follow the place of the region.

Composition notes:

- `limit` (3 by default) is how many of the newest toasts are shown at once. The older ones wait with their timers paused and move in as shown toasts close. Keep it small: the deck shows the front toast, and the others peek from behind it until the pointer or the focus expands it.
- `swipeDirections` are the directions a swipe closes a toast in. By default that is up, toward the edge it came from (down at the bottom), and toward the side edge it sits at: right at the end, left at the start, and the other way around in a right-to-left page; a centered toast goes toward the end edge. A swipe in another direction resists and springs back. A swipe closes the toast when it goes past half the size of the toast or is thrown fast enough.
- Pass `swipeDirections={['up']}` when a horizontal swipe should stay with the page, like in a carousel of cards under the region.

Trade-offs:

- A higher `limit` shows more at once but makes the deck tall and noisy; a lower one delays the older toasts, so do not give them a short timeout.

## A Hotkey To The Newest Toast

When to use:

- Toasts have actions, and keyboard users need a fast way to reach them. No hotkey is built in, since F6, F8 and Alt+T each mean something else in some browsers, screen readers and apps: choose one that is free in yours.

Composition notes:

- Pass a `ref` to `ToastRegion`, listen to `keydown` on `document`, and on your key focus the first focusable element of the front toast, `[data-front="true"]`.
- Call `preventDefault()` only when there is a toast to focus, so the key keeps its default otherwise.
- Tell the users about the key, like in the `aria-label` of the region and in a hint. Once the focus is in the toasts, the timers pause, Tab moves through the buttons, Escape closes the focused toast, and the focus goes back where it was after the last toast closes.
- For Alt+T, compare `event.code === 'KeyT'` with `event.altKey`: on macOS `event.key` is "†" with Option held.

Trade-offs:

- A global key can clash with the shortcuts of the app, the browser or a screen reader; let the users change it, or turn it off, when the app has shortcuts of its own.

<!-- example: toast/hotkey.tsx -->
```tsx
import { useEffect, useId, useRef, type CSSProperties } from 'react';
import { Button, Icon, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const FOCUSABLE = 'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])';

interface Reminder {
  title: string
  time: string
}

const reminders = createToastQueue<Reminder>();

function ReminderToast() {
  const { content } = useToastContext<Reminder>();
  const titleId = useId();

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{content.time}</Text>
      </div>
      <ToastClose asChild>
        <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0 }}>Join</Button>
      </ToastClose>
      <ToastClose asChild>
        <Button
          square
          size='xs'
          aria-label='Dismiss'
          variant='secondary'
          appearance='ghost'
          style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

export default function Hotkey() {
  const region = useRef<HTMLElement>(null);

  useEffect(() => {
    const focusNewest = (event: KeyboardEvent) => {
      if (event.key !== 'F8') return;

      const newest = region.current?.querySelector('[data-front="true"]');
      const target = newest?.querySelector<HTMLElement>(FOCUSABLE);
      if (!target) return;

      event.preventDefault();
      target.focus();
    };

    document.addEventListener('keydown', focusNewest);
    return () => document.removeEventListener('keydown', focusNewest);
  }, []);

  return (
    <>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <Button size='xs' onClick={() => reminders.add({ title: 'Design review', time: 'Starts in 5 minutes' }, { timeout: 10000 })}>
          Remind me
        </Button>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          Press <kbd>F8</kbd> to move to the newest notification
        </Text>
      </div>
      <ToastRegion ref={region} queue={reminders} aria-label='Notifications, F8'>
        <ReminderToast />
      </ToastRegion>
    </>
  );
}
```
<!-- /example -->

## Toasts Over A Modal Dialog

When to use:

- A toast can appear while a modal `Dialog`, `Drawer` or `Sheet` is open, like the Undo of an action taken inside the dialog.

Composition notes:

- Nothing to do: when a modal `<dialog>` opens, the region moves into it and back to the end of `<body>` when it closes, so the toasts stay above the dialog, and the user can press and focus them while the page behind the dialog is inert.
- Escape on a focused toast closes only the toast; the dialog stays open.
- A swipe or a click on a toast does not close a dialog with `closedBy='any'`.

Trade-offs:

- The toast covers a corner of the dialog for a while; keep the controls of a narrow dialog away from the top-right corner on small screens, where the region spans the top.

<!-- example: toast/toasts-over-dialog.tsx -->
```tsx
import { useId, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Avatar,
  AvatarFallback,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  Label,
  Text,
  TextField,
  TextFieldInput,
  Toast,
  ToastClose,
  ToastRegion,
  createToastQueue,
  useToastContext,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

interface Person {
  name: string
  email: string
}

const team: Person[] = [
  { name: 'Mira Chen', email: 'mira@northwind.studio' },
  { name: 'Jonas Berg', email: 'jonas@northwind.studio' },
  { name: 'Ana Souza', email: 'ana@northwind.studio' },
];

interface Removed {
  name: string
  undo: () => void
}

const accessToasts = createToastQueue<Removed>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const closeStyle = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;

const initialsOf = (name: string) => name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

function RemovedToast() {
  const { content } = useToastContext<Removed>();
  const titleId = useId();

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.name} removed</Text>
        <Text size={2} style={muted}>No longer has access</Text>
      </div>
      <ToastClose asChild onClick={content.undo}>
        <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0 }}>Undo</Button>
      </ToastClose>
      <ToastClose asChild>
        <Button square size='xs' aria-label='Dismiss' variant='secondary' appearance='ghost' style={closeStyle}>
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

export default function ToastsOverDialog() {
  const id = useId();
  const [people, setPeople] = useState(team);
  const removeButtons = useRef(new Map<string, HTMLButtonElement>());
  const inviteRef = useRef<HTMLInputElement>(null);

  const add = (person: Person) => setPeople((current) => (current.some((item) => item.email === person.email) ? current : [...current, person]));

  const remove = (person: Person, index: number) => {
    const next = people[index + 1] ?? people[index - 1];
    setPeople((current) => current.filter((item) => item.email !== person.email));
    accessToasts.add({ name: person.name, undo: () => add(person) }, { timeout: 8000 });

    if (next) removeButtons.current.get(next.email)?.focus();
    else inviteRef.current?.focus();
  };

  const invite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email')).trim().toLowerCase();
    if (email === '') return;

    const known = team.find((person) => person.email === email);
    add(known ?? { name: email.split('@')[0], email });
    event.currentTarget.reset();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='xs' variant='secondary' appearance='ghost'>Share</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`} style={{ width: 'min(420px, 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Share Launch plan</Heading>
            <DialogClose asChild>
              <Button square aria-label='Close' variant='secondary' appearance='ghost' style={closeStyle}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </DialogClose>
          </div>
          <form onSubmit={invite} style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={`${id}-email`}>Add people</Label>
            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
              <TextField size='sm' style={{ flex: 1, minWidth: 0 }}>
                <TextFieldInput ref={inviteRef} id={`${id}-email`} name='email' type='email' placeholder='name@northwind.studio' autoComplete='off' />
              </TextField>
              <Button type='submit' size='sm'>Invite</Button>
            </div>
          </form>
          <Text id={`${id}-access`} size={2} fontWeight={500} style={{ ...muted, display: 'block', marginBlock: 'var(--spacing-12) var(--spacing-4)' }}>
            People with access
          </Text>
          <ul aria-labelledby={`${id}-access`} style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none' }}>
            {people.map((person, index) => (
              <li key={person.email} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                <Avatar size='sm' aria-hidden>
                  <AvatarFallback>{initialsOf(person.name)}</AvatarFallback>
                </Avatar>
                <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                  <Text size={2} fontWeight={500}>{person.name}</Text>
                  <Text size={2} style={{ ...muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{person.email}</Text>
                </div>
                <Button
                  ref={(node) => {
                    if (node) removeButtons.current.set(person.email, node);
                    else removeButtons.current.delete(person.email);
                  }}
                  size='xs'
                  variant='secondary'
                  appearance='ghost'
                  aria-label={`Remove ${person.name}`}
                  style={{ flexShrink: 0 }}
                  onClick={() => remove(person, index)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
      <ToastRegion queue={accessToasts} aria-label='Notifications'>
        <RemovedToast />
      </ToastRegion>
    </>
  );
}
```
<!-- /example -->

## Motion And Reduced Motion

When to use:

- Always: the motion is built into the styles of the parts.

Composition notes:

- A new toast slides in from the top with a spring, the older ones scale down behind it into a deck, and the deck expands into a list while the pointer or the focus is on it. A swipe follows the finger and is thrown out with the speed it had.
- With `prefers-reduced-motion: reduce`, the toasts only fade in and out: no slide, no scale, no throw. The deck keeps its layout.

Trade-offs:

- A custom template keeps the motion as long as `Toast` stays its root and its `translate`, `scale` and `transition` are not overridden; see [Styling](./styling.md#do-not-override).

## Focus After A Toast Closes

When to use:

- A keyboard user moves into the toasts, with Tab, with a hotkey or from a screen reader, and closes one.

Composition notes:

- When the focused toast closes, by Escape, a `ToastClose` or a swipe, the focus moves into the next toast, to its first focusable element.
- When the last toast closes, the focus goes back to the element that had it before the focus entered the toasts, like the Archive button.
- Your code does not need to move the focus; a `ToastClose` with an action, like Undo, can still move it somewhere else when the action asks for it.

Trade-offs:

- The focus never jumps into a toast by itself: a new toast does not take the focus, so the user is not interrupted, and keyboard users reach the toasts by Tab order at the end of the page or by a hotkey.
