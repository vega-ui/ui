# Toast: примеры

## Базовый

### Базовый: отмена после архивации разговора

Archive сразу убирает открытый разговор из входящих и показывает следующий, а тост шесть секунд предлагает отмену. Undo — это `ToastClose` с `asChild` вокруг `Button`, поэтому одно нажатие возвращает разговор и убирает тост. То же действие доступно и после того, как тост исчез: архивированный разговор показан ниже с кнопкой Move to inbox, которая заодно закрывает его тост через `queue.close(key)`. Фокус остаётся на Archive, поэтому несколько разговоров подряд можно архивировать без указателя.

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

### Базовый: скопированная ссылка внизу экрана

Copy кладёт ссылку или код для встраивания в буфер обмена и подтверждает это тостом в одну строку, без кнопок, который закрывается сам через две секунды. Область стоит внизу по центру благодаря `placement='bottom'`, поэтому тост закрывается свайпом вниз или вправо, а `limit={1}` показывает по одному тосту: второе копирование ждёт, пока первый тост не уйдёт. Скопированный текст остаётся в поле, так что тост лишь подтверждает то, что страница уже показывает.

<!-- example: toast/copied-at-bottom.tsx -->
```tsx
import { useEffect, type CSSProperties } from 'react';
import { Button, Text, Toast, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

const copyToasts = createToastQueue<string>();

const link = 'https://vega.example/s/launch-plan';
const embed = `<iframe src="${link}/embed" width="640" height="360"></iframe>`;

const field: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: 'var(--spacing-3) var(--spacing-6)',
  background: 'var(--fills-tertiary)',
  borderRadius: 'var(--radius-3)',
  fontFamily: 'var(--code-font-family)',
};

function CopiedToast() {
  const { content } = useToastContext<string>();

  return (
    <Toast style={{ paddingBlock: 'var(--spacing-5)', paddingInlineEnd: 'var(--spacing-8)' }}>
      <Text size={2} fontWeight={500}>{content}</Text>
    </Toast>
  );
}

const copy = (text: string, copied: string) => {
  navigator.clipboard.writeText(text).then(
    () => copyToasts.add(copied, { timeout: 2000 }),
    () => copyToasts.add('Could not copy. Select the text and copy it', { timeout: 4000 }),
  );
};

export default function CopiedAtBottom() {
  useEffect(() => () => {
    for (const toast of copyToasts.toasts) copyToasts.close(toast.key);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-2)' }}>
        <Text size={2} fontWeight={500}>Link</Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Text size={2} style={{ ...field, flex: 1, minWidth: 0 }}>{link}</Text>
          <Button size='xs' variant='secondary' appearance='ghost' onClick={() => copy(link, 'Link copied')}>Copy</Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-2)' }}>
        <Text size={2} fontWeight={500}>Embed code</Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Text size={2} style={{ ...field, flex: 1, minWidth: 0 }}>{embed}</Text>
          <Button size='xs' variant='secondary' appearance='ghost' onClick={() => copy(embed, 'Embed code copied')}>Copy</Button>
        </div>
      </div>
      <ToastRegion queue={copyToasts} aria-label='Notifications' placement='bottom' limit={1}>
        <CopiedToast />
      </ToastRegion>
    </div>
  );
}
```
<!-- /example -->

### Базовый: новое сообщение с аватаром

Сообщение от другого человека приходит, пока пользователь занят другой частью приложения. Шаблон раскладывает `Avatar`, имя, первую строку сообщения и Reply; области всё равно, что лежит в тосте. Reply открывает переписку и ставит фокус в её поле, как и Open в списке переписок, где последнее сообщение видно и после того, как тост ушёл.

<!-- example: toast/new-message.tsx -->
```tsx
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Icon,
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

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

interface Person {
  id: string
  name: string
  initials: string
  photo: string
}

const people: Person[] = [
  { id: 'mira', name: 'Mira Chen', initials: 'MC', photo: portrait(210) },
  { id: 'jonas', name: 'Jonas Berg', initials: 'JB', photo: portrait(30) },
];

const incoming = [
  { from: 'mira', text: 'Can you look at the launch checklist before 3?' },
  { from: 'jonas', text: 'The invoice is approved, sending it out now.' },
  { from: 'mira', text: 'Never mind, I found it in the shared folder.' },
];

interface MessageNotice {
  person: Person
  text: string
  reply: () => void
}

const messageToasts = createToastQueue<MessageNotice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const oneLine: CSSProperties = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

function MessageToast() {
  const { content } = useToastContext<MessageNotice>();
  const titleId = useId();

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Avatar size='sm' style={{ flexShrink: 0 }}>
        <AvatarImage src={content.person.photo} alt='' />
        <AvatarFallback>{content.person.initials}</AvatarFallback>
      </Avatar>
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.person.name}</Text>
        <Text size={2} style={{ ...muted, ...oneLine }}>{content.text}</Text>
      </div>
      <ToastClose asChild onClick={content.reply}>
        <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0 }}>Reply</Button>
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

interface Received {
  person: Person
  text: string
}

export default function NewMessage() {
  const [received, setReceived] = useState<Received[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const reply = useRef<HTMLInputElement>(null);
  const next = incoming[received.length % incoming.length];

  useEffect(() => () => {
    for (const toast of messageToasts.toasts) messageToasts.close(toast.key);
  }, []);

  useEffect(() => {
    if (open) reply.current?.focus();
  }, [open]);

  const openChat = (person: Person) => setOpen(person.id);

  const receive = () => {
    const person = people.find((entry) => entry.id === next.from) ?? people[0];
    setReceived((messages) => [{ person, text: next.text }, ...messages]);
    messageToasts.add({ person, text: next.text, reply: () => openChat(person) }, { timeout: 6000 });
  };

  const openPerson = people.find((person) => person.id === open);
  const lastFrom = (person: Person) => received.find((message) => message.person.id === person.id);

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--spacing-4)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 400,
        padding: 'var(--spacing-4)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInlineStart: 'var(--spacing-4)' }}>
        <Text size={2} fontWeight={500} style={muted}>Messages</Text>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={receive}>Receive a message</Button>
      </div>
      {openPerson ? (
        <div style={{ display: 'grid', gap: 'var(--spacing-4)', padding: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
            <Text size={2} fontWeight={500}>{openPerson.name}</Text>
            <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setOpen(null)}>All chats</Button>
          </div>
          <Text size={2} style={muted}>{lastFrom(openPerson)?.text ?? 'No messages yet'}</Text>
          <TextField size='sm'>
            <TextFieldInput ref={reply} aria-label={`Reply to ${openPerson.name}`} placeholder='Reply…' />
          </TextField>
        </div>
      ) : (
        <ul style={{ display: 'grid', margin: 0, padding: 0, listStyle: 'none' }}>
          {people.map((person) => (
            <li key={person.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', padding: 'var(--spacing-3) var(--spacing-4)' }}>
              <Avatar size='sm' style={{ flexShrink: 0 }}>
                <AvatarImage src={person.photo} alt='' />
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                <Text size={2} fontWeight={500}>{person.name}</Text>
                <Text size={2} style={{ ...muted, ...oneLine }}>{lastFrom(person)?.text ?? 'No messages yet'}</Text>
              </div>
              <Button size='xs' variant='secondary' appearance='ghost' aria-label={`Open chat with ${person.name}`} onClick={() => openChat(person)}>Open</Button>
            </li>
          ))}
        </ul>
      )}
      <ToastRegion queue={messageToasts} aria-label='Notifications'>
        <MessageToast />
      </ToastRegion>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: ошибка загрузки, которая ждёт пользователя

Три файла загружаются в фоне, и один из них не загружается. Строка файла показывает сбой на месте, с кнопкой Retry, для того, кто на неё смотрит; тост сообщает тому, кто занялся другим. Тост — это `role="alert"` без `timeout`, поэтому он остаётся, пока пользователь его не прочитает: Try again повторяет загрузку и закрывает тост, а Retry в строке закрывает тост через `queue.close(key)`.

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

### Контролируемый/с состоянием: деплой, который заканчивается успехом или сбоем

Deploy собирает следующий коммит и показывает тост со `Spinner` и без `timeout`: сборка идёт столько, сколько идёт, поэтому код закрывает тост через `queue.close(key)`, когда она закончилась. Затем он добавляет результат: успех с иконкой галочки, который закрывается через шесть секунд, или сбой с иконкой предупреждения, `role="alert"` и без `timeout`, где Retry — это `ToastClose`, который запускает сборку заново. Тот же повтор остаётся в строке упавшего деплоя кнопкой с иконкой, а бейдж строки показывает статус, поэтому ничего не теряется, когда тост закрывается. Иконки помечены `aria-hidden` и окрашены в цвета `Alert`; что случилось, говорит заголовок. Каждый второй деплой падает, чтобы показать оба исхода.

<!-- example: toast/deploy-status.tsx -->
```tsx
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactElement } from 'react';
import { Badge, Button, Icon, Spinner, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, GitCommitHorizontalIcon, RocketIcon, RotateCwIcon, XIcon } from '@vega-ui/icons';

type Status = 'building' | 'ready' | 'failed';

interface Deployment {
  id: string
  commit: string
  message: string
  status: Status
  time: string
  toast?: string
}

const pending = [
  { commit: '3f2a9c1', message: 'Add the pricing page', fails: false },
  { commit: 'a71d0e4', message: 'Update the search index', fails: true },
  { commit: 'c58b2f7', message: 'Fix the footer links', fails: false },
];

const live: Deployment = { id: 'live', commit: '8b1e0d4', message: 'Translate the changelog', status: 'ready', time: '2h ago' };

type Tone = 'loading' | 'success' | 'error';

interface DeployNotice {
  tone: Tone
  title: string
  description?: string
  action?: { label: string, onAction: () => void }
}

const deployToasts = createToastQueue<DeployNotice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const oneLine: CSSProperties = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const mono: CSSProperties = { fontFamily: 'var(--code-font-family)' };

const icons: Record<Exclude<Tone, 'loading'>, { icon: ReactElement, color: string }> = {
  success: { icon: <CircleCheckIcon />, color: 'var(--color-green-accent-500)' },
  error: { icon: <CircleAlertIcon />, color: 'var(--color-red-accent-500)' },
};

const iconBox: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, alignSelf: 'flex-start', height: 'var(--spacing-12)', marginBlock: 'var(--spacing-2)', marginInlineEnd: 'var(--spacing-2)' };

function ToneIcon({ tone }: { tone: Tone }) {
  if (tone === 'loading') {
    return (
      <span aria-hidden='true' style={iconBox}>
        <Spinner size={3} />
      </span>
    );
  }

  return (
    <span aria-hidden='true' style={{ ...iconBox, color: icons[tone].color }}>
      <Icon size='sm'>{icons[tone].icon}</Icon>
    </span>
  );
}

function DeployToast() {
  const { content } = useToastContext<DeployNotice>();
  const titleId = useId();

  return (
    <Toast
      role={content.tone === 'error' ? 'alert' : 'status'}
      aria-labelledby={titleId}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}
    >
      <ToneIcon tone={content.tone} />
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
        {content.description && <Text size={2} style={muted}>{content.description}</Text>}
        {content.action && (
          <ToastClose asChild onClick={content.action.onAction}>
            <Button size='xs' variant='primary' appearance='ghost' style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>
              {content.action.label}
            </Button>
          </ToastClose>
        )}
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

const badges: Record<Status, { label: string, variant: 'info' | 'success' | 'error' }> = {
  building: { label: 'Building', variant: 'info' },
  ready: { label: 'Ready', variant: 'success' },
  failed: { label: 'Failed', variant: 'error' },
};

export default function DeployStatus() {
  const [deployments, setDeployments] = useState<Deployment[]>([live]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const building = deployments.some((deployment) => deployment.status === 'building');
  const next = pending[(deployments.length - 1) % pending.length];

  useEffect(() => () => {
    for (const timer of timers.current) clearTimeout(timer);
    for (const toast of deployToasts.toasts) deployToasts.close(toast.key);
  }, []);

  const finish = (id: string, status: Status, toast?: string) => {
    setDeployments((current) => current.map((deployment) => (
      deployment.id === id ? { ...deployment, status, time: 'Just now', toast } : deployment
    )));
  };

  const build = (id: string, commit: string, fails: boolean) => {
    const progress = deployToasts.add({ tone: 'loading', title: `Deploying ${commit} to production`, description: 'Building and running the tests…' });

    timers.current.push(setTimeout(() => {
      deployToasts.close(progress);

      if (!fails) {
        deployToasts.add({ tone: 'success', title: 'Deployed to production', description: `vega-docs.app now serves ${commit}.` }, { timeout: 6000 });
        finish(id, 'ready');
        return;
      }

      const failure = deployToasts.add({
        tone: 'error',
        title: 'Deployment failed',
        description: `1 test failed in ${commit}. Production still serves the last ready build.`,
        action: { label: 'Retry', onAction: () => retry(id, commit) },
      });
      finish(id, 'failed', failure);
    }, 2400));
  };

  const retry = (id: string, commit: string) => {
    const deployment = deployments.find((item) => item.id === id);
    if (deployment?.toast) deployToasts.close(deployment.toast);

    setDeployments((current) => current.map((item) => (item.id === id ? { ...item, status: 'building', time: 'Just now', toast: undefined } : item)));
    build(id, commit, false);
  };

  const deploy = () => {
    const id = `${next.commit}-${deployments.length}`;
    setDeployments((current) => [{ id, commit: next.commit, message: next.message, status: 'building', time: 'Just now' }, ...current]);
    build(id, next.commit, next.fails);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', boxSizing: 'border-box', width: '100%', maxWidth: 440 }}>
      <section
        aria-label='Deployments'
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
            <Text size={2} fontWeight={600}>Production</Text>
            <Text size={1} style={{ ...muted, ...oneLine }}>vega-docs.app · main</Text>
          </div>
          <Button size='xs' disabled={building} style={{ flexShrink: 0, gap: 'var(--spacing-2)' }} onClick={deploy}>
            <Icon size='xs'><RocketIcon /></Icon>
            Deploy
          </Button>
        </header>
        <ul style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', margin: 0, padding: 0, listStyle: 'none' }}>
          {deployments.slice(0, 4).map((deployment, index) => (
            <li
              key={deployment.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-6)',
                padding: 'var(--spacing-5) var(--spacing-4) var(--spacing-5) var(--spacing-8)',
                borderTop: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
              }}
            >
              <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-tertiary)' }}><GitCommitHorizontalIcon /></Icon>
              <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                <Text size={2} fontWeight={500} style={oneLine}>{deployment.message}</Text>
                <Text size={1} style={{ ...muted, ...oneLine }}>
                  <span style={mono}>{deployment.commit}</span> · {deployment.time}
                </Text>
              </div>
              {deployment.status === 'failed' && (
                <Button
                  square
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={`Retry ${deployment.commit}`}
                  style={{ flexShrink: 0 }}
                  onClick={() => retry(deployment.id, deployment.commit)}
                >
                  <Icon size='sm'><RotateCwIcon /></Icon>
                </Button>
              )}
              <Badge size='sm' variant={badges[deployment.status].variant} style={{ flexShrink: 0 }}>{badges[deployment.status].label}</Badge>
            </li>
          ))}
        </ul>
      </section>
      <ToastRegion queue={deployToasts} aria-label='Notifications'>
        <DeployToast />
      </ToastRegion>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: экспорт, который показывает прогресс

Export CSV запускает задачу в фоне и показывает тост с её прогрессом. В очереди лежит только id задачи: шаблон читает задачу из вашего собственного хранилища через `useSyncExternalStore`, поэтому тост обновляется без замены. Когда задача готова, код закрывает тост выполнения через `queue.close(key)` и добавляет Export ready с Download, которая остаётся и в Recent exports. Cancel — это `ToastClose`, который останавливает задачу и закрывает тост. Процент помечен `aria-hidden`, чтобы живая область не зачитывала каждый шаг; значение хранит полоса прогресса.

<!-- example: toast/export-progress.tsx -->
```tsx
import { useEffect, useId, useSyncExternalStore, type CSSProperties } from 'react';
import { Button, Progress, ProgressTrack, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

interface ExportJob {
  id: string
  name: string
  progress: number
  status: 'running' | 'done' | 'canceled'
}

const jobs = new Map<string, ExportJob>();
const listeners = new Set<() => void>();
const timers = new Map<string, ReturnType<typeof setInterval>>();
let version = 0;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const update = (job: ExportJob) => {
  jobs.set(job.id, job);
  version += 1;
  for (const listener of listeners) listener();
};

interface ExportNotice {
  kind: 'running' | 'ready'
  jobId: string
}

const exportToasts = createToastQueue<ExportNotice>();

const download = (job: ExportJob) => {
  const url = URL.createObjectURL(new Blob(['Region,Revenue\nEMEA,1200\nAPAC,980\n'], { type: 'text/csv' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${job.name}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
};

const cancel = (jobId: string) => {
  clearInterval(timers.get(jobId));
  const job = jobs.get(jobId);
  if (job) update({ ...job, status: 'canceled' });
};

const startExport = (name: string) => {
  const id = `${name}-${Date.now()}`;
  update({ id, name, progress: 0, status: 'running' });
  const running = exportToasts.add({ kind: 'running', jobId: id });

  timers.set(id, setInterval(() => {
    const job = jobs.get(id);
    if (!job) return;

    const progress = Math.min(100, job.progress + 8 + Math.round(Math.random() * 10));
    if (progress < 100) {
      update({ ...job, progress });
      return;
    }

    clearInterval(timers.get(id));
    update({ ...job, progress, status: 'done' });
    exportToasts.close(running);
    exportToasts.add({ kind: 'ready', jobId: id }, { timeout: 8000 });
  }, 300));
};

const muted: CSSProperties = { color: 'var(--label-secondary)' };

function ExportToast() {
  const { content } = useToastContext<ExportNotice>();
  const job = useSyncExternalStore(subscribe, () => jobs.get(content.jobId), () => undefined);
  const titleId = useId();
  if (!job) return null;

  if (content.kind === 'ready') {
    return (
      <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
          <Text id={titleId} size={2} fontWeight={500}>Export ready</Text>
          <Text size={2} style={muted}>{job.name}.csv</Text>
        </div>
        <ToastClose asChild onClick={() => download(job)}>
          <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0 }}>Download</Button>
        </ToastClose>
      </Toast>
    );
  }

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
          <Text id={titleId} size={2} fontWeight={500}>Exporting {job.name}</Text>
          <Text size={2} aria-hidden style={{ ...muted, fontVariantNumeric: 'tabular-nums' }}>{job.progress}%</Text>
        </div>
        <Progress value={job.progress} size='sm' fullWidth aria-labelledby={titleId}>
          <ProgressTrack />
        </Progress>
      </div>
      <ToastClose asChild onClick={() => cancel(job.id)}>
        <Button size='xs' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>Cancel</Button>
      </ToastClose>
    </Toast>
  );
}

const reports = ['Q3 revenue', 'Active customers'];

export default function ExportProgress() {
  useSyncExternalStore(subscribe, () => version, () => 0);
  const finished = [...jobs.values()].filter((job) => job.status === 'done').reverse();

  useEffect(() => () => {
    for (const timer of timers.values()) clearInterval(timer);
    timers.clear();
    for (const toast of exportToasts.toasts) exportToasts.close(toast.key);
  }, []);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', boxSizing: 'border-box', width: '100%', maxWidth: 420 }}>
      <ul style={{ display: 'grid', gap: 'var(--spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
        {reports.map((report) => (
          <li key={report} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
            <Text size={2} fontWeight={500}>{report}</Text>
            <Button size='xs' variant='secondary' appearance='ghost' onClick={() => startExport(report)}>Export CSV</Button>
          </li>
        ))}
      </ul>
      {finished.length > 0 && (
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Text size={2} fontWeight={500} style={muted}>Recent exports</Text>
          <ul style={{ display: 'grid', gap: 'var(--spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
            {finished.map((job) => (
              <li key={job.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
                <Text size={2}>{job.name}.csv</Text>
                <Button size='xs' variant='primary' appearance='ghost' onClick={() => download(job)}>Download</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ToastRegion queue={exportToasts} aria-label='Exports'>
        <ExportToast />
      </ToastRegion>
    </div>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: тосты над модальным диалогом

Удаление человека в диалоге Share Launch plan показывает тост с отменой, а диалог остаётся открытым. Область переезжает в модальный диалог, поэтому тост оказывается над ним, а Undo можно нажать и сфокусировать; Escape на тосте закрывает только тост, а не диалог. Фокус переходит на следующую кнопку Remove, а человека можно снова пригласить полем сверху.

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

## Пограничный случай

### Пограничный случай: статус, который держится, пока его не закроет код

Go offline или настоящая потеря сети показывает You are offline: тост без `timeout` и без кнопок, потому что пользователь ничего не может с этим сделать. Код сохраняет ключ, который вернул `add()`, и закрывает тост через `queue.close(key)`, когда связь вернулась, а затем на три секунды показывает Back online. Карточка показывает то же состояние на месте, Saved on this device, для пользователя, который на неё смотрит.

<!-- example: toast/connection-status.tsx -->
```tsx
import { useEffect, useId, useState, type CSSProperties } from 'react';
import { Button, Text, Toast, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

interface ConnectionNotice {
  title: string
  description: string
}

const connectionToasts = createToastQueue<ConnectionNotice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };

const announceOnline = () => connectionToasts.add({ title: 'Back online', description: 'Your changes are synced.' }, { timeout: 3000 });

function ConnectionToast() {
  const { content } = useToastContext<ConnectionNotice>();
  const titleId = useId();

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'grid', paddingBlock: 'var(--spacing-6)', paddingInlineEnd: 'var(--spacing-8)' }}>
      <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
      <Text size={2} style={muted}>{content.description}</Text>
    </Toast>
  );
}

export default function ConnectionStatus() {
  const [online, setOnline] = useState(true);

  const disconnect = () => setOnline(false);

  const reconnect = () => {
    setOnline(true);
    announceOnline();
  };

  useEffect(() => {
    if (online) return;

    const offline = connectionToasts.add({ title: 'You are offline', description: 'Changes are kept on this device until the connection is back.' });
    return () => connectionToasts.close(offline);
  }, [online]);

  useEffect(() => {
    const goOffline = () => setOnline(false);
    const goOnline = () => {
      setOnline(true);
      announceOnline();
    };

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
      for (const toast of connectionToasts.toasts) connectionToasts.close(toast.key);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 400,
        padding: 'var(--spacing-6) var(--spacing-6) var(--spacing-6) var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
        <Text size={2} fontWeight={500}>Launch plan</Text>
        <Text size={2} style={muted}>{online ? 'Saved to the cloud' : 'Saved on this device'}</Text>
      </div>
      {online ? (
        <Button size='xs' variant='secondary' appearance='ghost' onClick={disconnect}>Go offline</Button>
      ) : (
        <Button size='xs' variant='primary' appearance='ghost' onClick={reconnect}>Go online</Button>
      )}
      <ToastRegion queue={connectionToasts} aria-label='Connection'>
        <ConnectionToast />
      </ToastRegion>
    </div>
  );
}
```
<!-- /example -->
