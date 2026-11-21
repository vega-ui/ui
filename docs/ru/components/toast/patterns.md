# Toast: паттерны

## Сначала обратная связь на месте

Когда использовать:

- Когда решаете, нужен ли результату тост вообще. По [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/feedback) обратную связь показывают там, куда смотрит пользователь: сохранённое поле, скопированная ссылка или переключённая настройка отвечают на месте, рядом с контролом. Тост — для того, что происходит вдали от фокуса пользователя: фоновая загрузка, которая не удалась, разговор, который ушёл с экрана, изменение, сделанное кем-то другим.

Заметки о композиции:

- Сначала отвечайте на месте: подпись «Скопировано» на кнопке, текст статуса под полем или строка, которая переехала в список архивных.
- Добавляйте тост, когда результат действия уходит с экрана или приходит позже, а пользователь мог заняться другим: тост — второй канал, а не единственный.
- Пишите коротко: заголовок в несколько слов, а описание — только если оно говорит то, чего нет в заголовке.

Компромиссы:

- Тост легко добавить и легко пропустить: он появляется в углу, может закрыться сам, а много тостов подряд приучают пользователя их не замечать. Меньше, но по делу — так тосты сохраняют ценность.

## Действия, доступные и в другом месте

Когда использовать:

- У тоста есть действие, например Undo, Try again или View. Тост может закрыться по таймауту, уйти свайпом или остаться незамеченным, а пользователь, которому нужно больше времени, чем даёт таймаут, до него не доберётся ([WCAG 2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable)). Каждое действие тоста должно быть доступно и другим путём.

Заметки о композиции:

- Рендерите действие как `ToastClose` с `asChild` вокруг `Button` с `size='xs'`, чтобы одно нажатие выполняло его и убирало тост.
- Оставьте то же действие на странице: список архивных с Move to inbox, Retry в строке неудачной загрузки, поле, которым удалённого человека можно пригласить снова.
- Когда пользователь выбирает этот другой путь, закройте тост через `queue.close(key)` с ключом, который вернул `add()`, чтобы тост не предлагал действие, которое уже не имеет смысла.

Компромиссы:

- Второй путь занимает место на странице, но без него действие теряется для пользователей клавиатуры и скринридеров и для всех, кто отвлёкся.

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

## Выбор таймаута

Когда использовать:

- При каждом `add()`: у очереди нет таймаута по умолчанию, и тост без `timeout` остаётся, пока его не закроют.

Заметки о композиции:

- Короткое сообщение без действия: примерно 4–6 секунд, для длинного текста дольше.
- Тост с действием, например Undo: столько, чтобы его прочитать и дотянуться до действия, 6–10 секунд.
- Ошибка или что-то, на что пользователь должен отреагировать: без `timeout` и с `role="alert"` у `Toast`. Такой тост остаётся, пока пользователь его не закроет, не повторит или не устранит причину.
- Таймеры и так ждут пользователя: см. [Таймеры, которые ждут пользователя](#таймеры-которые-ждут-пользователя).

Компромиссы:

- Длинный таймаут держит на экране устаревший тост, короткий прячет его до того, как его прочитают. Если сомневаетесь, выбирайте длинный: пользователь всегда может смахнуть тост или закрыть его.

## Ошибки, которые ждут пользователя

Когда использовать:

- Сбой, которого пользователь не видел: загрузка в фоне, синхронизация или сохранение, которое идёт после того, как пользователь ушёл с экрана.

Заметки о композиции:

- Показывайте сбой и на месте, например красное Failed с Retry в строке файла.
- Добавляйте тост без `timeout`, с `role="alert"` и `aria-labelledby`, указывающим на его заголовок.
- Положите в тост действие восстановления, например Try again, как `ToastClose`, а когда пользователь повторяет из строки, закройте тост через `queue.close(key)`.

Компромиссы:

- Alert прерывает скринридер, поэтому оставьте его для срочного; новости, которые могут подождать, остаются `role="status"`.

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

## Таймеры, которые ждут пользователя

Когда использовать:

- Всегда: область сама ставит таймеры на паузу, а этот паттерн только объясняет когда.

Заметки о композиции:

- Таймеры встают на паузу, пока указатель на тостах и пока фокус внутри них, поэтому время не кончается, пока тост читают или тянутся к его действию.
- Ещё они встают на паузу, пока у окна нет фокуса и пока вкладка скрыта, и продолжают с оставшимся временем, когда пользователь возвращается. Страница, которой не пользуются, сохраняет свои тосты: страница в другой вкладке или в iframe без фокуса, например превью документации или встроенный виджет, показывает тосты, когда пользователь к ней вернётся.
- Тост, который ждёт сверх `limit` или который отодвинули более новые, сохраняет оставшееся время, пока его снова не покажут.

Компромиссы:

- Тост, добавленный, пока пользователя нет, его дождётся — именно это делает таймаут безопасным; а тост, который важен только в определённый момент, например «Звонок начинается», возможно, стоит закрыть вашим кодом через `queue.close(key)`, когда он устарел.

## Лимит и направления свайпа

Когда использовать:

- Тосты могут приходить пачками, или свайп, который закрывает тост, должен соответствовать месту области.

Заметки о композиции:

- `limit` (по умолчанию 3) — сколько самых новых тостов видно одновременно. Более старые ждут с таймерами на паузе и подтягиваются, когда показанные закрываются. Держите его небольшим: колода показывает передний тост, а остальные выглядывают из-за него, пока указатель или фокус её не раскроют.
- `swipeDirections` — направления, в которых свайп закрывает тост. По умолчанию это вверх, к краю, откуда он пришёл (внизу — вниз), и к боковому краю, у которого он стоит: вправо в конце строки, влево в начале, а на странице справа налево наоборот; тост по центру уходит к концу строки. Свайп в другом направлении сопротивляется и пружинит обратно. Свайп закрывает тост, когда проходит больше половины размера тоста или брошен достаточно быстро.
- Передайте `swipeDirections={['up']}`, когда горизонтальный свайп должен оставаться у страницы, например у карусели карточек под областью.

Компромиссы:

- Больший `limit` показывает больше сразу, но делает колоду высокой и шумной; меньший задерживает старые тосты, поэтому не давайте им короткий таймаут.

## Горячая клавиша к новейшему тосту

Когда использовать:

- У тостов есть действия, и пользователям клавиатуры нужен быстрый путь к ним. Встроенной горячей клавиши нет, потому что F6, F8 и Alt+T что-то значат в некоторых браузерах, скринридерах и приложениях: выберите ту, что свободна у вас.

Заметки о композиции:

- Передайте `ref` в `ToastRegion`, слушайте `keydown` на `document` и по своей клавише переводите фокус на первый фокусируемый элемент переднего тоста, `[data-front="true"]`.
- Вызывайте `preventDefault()`, только когда есть тост, на который можно перевести фокус, чтобы иначе клавиша работала как обычно.
- Расскажите пользователям о клавише, например в `aria-label` области и в подсказке. Когда фокус в тостах, таймеры на паузе, Tab идёт по кнопкам, Escape закрывает тост в фокусе, а после закрытия последнего тоста фокус возвращается туда, где был.
- Для Alt+T сравнивайте `event.code === 'KeyT'` вместе с `event.altKey`: на macOS с зажатым Option `event.key` равен «†».

Компромиссы:

- Глобальная клавиша может конфликтовать с сочетаниями приложения, браузера или скринридера; если у приложения есть свои сочетания, дайте пользователям её поменять или выключить.

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

## Тосты над модальным диалогом

Когда использовать:

- Тост может появиться, пока открыт модальный `Dialog`, `Drawer` или `Sheet`, например отмена действия, сделанного внутри диалога.

Заметки о композиции:

- Ничего делать не нужно: когда открывается модальный `<dialog>`, область переезжает в него, а когда он закрывается — обратно в конец `<body>`, поэтому тосты остаются над диалогом, и пользователь может нажимать их и переводить на них фокус, пока страница за диалогом инертна.
- Escape на тосте в фокусе закрывает только тост; диалог остаётся открытым.
- Свайп или клик по тосту не закрывает диалог с `closedBy='any'`.

Компромиссы:

- Тост на время закрывает угол диалога; на маленьких экранах, где область тянется по всей ширине сверху, не ставьте контролы узкого диалога в правый верхний угол.

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

## Движение и уменьшенное движение

Когда использовать:

- Всегда: движение встроено в стили частей.

Заметки о композиции:

- Новый тост въезжает сверху на пружине, старые уменьшаются за ним в колоду, а колода раскрывается в список, пока на ней указатель или фокус. Свайп идёт за пальцем, а тост улетает с той скоростью, которая у него была.
- С `prefers-reduced-motion: reduce` тосты только проявляются и исчезают: ни въезда, ни масштаба, ни броска. Раскладка колоды остаётся.

Компромиссы:

- Свой шаблон сохраняет движение, пока `Toast` остаётся его корнем, а его `translate`, `scale` и `transition` не переопределены; см. [Стилизацию](./styling.md#что-не-переопределять).

## Фокус после закрытия тоста

Когда использовать:

- Пользователь клавиатуры переходит в тосты Tab, горячей клавишей или из скринридера и закрывает один из них.

Заметки о композиции:

- Когда тост в фокусе закрывается по Escape, через `ToastClose` или свайпом, фокус переходит в следующий тост, на его первый фокусируемый элемент.
- Когда закрывается последний тост, фокус возвращается на элемент, который был в фокусе до того, как фокус вошёл в тосты, например на кнопку Archive.
- Вашему коду не нужно переносить фокус; `ToastClose` с действием, например Undo, всё равно может перенести его в другое место, если этого требует действие.

Компромиссы:

- Фокус никогда не прыгает в тост сам: новый тост не забирает фокус, поэтому пользователя ничто не прерывает, а пользователи клавиатуры доходят до тостов по порядку табуляции в конце страницы или горячей клавишей.
