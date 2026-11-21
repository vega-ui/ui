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
