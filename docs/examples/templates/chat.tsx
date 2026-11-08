import { useEffect, useId, useLayoutEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarStack,
  AvatarStackItem,
  Badge,
  Button,
  Code,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Link,
  Listbox,
  ListboxGroup,
  ListboxOption,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import { ArrowDown, ArrowLeft, Check, CheckCheck, FileText, Hash, Heart, PanelRight, Paperclip, SearchIcon, SendHorizontal, ThumbsUp, XIcon } from '@vega-ui/icons';
import './chat.css';

type Presence = 'online' | 'away' | 'offline';
type ReactionName = 'thumbs-up' | 'heart' | 'check';

interface Person {
  name: string
  initials: string
  role: string
  presence: Presence
}

interface Reaction {
  name: ReactionName
  count: number
  mine: boolean
}

interface Attachment {
  name: string
  size: string
  image?: { src: string, alt: string }
}

interface Message {
  id: string
  author: string
  day: string
  time: string
  text: string
  replyTo?: string
  reactions?: Reaction[]
  attachment?: Attachment
  status?: 'sent' | 'read'
}

interface Conversation {
  id: string
  kind: 'channel' | 'direct'
  title: string
  topic: string
  members: string[]
}

const ME = 'elena';
const TOKEN = /(`[^`]+`|https:\/\/\S+)/;

const people: Record<string, Person> = {
  elena: { name: 'Elena Moreau', initials: 'EM', role: 'Product designer', presence: 'online' },
  alex: { name: 'Alex Kim', initials: 'AK', role: 'Frontend engineer', presence: 'online' },
  priya: { name: 'Priya Nair', initials: 'PN', role: 'Design lead', presence: 'online' },
  jonas: { name: 'Jonas Weber', initials: 'JW', role: 'Product manager', presence: 'away' },
  sofia: { name: 'Sofia Lindqvist', initials: 'SL', role: 'Researcher', presence: 'offline' },
  marco: { name: 'Marco Rossi', initials: 'MR', role: 'Release manager', presence: 'online' },
};

const presenceLabels: Record<Presence, string> = { online: 'Active now', away: 'Away', offline: 'Offline' };

const presenceColors: Record<Presence, string> = {
  online: 'var(--color-green-accent-500)',
  away: 'var(--color-amber-accent-500)',
  offline: 'var(--label-tertiary)',
};

const reactionKinds: Record<ReactionName, { label: string, icon: ReactNode }> = {
  'thumbs-up': { label: 'Thumbs up', icon: <ThumbsUp /> },
  'heart': { label: 'Heart', icon: <Heart /> },
  'check': { label: 'Done', icon: <Check /> },
};

const conversations: Conversation[] = [
  { id: 'design', kind: 'channel', title: 'design', topic: 'Checkout redesign and weekly design reviews', members: ['elena', 'priya', 'alex', 'jonas', 'sofia', 'marco'] },
  { id: 'releases', kind: 'channel', title: 'releases', topic: 'Release trains, staging and rollouts', members: ['elena', 'marco', 'jonas', 'alex'] },
  { id: 'general', kind: 'channel', title: 'general', topic: 'Company-wide announcements', members: ['elena', 'priya', 'alex', 'jonas', 'sofia', 'marco'] },
  { id: 'alex', kind: 'direct', title: 'Alex Kim', topic: 'Frontend engineer', members: ['alex', 'elena'] },
  { id: 'priya', kind: 'direct', title: 'Priya Nair', topic: 'Design lead', members: ['priya', 'elena'] },
  { id: 'jonas', kind: 'direct', title: 'Jonas Weber', topic: 'Product manager', members: ['jonas', 'elena'] },
];

const checkoutMockup = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="hsl(222 32% 95%)"/><rect x="20" y="20" width="176" height="160" rx="10" fill="hsl(0 0% 100%)"/><rect x="36" y="38" width="88" height="10" rx="5" fill="hsl(222 20% 72%)"/><rect x="36" y="62" width="144" height="22" rx="6" fill="hsl(222 30% 92%)"/><rect x="36" y="94" width="144" height="22" rx="6" fill="hsl(222 30% 92%)"/><rect x="36" y="126" width="68" height="22" rx="6" fill="hsl(222 30% 92%)"/><rect x="112" y="126" width="68" height="22" rx="6" fill="hsl(222 30% 92%)"/><rect x="208" y="20" width="92" height="118" rx="10" fill="hsl(0 0% 100%)"/><rect x="220" y="36" width="52" height="8" rx="4" fill="hsl(222 20% 72%)"/><rect x="220" y="56" width="68" height="6" rx="3" fill="hsl(222 30% 88%)"/><rect x="220" y="70" width="60" height="6" rx="3" fill="hsl(222 30% 88%)"/><rect x="220" y="84" width="64" height="6" rx="3" fill="hsl(222 30% 88%)"/><rect x="220" y="110" width="68" height="16" rx="8" fill="hsl(222 85% 58%)"/></svg>')}`;

const initialMessages: Record<string, Message[]> = {
  design: [
    { id: 'd1', author: 'priya', day: 'Yesterday', time: '4:12 PM', text: 'Uploaded the checkout v3 explorations. The order summary now sticks while you scroll.', attachment: { name: 'checkout-v3.png', size: '1.4 MB', image: { src: checkoutMockup, alt: 'Checkout v3 mockup with a form and a sticky order summary' } } },
    { id: 'd2', author: 'priya', day: 'Yesterday', time: '4:13 PM', text: 'Feedback welcome before Thursday’s review.' },
    { id: 'd3', author: 'alex', day: 'Yesterday', time: '5:02 PM', text: 'Love the sticky summary. Can we keep the promo code field collapsed by default?', reactions: [{ name: 'thumbs-up', count: 2, mine: false }] },
    { id: 'd4', author: 'jonas', day: 'Today', time: '9:14 AM', text: 'Spec is up to date: https://northwind.example/specs/checkout-v3' },
    { id: 'd5', author: 'elena', day: 'Today', time: '9:20 AM', text: 'Collapsed works for me too.', replyTo: 'd3' },
    { id: 'd6', author: 'elena', day: 'Today', time: '9:21 AM', text: 'I’ll wire the totals to `useCartSummary()` today.', status: 'read', reactions: [{ name: 'heart', count: 1, mine: false }] },
    { id: 'd7', author: 'alex', day: 'Today', time: '9:34 AM', text: 'Nice. One thing: the tax row jumps when the country changes. Let’s reserve its height.', reactions: [{ name: 'check', count: 3, mine: true }] },
    { id: 'd8', author: 'alex', day: 'Today', time: '9:35 AM', text: 'Happy to pair on it after standup.' },
  ],
  releases: [
    { id: 'r1', author: 'marco', day: 'Yesterday', time: '6:40 PM', text: 'Release notes for 2.8 are ready for review.', attachment: { name: 'release-notes-2.8.pdf', size: '220 KB' } },
    { id: 'r2', author: 'marco', day: 'Today', time: '8:05 AM', text: '2.8.0 is on staging: https://staging.northwind.example' },
    { id: 'r3', author: 'jonas', day: 'Today', time: '8:31 AM', text: 'Smoke tests are green on Chrome and Safari.' },
    { id: 'r4', author: 'marco', day: 'Today', time: '9:02 AM', text: 'Firefox run is still going: `pnpm test:e2e --project=firefox`' },
    { id: 'r5', author: 'marco', day: 'Today', time: '9:48 AM', text: 'Firefox passed. Promoting to production at 2 PM.' },
  ],
  general: [
    { id: 'g1', author: 'sofia', day: 'Yesterday', time: '11:20 AM', text: 'Usability sessions for checkout are booked for next Tuesday. Notes will land in #design.' },
    { id: 'g2', author: 'marco', day: 'Today', time: '8:50 AM', text: 'The office is closed on Friday for the move. Please pack your desks by Thursday evening.' },
  ],
  alex: [
    { id: 'a1', author: 'alex', day: 'Yesterday', time: '3:02 PM', text: 'Got a minute to look at the totals bug?' },
    { id: 'a2', author: 'elena', day: 'Yesterday', time: '3:10 PM', text: 'Sure, after lunch.', status: 'read' },
    { id: 'a3', author: 'alex', day: 'Today', time: '9:40 AM', text: 'Pushed a fix to `fix/tax-row-height`. Could you check it on mobile?' },
  ],
  priya: [
    { id: 'p1', author: 'priya', day: 'Today', time: '9:52 AM', text: 'Can you share the file with the new empty states?' },
    { id: 'p2', author: 'priya', day: 'Today', time: '9:53 AM', text: 'No rush, tomorrow is fine.' },
  ],
  jonas: [
    { id: 'j1', author: 'elena', day: 'Yesterday', time: '1:15 PM', text: 'Do we still need the legacy coupon endpoint?' },
    { id: 'j2', author: 'jonas', day: 'Yesterday', time: '1:40 PM', text: 'Only for the mobile app until 4.2 ships.' },
  ],
};

const initialUnread: Record<string, number> = { design: 0, releases: 4, general: 1, alex: 1, priya: 2, jonas: 0 };

const replies = [
  'Sounds good, thanks!',
  'On it. I’ll post an update here when it’s done.',
  'Makes sense, let’s go with that.',
];

const clock = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;
const ghost = { variant: 'secondary', appearance: 'ghost' } as const;
const truncate = { minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } as const;

const renderText = (text: string) => text.split(TOKEN).map((part, index) => {
  if (part.startsWith('`') && part.endsWith('`') && part.length > 2) return <Code key={index} size={2}>{part.slice(1, -1)}</Code>;
  if (part.startsWith('https://')) return <Link key={index} href={part} target='_blank' rel='noreferrer'>{part.slice(8)}</Link>;

  return part;
});

const getPreview = (message: Message | undefined) => {
  if (!message) return 'No messages yet';

  const text = message.text === '' && message.attachment ? message.attachment.name : message.text.replaceAll('`', '');
  if (message.author === ME) return `You: ${text}`;

  return text;
};

const firstName = (person: string) => people[person].name.split(' ')[0];

const PersonAvatar = ({ person, size = 'md' }: { person: string, size?: 'sm' | 'md' }) => (
  <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
    <Avatar size={size} aria-hidden='true'>
      <AvatarFallback>{people[person].initials}</AvatarFallback>
    </Avatar>
    <span
      className='chat-presence'
      style={{
        position: 'absolute',
        insetBlockEnd: 0,
        insetInlineEnd: 0,
        inlineSize: 'var(--spacing-5)',
        blockSize: 'var(--spacing-5)',
        borderRadius: '50%',
        background: presenceColors[people[person].presence],
      }}
    />
  </span>
);

const AttachmentCard = ({ attachment }: { attachment: Attachment }) => {
  if (attachment.image) {
    return (
      <figure style={{ margin: 0, inlineSize: 'min(100%, 320px)', overflow: 'hidden', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-3)', background: 'var(--surface-primary)' }}>
        <img src={attachment.image.src} alt={attachment.image.alt} style={{ display: 'block', inlineSize: '100%', aspectRatio: '8 / 5', objectFit: 'cover' }} />
        <figcaption style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-6)', padding: 'var(--spacing-4) var(--spacing-6)' }}>
          <Text size={2} fontWeight={500} style={truncate}>{attachment.name}</Text>
          <Text size={2} className='chat-muted' style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{attachment.size}</Text>
        </figcaption>
      </figure>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', inlineSize: 'min(100%, 320px)', padding: 'var(--spacing-5) var(--spacing-6)', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-3)', background: 'var(--surface-primary)', boxSizing: 'border-box' }}>
      <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--color-primary-500)' }}><FileText /></Icon>
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={2} fontWeight={500} style={truncate}>{attachment.name}</Text>
        <Text size={1} className='chat-muted' style={{ fontVariantNumeric: 'tabular-nums' }}>{attachment.size}</Text>
      </div>
    </div>
  );
};

interface MessageItemProps {
  message: Message
  first: boolean
  receipt: boolean
  fresh: boolean
  quoted?: Message
  onToggleReaction(name: ReactionName): void
}

const MessageItem = ({ message, first, receipt, fresh, quoted, onToggleReaction }: MessageItemProps) => {
  const own = message.author === ME;
  const author = own ? 'You' : people[message.author].name;
  const tail = own ? 'borderStartEndRadius' : 'borderStartStartRadius';

  const time = (
    <time dir='auto' className={first && !own ? undefined : 'chat-time'} style={{ flexShrink: 0, fontSize: 'var(--font-size-1)', color: 'var(--label-tertiary)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
      {message.time}
    </time>
  );

  return (
    <li
      className={fresh ? 'chat-message chat-enter' : 'chat-message'}
      style={{
        display: 'grid',
        gridTemplateColumns: own ? 'minmax(0, 1fr)' : 'var(--spacing-16) minmax(0, 1fr)',
        columnGap: 'var(--spacing-5)',
        marginBlockStart: first ? 'var(--spacing-8)' : 'var(--spacing-1)',
      }}
    >
      {!own && <div>{first && <PersonAvatar person={message.author} />}</div>}
      <div style={{ display: 'grid', justifyItems: own ? 'end' : 'start', gap: 'var(--spacing-2)', minWidth: 0 }}>
        {first && !own && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-4)', minWidth: 0 }}>
            <Text size={2} fontWeight={600} style={truncate}>{author}</Text>
            {time}
          </div>
        )}
        {(!first || own) && <VisuallyHidden asChild><span>{author}</span></VisuallyHidden>}
        <div style={{ display: 'flex', flexDirection: own ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 'var(--spacing-4)', maxInlineSize: '100%' }}>
          <div
            style={{
              display: 'grid',
              gap: 'var(--spacing-4)',
              minWidth: 0,
              maxInlineSize: 'min(100%, 520px)',
              padding: 'var(--spacing-5) var(--spacing-7)',
              borderRadius: 'var(--radius-4)',
              [tail]: first ? 'var(--radius-4)' : 'var(--radius-1)',
              background: own ? 'oklch(from var(--color-primary-500) l c h / 0.14)' : 'var(--fills-secondary)',
            }}
          >
            {quoted && (
              <blockquote style={{ display: 'grid', margin: 0, paddingBlock: 'var(--spacing-1)', paddingInline: 'var(--spacing-5) 0', borderInlineStart: '2px solid var(--color-primary-500)' }}>
                <Text size={1} fontWeight={600} style={{ color: 'var(--color-primary-500)' }}>{quoted.author === ME ? 'You' : people[quoted.author].name}</Text>
                <Text dir='auto' size={2} className='chat-muted' style={truncate}>{quoted.text.replaceAll('`', '')}</Text>
              </blockquote>
            )}
            {message.text !== '' && <Text dir='auto' size={3} style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{renderText(message.text)}</Text>}
            {message.attachment && <AttachmentCard attachment={message.attachment} />}
          </div>
          {(!first || own) && time}
        </div>
        {message.reactions && message.reactions.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
            {message.reactions.map((reaction) => (
              <Button
                key={reaction.name}
                type='button'
                size='xs'
                {...ghost}
                className='chat-reaction'
                aria-pressed={reaction.mine}
                aria-label={`${reactionKinds[reaction.name].label}, ${reaction.count}`}
                onClick={() => onToggleReaction(reaction.name)}
                style={{ gap: 'var(--spacing-2)', '--button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs' aria-hidden='true'>{reactionKinds[reaction.name].icon}</Icon>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{reaction.count}</span>
              </Button>
            ))}
          </div>
        )}
        {receipt && message.status && (
          <Text size={1} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-1)', color: 'var(--label-tertiary)' }}>
            <Icon size='xs' aria-hidden='true'>{message.status === 'read' ? <CheckCheck /> : <Check />}</Icon>
            {message.status === 'read' ? 'Read' : 'Sent'}
          </Text>
        )}
      </div>
    </li>
  );
};

export default function Chat() {
  const id = useId();
  const [activeId, setActiveId] = useState('design');
  const [view, setView] = useState<'list' | 'conversation'>('list');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [unread, setUnread] = useState(initialUnread);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [typing, setTyping] = useState<{ conversation: string, person: string } | null>(null);
  const [fresh, setFresh] = useState<string[]>([]);
  const [atBottom, setAtBottom] = useState(true);
  const [announcement, setAnnouncement] = useState('');

  const listRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const positions = useRef<Record<string, number>>({});
  const activeRef = useRef(activeId);
  const pendingScroll = useRef(false);
  const pendingFocus = useRef<'title' | 'list' | null>(null);
  const timers = useRef<number[]>([]);
  const replyIndex = useRef(0);
  const nextId = useRef(0);

  const conversation = conversations.find((item) => item.id === activeId) ?? conversations[0];
  const thread = messages[activeId];
  const draft = drafts[activeId] ?? '';
  const lastOwn = thread.findLast((message) => message.author === ME);
  const days = [...new Set(thread.map((message) => message.day))];
  const files = thread.flatMap((message) => message.attachment ? [message.attachment] : []);
  const visible = conversations.filter((item) => item.title.toLowerCase().includes(query.trim().toLowerCase()));
  const lines = draft.split('\n').length;
  const title = conversation.kind === 'channel' ? `#${conversation.title}` : conversation.title;

  const isOnScreen = (conversationId: string) => activeRef.current === conversationId && paneRef.current?.offsetParent !== null;

  const jumpToLatest = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
    composerRef.current?.focus();
  };

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollTop = positions.current[activeId] ?? scroller.scrollHeight;
    setAtBottom(scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 48);
  }, [activeId, view]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!pendingScroll.current || !scroller) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    pendingScroll.current = false;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [thread.length]);

  useEffect(() => {
    if (pendingFocus.current === 'title' && sidebarRef.current?.offsetParent === null) titleRef.current?.focus();
    if (pendingFocus.current === 'list') listRef.current?.focus();

    pendingFocus.current = null;
  }, [view, activeId]);

  const openConversation = (value: string | null) => {
    if (value === null) return;

    setActiveId(value);
    setView('conversation');
    setFresh([]);
    setUnread((current) => ({ ...current, [value]: 0 }));
    pendingFocus.current = 'title';
  };

  const goBack = () => {
    setView('list');
    pendingFocus.current = 'list';
  };

  const onScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    positions.current[activeId] = scroller.scrollTop;
    setAtBottom(scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 48);
  };

  const later = (callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  };

  const receiveReply = (conversationId: string) => {
    const responder = conversations.find((item) => item.id === conversationId)?.kind === 'direct' ? conversationId : 'alex';
    const text = replies[replyIndex.current % replies.length];
    replyIndex.current += 1;

    later(() => {
      setTyping({ conversation: conversationId, person: responder });
      setMessages((current) => ({
        ...current,
        [conversationId]: current[conversationId].map((message) => message.status === 'sent' ? { ...message, status: 'read' } : message),
      }));
    }, 900);

    later(() => {
      const reply: Message = { id: `m${nextId.current++}`, author: responder, day: 'Today', time: clock.format(new Date()), text };
      const onScreen = isOnScreen(conversationId);
      const scroller = scrollerRef.current;
      const nearBottom = scroller ? scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 48 : false;

      setTyping(null);
      setMessages((current) => ({ ...current, [conversationId]: [...current[conversationId], reply] }));

      if (onScreen) {
        setFresh((current) => [...current, reply.id]);
        pendingScroll.current = nearBottom;
        setAnnouncement(`${people[responder].name}: ${text}`);
        return;
      }

      setUnread((current) => ({ ...current, [conversationId]: current[conversationId] + 1 }));
      const where = conversationId === responder ? '' : ` in #${conversationId}`;
      setAnnouncement(`New message from ${people[responder].name}${where}`);
    }, 3000);
  };

  const send = (text: string, attachment?: Attachment) => {
    const message: Message = { id: `m${nextId.current++}`, author: ME, day: 'Today', time: clock.format(new Date()), text, attachment, status: 'sent' };

    setMessages((current) => ({ ...current, [activeId]: [...current[activeId], message] }));
    setFresh((current) => [...current, message.id]);
    setAnnouncement('Message sent');
    pendingScroll.current = true;
    receiveReply(activeId);
  };

  const submit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const text = draft.trim();
    if (text === '') return;

    setDrafts((current) => ({ ...current, [activeId]: '' }));
    send(text);
  };

  const changeDraft = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setDrafts((current) => ({ ...current, [activeId]: value }));
  };

  const onComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;

    event.preventDefault();
    submit();
  };

  const attach = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;

    send('', { name: file.name, size: `${Math.max(1, Math.round(file.size / 1024))} KB` });
  };

  const toggleReaction = (messageId: string, name: ReactionName) => {
    setMessages((current) => ({
      ...current,
      [activeId]: current[activeId].map((message) => {
        if (message.id !== messageId || !message.reactions) return message;

        const reactions = message.reactions
          .map((reaction) => reaction.name === name ? { ...reaction, mine: !reaction.mine, count: reaction.count + (reaction.mine ? -1 : 1) } : reaction)
          .filter((reaction) => reaction.count > 0);

        return { ...message, reactions };
      }),
    }));
  };

  const renderOption = (item: Conversation) => {
    const last = messages[item.id].at(-1);
    const count = unread[item.id];

    return (
      <ListboxOption
        key={item.id}
        value={item.id}
        label={item.title}
        className='chat-conversation'
        style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', paddingInline: 'var(--spacing-6)', gap: 'var(--spacing-6)' }}
      >
        {item.kind === 'channel'
          ? (
            <span className='chat-channel-icon' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, inlineSize: 'var(--spacing-16)', blockSize: 'var(--spacing-16)', borderRadius: 'var(--radius-2)' }}>
              <Icon size='sm' aria-hidden='true'><Hash /></Icon>
            </span>
          )
          : <PersonAvatar person={item.id} />}
        <span style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', flex: 1, minWidth: 0 }}>
          <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
            <span style={{ ...truncate, fontWeight: count > 0 ? 600 : 500 }}>
              {item.title}
              {item.kind === 'direct' && <VisuallyHidden asChild><span>{`, ${presenceLabels[people[item.id].presence]}`}</span></VisuallyHidden>}
            </span>
            <span className='chat-muted' style={{ flexShrink: 0, fontSize: 'var(--font-size-1)', fontVariantNumeric: 'tabular-nums' }}>
              <bdi>{last?.day === 'Today' ? last.time : last?.day}</bdi>
            </span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <span dir='auto' className='chat-muted' style={{ ...truncate, flex: 1, fontSize: 'var(--font-size-2)' }}>{getPreview(last)}</span>
            {count > 0 && (
              <Badge size='xs' variant='info' appearance='fill' style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                {count}
                <VisuallyHidden asChild><span> unread</span></VisuallyHidden>
              </Badge>
            )}
          </span>
        </span>
      </ListboxOption>
    );
  };

  const channels = visible.filter((item) => item.kind === 'channel');
  const directs = visible.filter((item) => item.kind === 'direct');

  return (
    <div
      className='chat-root'
      style={{
        width: '100%',
        maxWidth: 1080,
        blockSize: 640,
        marginInline: 'auto',
        overflow: 'clip',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        boxSizing: 'border-box',
      }}
    >
      <div className='chat-layout' data-view={view}>
        <div ref={sidebarRef} className='chat-sidebar'>
          <div style={{ display: 'grid', gap: 'var(--spacing-6)', padding: 'var(--spacing-8) var(--spacing-8) var(--spacing-4)' }}>
            <Heading as='h2' size={5} fontWeight={700}>Messages</Heading>
            <TextField size='sm'>
              <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-5)', color: 'var(--label-secondary)' }}>
                <SearchIcon />
              </Icon>
              <TextFieldInput
                type='search'
                className='chat-search'
                aria-label='Search conversations'
                placeholder='Search'
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
              />
            </TextField>
          </div>
          {visible.length === 0 && (
            <Text size={2} className='chat-muted' style={{ padding: 'var(--spacing-8)', overflowWrap: 'anywhere' }}>{`No conversations match “${query.trim()}”.`}</Text>
          )}
          {visible.length > 0 && (
            <Listbox
              ref={listRef}
              aria-label='Conversations'
              value={activeId}
              onChangeValue={openConversation}
              style={{ flex: 1, minHeight: 0, gap: 'var(--spacing-1)', padding: 'var(--spacing-2) var(--spacing-4) var(--spacing-6)', borderRadius: 0, background: 'transparent', outlineOffset: -2 }}
            >
              {[{ name: 'Channels', items: channels }, { name: 'Direct messages', items: directs }].filter((group) => group.items.length > 0).map((group) => (
                <ListboxGroup key={group.name} aria-labelledby={`${id}-${group.name}`} style={{ gap: 'var(--spacing-1)' }}>
                  <Text
                    id={`${id}-${group.name}`}
                    size={1}
                    fontWeight={600}
                    className='chat-muted'
                    style={{ paddingInline: 'var(--spacing-6)', paddingBlock: 'var(--spacing-6) var(--spacing-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                  >
                    {group.name}
                  </Text>
                  {group.items.map(renderOption)}
                </ListboxGroup>
              ))}
            </Listbox>
          )}
        </div>

        <section ref={paneRef} className='chat-pane' aria-labelledby={`${id}-title`}>
          <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minHeight: 'var(--spacing-32)', paddingBlock: 'var(--spacing-6)', paddingInline: 'var(--spacing-6) var(--spacing-8)', borderBlockEnd: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
            <IconButton size='xs' type='button' className='chat-back' aria-label='Back to conversations' {...ghost} onClick={goBack} style={{ flexShrink: 0 }}>
              <Icon size='sm' className='chat-mirror'><ArrowLeft /></Icon>
            </IconButton>
            {conversation.kind === 'direct' && <PersonAvatar person={conversation.id} />}
            <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingInlineStart: 'var(--spacing-2)' }}>
              <Heading ref={titleRef} id={`${id}-title`} as='h2' size={4} fontWeight={600} tabIndex={-1} style={{ ...truncate, outline: 'none' }}><bdi>{title}</bdi></Heading>
              <Text size={2} className='chat-muted' style={truncate}>
                <bdi>{conversation.kind === 'direct' ? presenceLabels[people[conversation.id].presence] : conversation.topic}</bdi>
              </Text>
            </div>
            {conversation.kind === 'channel' && (
              <AvatarStack size='sm' className='chat-members' role='group' aria-label={`${conversation.members.length} members`} style={{ flexShrink: 0 }}>
                {conversation.members.slice(0, 3).map((member) => (
                  <AvatarStackItem key={member} role='img' aria-label={people[member].name} title={people[member].name}>
                    <AvatarFallback>{people[member].initials}</AvatarFallback>
                  </AvatarStackItem>
                ))}
                {conversation.members.length > 3 && (
                  <AvatarStackItem variant='secondary' role='img' dir='ltr' aria-label={`and ${conversation.members.length - 3} more`}>
                    <AvatarFallback>{`+${conversation.members.length - 3}`}</AvatarFallback>
                  </AvatarStackItem>
                )}
              </AvatarStack>
            )}
            <Drawer>
              <DrawerTrigger asChild>
                <IconButton size='xs' type='button' aria-label='Conversation details' {...ghost} style={{ flexShrink: 0 }}>
                  <Icon size='sm' className='chat-mirror'><PanelRight /></Icon>
                </IconButton>
              </DrawerTrigger>
              <DrawerContent fullHeight aria-labelledby={`${id}-details`} style={{ width: 'min(360px, 100vw)', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                  <Heading id={`${id}-details`} as='h2' size={4} fontWeight={600} style={truncate}><bdi>{title}</bdi></Heading>
                  <DrawerClose asChild>
                    <IconButton size='xs' aria-label='Close' {...ghost} style={closeButton}>
                      <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                    </IconButton>
                  </DrawerClose>
                </div>
                <Text size={2} className='chat-muted' style={{ display: 'block', marginBlockStart: 'var(--spacing-2)' }}>{conversation.topic}</Text>
                <div style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-12)', flex: 1, minHeight: 0, overflow: 'auto', marginBlockStart: 'var(--spacing-12)' }}>
                  <section aria-labelledby={`${id}-members`} style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
                    <Heading id={`${id}-members`} as='h3' size={2} fontWeight={600}>{`Members · ${conversation.members.length}`}</Heading>
                    <ul style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none' }}>
                      {conversation.members.map((member) => (
                        <li key={member} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minWidth: 0 }}>
                          <PersonAvatar person={member} />
                          <div style={{ display: 'grid', minWidth: 0 }}>
                            <Text size={3} fontWeight={500} style={truncate}>{member === ME ? `${people[member].name} (you)` : people[member].name}</Text>
                            <Text size={2} className='chat-muted' style={truncate}>{`${people[member].role} · ${presenceLabels[people[member].presence]}`}</Text>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section aria-labelledby={`${id}-files`} style={{ display: 'grid', gap: 'var(--spacing-6)', alignContent: 'start' }}>
                    <Heading id={`${id}-files`} as='h3' size={2} fontWeight={600}>Shared files</Heading>
                    {files.length === 0 && <Text size={2} className='chat-muted'>No files shared yet.</Text>}
                    {files.length > 0 && (
                      <ul style={{ display: 'grid', gap: 'var(--spacing-4)', margin: 0, padding: 0, listStyle: 'none' }}>
                        {files.map((file) => (
                          <li key={file.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minWidth: 0 }}>
                            <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--color-primary-500)' }}><FileText /></Icon>
                            <Text size={3} style={{ ...truncate, flex: 1 }}>{file.name}</Text>
                            <Text size={2} className='chat-muted' style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{file.size}</Text>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </div>
              </DrawerContent>
            </Drawer>
          </header>

          <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
            <div
              ref={scrollerRef}
              tabIndex={0}
              role='region'
              aria-label={`Messages in ${title}`}
              onScroll={onScroll}
              style={{ blockSize: '100%', overflowY: 'auto', overscrollBehavior: 'contain', outlineOffset: -2 }}
            >
              <ol style={{ display: 'grid', gap: 'var(--spacing-4)', margin: 0, padding: 'var(--spacing-4) var(--spacing-8) var(--spacing-8)', listStyle: 'none' }}>
                {days.map((day) => {
                  const dayMessages = thread.filter((message) => message.day === day);

                  return (
                    <li key={day}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', margin: 'var(--spacing-6) 0 0', fontSize: 'var(--font-size-1)', fontWeight: 600, color: 'var(--label-secondary)' }}>
                        <span aria-hidden='true' style={{ flex: 1, blockSize: 1, background: 'var(--separator-opaque)' }} />
                        {day}
                        <span aria-hidden='true' style={{ flex: 1, blockSize: 1, background: 'var(--separator-opaque)' }} />
                      </h3>
                      <ol style={{ display: 'grid', margin: 0, padding: 0, listStyle: 'none' }}>
                        {dayMessages.map((message, index) => (
                          <MessageItem
                            key={message.id}
                            message={message}
                            first={index === 0 || dayMessages[index - 1].author !== message.author}
                            receipt={message === lastOwn}
                            fresh={fresh.includes(message.id)}
                            quoted={message.replyTo ? thread.find((item) => item.id === message.replyTo) : undefined}
                            onToggleReaction={(name) => toggleReaction(message.id, name)}
                          />
                        ))}
                      </ol>
                    </li>
                  );
                })}
              </ol>
            </div>
            {!atBottom && (
              <div className='chat-jump' style={{ position: 'absolute', insetInline: 0, insetBlockEnd: 'var(--spacing-6)', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
                <span style={{ pointerEvents: 'auto', borderRadius: 'var(--radius-8)', background: 'var(--surface-primary)', boxShadow: 'var(--surface-shadow)' }}>
                  <Button
                    type='button'
                    size='xs'
                    {...ghost}
                    onClick={jumpToLatest}
                    style={{ gap: 'var(--spacing-3)', '--button-br-ratio': 0.5 } as CSSProperties}
                  >
                    <Icon size='xs' aria-hidden='true'><ArrowDown /></Icon>
                    Jump to latest
                  </Button>
                </span>
              </div>
            )}
          </div>

          <form onSubmit={submit} style={{ display: 'grid', gap: 'var(--spacing-2)', padding: 'var(--spacing-2) var(--spacing-8) var(--spacing-8)' }}>
            <Text size={1} className='chat-muted' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', minBlockSize: 'var(--line-height-1)', paddingInlineStart: 'var(--spacing-2)' }}>
              {typing?.conversation === activeId && (
                <>
                  <span aria-hidden='true' style={{ display: 'inline-flex', gap: 'var(--spacing-1)' }}>
                    {[0, 1, 2].map((dot) => (
                      <span key={dot} className='chat-typing-dot' style={{ inlineSize: 'var(--spacing-2)', blockSize: 'var(--spacing-2)', borderRadius: '50%', background: 'currentColor' }} />
                    ))}
                  </span>
                  {`${firstName(typing.person)} is typing…`}
                </>
              )}
            </Text>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-3)' }}>
              <input ref={fileRef} type='file' hidden onChange={attach} />
              <IconButton size='xs' type='button' aria-label='Attach file' {...ghost} onClick={() => fileRef.current?.click()} style={{ flexShrink: 0, marginBlockEnd: 'var(--spacing-5)' }}>
                <Icon size='sm'><Paperclip /></Icon>
              </IconButton>
              <TextArea
                ref={composerRef}
                rows={Math.min(lines, 6)}
                fullWidth
                aria-label={`Message ${title}`}
                placeholder='Write a message'
                value={draft}
                onChange={changeDraft}
                onKeyDown={onComposerKeyDown}
                style={{ minWidth: 0, maxHeight: 160, resize: 'none', fieldSizing: 'content' } as CSSProperties}
              />
              <IconButton size='xs' type='submit' aria-label='Send message' disabled={draft.trim() === ''} style={{ flexShrink: 0, marginBlockEnd: 'var(--spacing-5)' }}>
                <Icon size='sm' className='chat-mirror'><SendHorizontal /></Icon>
              </IconButton>
            </div>
          </form>
        </section>
      </div>
      <VisuallyHidden asChild>
        <div aria-live='polite'>{announcement}</div>
      </VisuallyHidden>
    </div>
  );
}
