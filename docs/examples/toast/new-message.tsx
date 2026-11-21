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
