import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Listbox,
  ListboxOption,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
  TextArea,
} from '@vega-ui/react';
import { ChevronLeft } from '@vega-ui/icons';
import './inbox.css';

type Filter = 'all' | 'unread' | 'assigned';

interface Message {
  author: string
  time: string
  body: string
  agent: boolean
}

interface Conversation {
  id: string
  name: string
  email: string
  subject: string
  time: string
  unread: boolean
  resolved: boolean
  assignee: string
  messages: Message[]
}

const ME = 'elena';

const agents = [
  { value: 'none', label: 'Unassigned' },
  { value: 'elena', label: 'Elena Moreau (you)' },
  { value: 'omar', label: 'Omar Haddad' },
  { value: 'lena', label: 'Lena Fischer' },
];

const filters: { value: Filter, label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'assigned', label: 'Assigned to me' },
];

const initialConversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Maya Chen',
    email: 'maya.chen@hey.com',
    subject: 'Charged twice for November',
    time: '9:42 AM',
    unread: true,
    resolved: false,
    assignee: 'none',
    messages: [
      { author: 'Maya Chen', time: '9:42 AM', agent: false, body: 'Hi! My card was charged $128 twice on November 1. Could you refund one of the charges? The invoice number is INV-2026-011.' },
    ],
  },
  {
    id: 'c2',
    name: 'Omar Haddad',
    email: 'omar@haddad.studio',
    subject: 'SSO setup with Okta',
    time: '8:15 AM',
    unread: false,
    resolved: false,
    assignee: 'elena',
    messages: [
      { author: 'Omar Haddad', time: 'Yesterday', agent: false, body: 'We are moving the studio to Okta. Is SAML available on the Business plan, and do we need to re-invite everyone?' },
      { author: 'Elena Moreau', time: 'Yesterday', agent: true, body: 'Yes, SAML is part of Business. Existing members keep their accounts; they sign in with Okta from the next session.' },
      { author: 'Omar Haddad', time: '8:15 AM', agent: false, body: 'Great. Where do I find the ACS URL and the entity ID?' },
    ],
  },
  {
    id: 'c3',
    name: 'Lena Fischer',
    email: 'lena.fischer@posteo.de',
    subject: 'Export comments to CSV',
    time: 'Yesterday',
    unread: false,
    resolved: false,
    assignee: 'lena',
    messages: [
      { author: 'Lena Fischer', time: 'Yesterday', agent: false, body: 'Is there a way to export all review comments from a project to CSV? We need them for an audit.' },
    ],
  },
  {
    id: 'c4',
    name: 'Tomás Ruiz',
    email: 'tomas.ruiz@gmail.com',
    subject: 'Can’t upload files over 2 GB',
    time: 'Mon',
    unread: false,
    resolved: false,
    assignee: 'elena',
    messages: [
      { author: 'Tomás Ruiz', time: 'Mon', agent: false, body: 'Uploads stop at 99% for anything bigger than 2 GB. Smaller files work fine. I’m on Chrome 131 on macOS.' },
      { author: 'Elena Moreau', time: 'Mon', agent: true, body: 'Thanks for the details. We’re looking into it and will update you here.' },
    ],
  },
  {
    id: 'c5',
    name: 'Aiko Tanaka',
    email: 'aiko@tanaka.jp',
    subject: 'Thanks for the quick fix',
    time: 'Oct 28',
    unread: false,
    resolved: true,
    assignee: 'omar',
    messages: [
      { author: 'Aiko Tanaka', time: 'Oct 28', agent: false, body: 'Just wanted to say the dashboard loads instantly now. Thank you!' },
    ],
  },
];

const getInitials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2);

const ellipsis = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 } as const;

export default function Inbox() {
  const id = useId();
  const listboxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const focusAfterView = useRef(false);
  const [conversations, setConversations] = useState(initialConversations);
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState('c2');
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [reply, setReply] = useState('');
  const [replyError, setReplyError] = useState('');
  const [notice, setNotice] = useState('');

  const visible = conversations.filter((conversation) => {
    if (filter === 'unread') return conversation.unread;
    if (filter === 'assigned') return conversation.assignee === ME;

    return true;
  });

  const conversation = conversations.find((item) => item.id === selected) ?? conversations[0];
  const unreadCount = conversations.filter((item) => item.unread).length;

  useEffect(() => {
    if (!focusAfterView.current) return;

    focusAfterView.current = false;

    if (view === 'list') {
      listboxRef.current?.focus();
      return;
    }

    if (backRef.current?.checkVisibility()) titleRef.current?.focus();
  }, [view]);

  const update = (changes: Partial<Conversation>) => {
    setConversations((current) => current.map((item) => (item.id === conversation.id ? { ...item, ...changes } : item)));
  };

  const open = (next: string | null | undefined) => {
    if (next === null || next === undefined) return;

    setConversations((current) => current.map((item) => (item.id === next ? { ...item, unread: false } : item)));
    setSelected(next);
    setReply('');
    setReplyError('');
    setNotice('');
    focusAfterView.current = true;
    setView('detail');
  };

  const back = () => {
    focusAfterView.current = true;
    setView('list');
  };

  const assign = (assignee: string | undefined) => {
    if (assignee === undefined) return;

    update({ assignee });
    setNotice(assignee === 'none' ? 'Conversation unassigned.' : `Assigned to ${agents.find((agent) => agent.value === assignee)?.label}.`);
  };

  const toggleResolved = () => {
    update({ resolved: !conversation.resolved });
    setNotice(conversation.resolved ? 'Conversation reopened.' : 'Marked as resolved.');
  };

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (reply.trim() === '') {
      setReplyError('Write a reply before sending.');
      const element = form.elements.namedItem('reply');
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    update({
      resolved: false,
      messages: [...conversation.messages, { author: 'Elena Moreau', time: 'Just now', agent: true, body: reply.trim() }],
    });
    setReply('');
    setNotice(`Reply sent to ${conversation.name}.`);
  };

  return (
    <div className='inbox' style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h1' size={7} fontWeight={700}>Inbox</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {unreadCount === 0 ? 'You’re all caught up.' : `${unreadCount} unread conversation${unreadCount === 1 ? '' : 's'} in Support.`}
        </Text>
      </header>

      <div className='inboxPanes' data-view={view}>
        <section className='inboxList' aria-labelledby={`${id}-list`}>
          <Heading id={`${id}-list`} as='h2' size={4} fontWeight={600}>Conversations</Heading>
          <SegmentedControl
            size='sm'
            name={`${id}-filter`}
            role='radiogroup'
            aria-label='Show'
            value={filter}
            onChange={(event) => setFilter(event.target.value as Filter)}
            style={{ alignSelf: 'stretch' }}
          >
            {filters.map((item) => (
              <SegmentedControlItem key={item.value} value={item.value}>
                <SegmentedControlItemInput />
                {item.label}
              </SegmentedControlItem>
            ))}
            <SegmentedControlIndicator />
          </SegmentedControl>
          {visible.length === 0 && (
            <div style={{ display: 'grid', gap: 'var(--spacing-2)', justifyItems: 'center', paddingBlock: 'var(--spacing-20)', textAlign: 'center' }}>
              <Text size={3} fontWeight={600}>Nothing here</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>{filter === 'unread' ? 'You’ve read every conversation.' : 'No conversations are assigned to you.'}</Text>
            </div>
          )}
          {visible.length > 0 && (
            <Listbox ref={listboxRef} aria-labelledby={`${id}-list`} value={selected} onChangeValue={open} className='inboxListbox'>
              {visible.map((item) => (
                <ListboxOption key={item.id} value={item.id} label={item.name} className='inboxOption'>
                  <Avatar size='md' variant={item.unread ? 'primary' : 'secondary'} aria-hidden='true' style={{ flexShrink: 0 }}>
                    <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
                  </Avatar>
                  <span style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-1)', flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-4)' }}>
                      <Text size={3} fontWeight={item.unread ? 700 : 500} style={ellipsis}>{item.name}</Text>
                      <Text size={1} style={{ marginInlineStart: 'auto', flexShrink: 0, color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{item.time}</Text>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                      <Text size={2} fontWeight={item.unread ? 600 : 400} style={ellipsis}>{item.subject}</Text>
                      {item.unread && <Badge size='xs' variant='info' style={{ marginInlineStart: 'auto' }}>New</Badge>}
                      {item.resolved && <Badge size='xs' variant='success' style={{ marginInlineStart: 'auto' }}>Resolved</Badge>}
                    </span>
                    <Text size={2} style={{ ...ellipsis, color: 'var(--label-secondary)' }}>{item.messages[item.messages.length - 1].body}</Text>
                  </span>
                </ListboxOption>
              ))}
            </Listbox>
          )}
        </section>

        <section className='inboxDetail' aria-labelledby={`${id}-subject`}>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)', paddingBlockEnd: 'var(--spacing-8)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
              <IconButton
                ref={backRef}
                size='xs'
                variant='secondary'
                appearance='ghost'
                aria-label='Back to conversations'
                className='inboxBack'
                onClick={back}
              >
                <Icon size='sm'><ChevronLeft /></Icon>
              </IconButton>
              <div style={{ display: 'grid', gap: 'var(--spacing-1)', flex: 1, minWidth: 0 }}>
                <Heading ref={titleRef} id={`${id}-subject`} as='h2' size={5} fontWeight={600} tabIndex={-1} style={{ outline: 'none', overflowWrap: 'anywhere' }}>
                  {conversation.subject}
                </Heading>
                <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{`${conversation.name} · ${conversation.email}`}</Text>
              </div>
              <Badge size='sm' variant={conversation.resolved ? 'success' : 'warning'} style={{ marginBlockStart: 'var(--spacing-2)' }}>
                {conversation.resolved ? 'Resolved' : 'Open'}
              </Badge>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4) var(--spacing-6)' }}>
              <Label htmlFor={`${id}-assignee`}>Assignee</Label>
              <Select size='xs' value={conversation.assignee} onChangeValue={assign} style={{ flex: '1 1 180px', maxWidth: 240 }}>
                <SelectCombobox id={`${id}-assignee`}>
                  <SelectValue />
                  <SelectIcon />
                </SelectCombobox>
                <SelectListbox>
                  {agents.map((agent) => <SelectOption key={agent.value} value={agent.value}>{agent.label}</SelectOption>)}
                </SelectListbox>
              </Select>
              <Button size='xs' variant='secondary' appearance='ghost' onClick={toggleResolved} style={{ marginInlineStart: 'auto' }}>
                {conversation.resolved ? 'Reopen' : 'Mark as resolved'}
              </Button>
            </div>
          </div>

          <ol aria-label='Messages' style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-10)', flex: 1, margin: 0, padding: 0, listStyle: 'none' }}>
            {conversation.messages.map((message, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-6)' }}>
                <Avatar size='sm' variant={message.agent ? 'primary' : 'secondary'} aria-hidden='true' style={{ flexShrink: 0 }}>
                  <AvatarFallback>{getInitials(message.author)}</AvatarFallback>
                </Avatar>
                <div style={{ display: 'grid', gap: 'var(--spacing-2)', minWidth: 0 }}>
                  <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 'var(--spacing-1) var(--spacing-4)' }}>
                    <Text size={2} fontWeight={600}>{message.author}</Text>
                    <Text size={1} style={{ color: 'var(--label-secondary)' }}>{message.time}</Text>
                  </span>
                  <Text
                    size={3}
                    style={{
                      display: 'block',
                      padding: 'var(--spacing-5) var(--spacing-7)',
                      borderRadius: 'var(--radius-4)',
                      background: message.agent ? 'color-mix(in oklch, var(--color-primary-500) 12%, transparent)' : 'var(--fills-quaternary)',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {message.body}
                  </Text>
                </div>
              </li>
            ))}
          </ol>

          <form noValidate onSubmit={send} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={`${id}-reply`}>{`Reply to ${conversation.name}`}</Label>
            <TextArea
              id={`${id}-reply`}
              name='reply'
              rows={3}
              fullWidth
              value={reply}
              error={replyError !== ''}
              placeholder='Write a reply…'
              aria-invalid={replyError !== ''}
              aria-describedby={replyError === '' ? undefined : `${id}-reply-error`}
              onChange={(event) => {
                setReply(event.currentTarget.value);
                setReplyError('');
              }}
            />
            {replyError && <HelperText id={`${id}-reply-error`} error>{replyError}</HelperText>}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-3)' }}>
              <Text size={2} role='status' style={{ marginInlineEnd: 'auto', color: 'var(--label-secondary)' }}>{notice}</Text>
              <Button size='xs' type='submit'>Send reply</Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
