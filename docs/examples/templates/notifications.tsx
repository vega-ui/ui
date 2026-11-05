import { useId, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
  Separator,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
  TimeField,
  TimeFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import { Bell, BellOff } from '@vega-ui/icons';
import './notifications.css';

type Filter = 'all' | 'mentions' | 'unread';
type Channel = 'email' | 'push' | 'inApp';
type Event = 'mentions' | 'comments' | 'assigned' | 'requests' | 'digest' | 'product';

interface Notification {
  id: string
  actor: string
  action: string
  target: string
  quote?: string
  time: string
  group: 'Today' | 'Earlier'
  unread: boolean
  mention: boolean
  request?: 'pending' | 'approved' | 'declined'
}

const people: Record<string, { name: string, initials: string }> = {
  priya: { name: 'Priya Nair', initials: 'PN' },
  omar: { name: 'Omar Haddad', initials: 'OH' },
  alex: { name: 'Alex Kim', initials: 'AK' },
  lena: { name: 'Lena Fischer', initials: 'LF' },
  jonas: { name: 'Jonas Weber', initials: 'JW' },
  sofia: { name: 'Sofia Lindqvist', initials: 'SL' },
};

const initialNotifications: Notification[] = [
  { id: 'n1', actor: 'priya', action: 'mentioned you in', target: 'Checkout v3 flows', quote: '@Elena can you check the spacing of the tax row on mobile?', time: '12 min ago', group: 'Today', unread: true, mention: true },
  { id: 'n2', actor: 'omar', action: 'requested access to', target: 'Q4 budget.xlsx', time: '1 hour ago', group: 'Today', unread: true, mention: false, request: 'pending' },
  { id: 'n3', actor: 'alex', action: 'commented on', target: 'Sticky order summary', quote: 'Pushed a fix, ready for another look.', time: '2 hours ago', group: 'Today', unread: true, mention: false },
  { id: 'n4', actor: 'lena', action: 'assigned you', target: 'Dark theme contrast pass', time: '4 hours ago', group: 'Today', unread: false, mention: false },
  { id: 'n5', actor: 'jonas', action: 'mentioned you in', target: 'Release notes 2.8', quote: 'Elena owns the checkout section.', time: 'Yesterday', group: 'Earlier', unread: true, mention: true },
  { id: 'n6', actor: 'sofia', action: 'shared', target: 'Usability findings, round 2', time: 'Yesterday', group: 'Earlier', unread: false, mention: false },
  { id: 'n7', actor: 'priya', action: 'requested access to', target: 'Brand guidelines.pdf', time: 'Monday', group: 'Earlier', unread: false, mention: false, request: 'approved' },
];

const channels: { key: Channel, label: string }[] = [
  { key: 'email', label: 'Email' },
  { key: 'push', label: 'Push' },
  { key: 'inApp', label: 'In-app' },
];

const events: { key: Event, label: string, description: string, only?: Channel[] }[] = [
  { key: 'mentions', label: 'Mentions and replies', description: 'Someone @mentions you or replies to your comment' },
  { key: 'comments', label: 'Comments', description: 'New comments on items you own or follow' },
  { key: 'assigned', label: 'Assignments', description: 'A task or review is assigned to you' },
  { key: 'requests', label: 'Access requests', description: 'Someone asks to open a file you own' },
  { key: 'digest', label: 'Weekly digest', description: 'A summary of activity every Monday', only: ['email'] },
  { key: 'product', label: 'Product updates', description: 'New features and changes to Northwind', only: ['email', 'inApp'] },
];

const pauses = [
  { value: 'off', label: 'Don’t pause' },
  { value: '1h', label: 'For 1 hour' },
  { value: '8h', label: 'For 8 hours' },
  { value: 'tomorrow', label: 'Until tomorrow, 9:00 AM' },
  { value: 'week', label: 'For 1 week' },
];

const initialPreferences: Record<Event, Record<Channel, boolean>> = {
  mentions: { email: true, push: true, inApp: true },
  comments: { email: false, push: true, inApp: true },
  assigned: { email: true, push: true, inApp: true },
  requests: { email: true, push: false, inApp: true },
  digest: { email: true, push: false, inApp: false },
  product: { email: false, push: false, inApp: true },
};

const field = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const ghost = { variant: 'secondary', appearance: 'ghost' } as const;
const quiet = { variant: 'secondary', appearance: 'transparent' } as const;

export default function Notifications() {
  const id = useId();
  const popoverTitleRef = useRef<HTMLHeadingElement>(null);
  const settingsRef = useRef<HTMLHeadingElement>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [items, setItems] = useState(initialNotifications);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [pause, setPause] = useState('off');
  const [quietHours, setQuietHours] = useState(true);
  const [quietFrom, setQuietFrom] = useState('22:00');
  const [quietTo, setQuietTo] = useState('07:00');
  const [errors, setErrors] = useState<Partial<Record<'requests' | 'from' | 'to', string>>>({});
  const [saved, setSaved] = useState(false);

  const unread = items.filter((item) => item.unread).length;
  const visible = items.filter((item) => {
    if (filter === 'mentions') return item.mention;
    if (filter === 'unread') return item.unread;

    return true;
  });
  const groups = (['Today', 'Earlier'] as const)
    .map((name) => ({ name, items: visible.filter((item) => item.group === name) }))
    .filter((group) => group.items.length > 0);

  const markRead = (target: string) => {
    setItems((current) => current.map((item) => item.id === target ? { ...item, unread: false } : item));
  };

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
    popoverTitleRef.current?.focus();
  };

  const respond = (target: string, request: 'approved' | 'declined') => {
    setItems((current) => current.map((item) => item.id === target ? { ...item, request, unread: false } : item));
  };

  const edit = () => {
    setSaved(false);
  };

  const toggleChannel = (event: Event, channel: Channel) => {
    setPreferences({ ...preferences, [event]: { ...preferences[event], [channel]: !preferences[event][channel] } });
    if (event === 'requests') setErrors({ ...errors, requests: undefined });
    edit();
  };

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors: Partial<Record<'requests' | 'from' | 'to', string>> = {};

    if (!Object.values(preferences.requests).some(Boolean)) nextErrors.requests = 'Keep at least one channel for access requests, or people will wait for an answer that never comes.';
    if (quietHours && quietFrom === '') nextErrors.from = 'Enter a start time, like 22:00.';
    if (quietHours && quietTo === '') nextErrors.to = 'Enter an end time, like 07:00.';
    if (quietHours && quietFrom !== '' && quietFrom === quietTo) nextErrors.to = 'Quiet hours need to end at a different time than they start.';

    setErrors(nextErrors);

    const invalid = (['requests', 'from', 'to'] as const).find((name) => nextErrors[name]);
    if (invalid) {
      form.querySelector<HTMLElement>(`[data-field='${invalid}']`)?.focus();
      return;
    }

    setSaved(true);
  };

  const describe = (name: 'from' | 'to') => errors[name] ? `${id}-${name}-error` : `${id}-quiet-hint`;

  return (
    <div className='nt-root' style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-5)', background: 'var(--surface-primary)' }}>
        <Text size={3} fontWeight={700} style={{ flex: 1 }}>Northwind</Text>
        <Popover role='dialog' placement='bottom-end' open={open} onChangeOpen={setOpen}>
          <span style={{ position: 'relative', display: 'inline-flex' }}>
            <PopoverTrigger asChild>
              <IconButton size='xs' type='button' {...ghost} aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}>
                <Icon size='sm'><Bell /></Icon>
              </IconButton>
            </PopoverTrigger>
            {unread > 0 && (
              <Badge size='xs' variant='error' appearance='fill' aria-hidden='true' className='nt-count'>{unread}</Badge>
            )}
          </span>
          <PopoverContent aria-labelledby={`${id}-popover-title`} className='nt-popover'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)', padding: 'var(--spacing-8) var(--spacing-8) 0' }}>
              <Heading ref={popoverTitleRef} tabIndex={-1} id={`${id}-popover-title`} as='h2' size={4} fontWeight={600} style={{ outline: 'none' }}>Notifications</Heading>
              <Button size='xs' type='button' {...quiet} disabled={unread === 0} onClick={markAllRead}>Mark all as read</Button>
            </div>
            <div style={{ padding: 'var(--spacing-6) var(--spacing-8) var(--spacing-4)' }}>
              <SegmentedControl
                size='xs'
                name={`${id}-filter`}
                role='radiogroup'
                aria-label='Show'
                value={filter}
                style={{ width: '100%' }}
                onChange={(event) => setFilter(event.currentTarget.value as Filter)}
              >
                <SegmentedControlItem value='all' style={{ flex: 1 }}>
                  <SegmentedControlItemInput />
                  All
                </SegmentedControlItem>
                <SegmentedControlItem value='mentions' style={{ flex: 1 }}>
                  <SegmentedControlItemInput />
                  Mentions
                </SegmentedControlItem>
                <SegmentedControlItem value='unread' style={{ flex: 1, fontVariantNumeric: 'tabular-nums' }}>
                  <SegmentedControlItemInput />
                  {unread > 0 ? `Unread · ${unread}` : 'Unread'}
                </SegmentedControlItem>
                <SegmentedControlIndicator />
              </SegmentedControl>
            </div>
            <div className='nt-scroller' tabIndex={-1}>
              {groups.length === 0 && (
                <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-3)', padding: 'var(--spacing-20) var(--spacing-8)', textAlign: 'center' }}>
                  <Icon size='lg' aria-hidden='true' style={{ color: 'var(--label-tertiary)' }}><BellOff /></Icon>
                  <Text size={3} fontWeight={500}>You’re all caught up</Text>
                  <Text size={2} style={{ color: 'var(--label-secondary)' }}>
                    {filter === 'mentions' ? 'No one has mentioned you yet.' : 'New notifications will show up here.'}
                  </Text>
                </div>
              )}
              {groups.map((group) => (
                <section key={group.name} aria-labelledby={`${id}-${group.name}`}>
                  <Heading id={`${id}-${group.name}`} as='h3' size={1} fontWeight={600} className='nt-group'>{group.name}</Heading>
                  <ul style={{ display: 'grid', margin: 0, padding: 0, listStyle: 'none' }}>
                    {group.items.map((item) => (
                      <li key={item.id} className='nt-item' data-unread={item.unread}>
                        <Avatar size='md' aria-hidden='true' style={{ flexShrink: 0 }}>
                          <AvatarFallback>{people[item.actor].initials}</AvatarFallback>
                        </Avatar>
                        <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: 1, minWidth: 0 }}>
                          <Text size={2} style={{ overflowWrap: 'anywhere' }}>
                            {item.unread && <VisuallyHidden asChild><span>Unread: </span></VisuallyHidden>}
                            <Text size={2} fontWeight={600}>{people[item.actor].name}</Text>
                            {` ${item.action} `}
                            <Link
                              href={`?notification=${item.id}`}
                              onClick={(event) => {
                                event.preventDefault();
                                markRead(item.id);
                              }}
                            >
                              {item.target}
                            </Link>
                          </Text>
                          {item.quote && <Text size={2} className='nt-quote'>{item.quote}</Text>}
                          <Text size={1} style={{ color: 'var(--label-tertiary)' }}>{item.time}</Text>
                          {item.request === 'pending' && (
                            <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-2)' }}>
                              <Button size='xs' type='button' onClick={() => respond(item.id, 'approved')} aria-label={`Approve ${people[item.actor].name}’s request`}>Approve</Button>
                              <Button size='xs' type='button' {...ghost} onClick={() => respond(item.id, 'declined')} aria-label={`Decline ${people[item.actor].name}’s request`}>Decline</Button>
                            </div>
                          )}
                          {item.request === 'approved' && <Text size={2} style={{ color: 'var(--label-secondary)' }}>Access granted</Text>}
                          {item.request === 'declined' && <Text size={2} style={{ color: 'var(--label-secondary)' }}>Request declined</Text>}
                        </div>
                        <span style={{ display: 'flex', justifyContent: 'center', flexShrink: 0, inlineSize: 'var(--spacing-16)' }}>
                          {item.unread && (
                            <IconButton size='xs' type='button' {...quiet} aria-label={`Mark as read: ${item.target}`} onClick={() => markRead(item.id)} style={{ '--icon-button-size': '24px' } as CSSProperties}>
                              <span className='nt-dot' />
                            </IconButton>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <Separator />
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-4)' }}>
              <Button size='xs' asChild {...quiet}>
                <a
                  href={`#${id}-settings`}
                  onClick={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    settingsRef.current?.scrollIntoView({ block: 'start' });
                    settingsRef.current?.focus({ preventScroll: true });
                  }}
                >
                  Notification settings
                </a>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Avatar size='sm' role='img' aria-label='Elena Moreau' title='Elena Moreau'>
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
      </header>

      <form noValidate onSubmit={save} aria-labelledby={`${id}-settings`} style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading ref={settingsRef} tabIndex={-1} id={`${id}-settings`} as='h1' size={7} fontWeight={700} style={{ outline: 'none', scrollMarginBlockStart: 'var(--spacing-40)' }}>Notifications</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>Choose what reaches you and where. In-app notifications live under the bell.</Text>
        </div>

        <section aria-labelledby={`${id}-delivery`} style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          <Heading id={`${id}-delivery`} as='h2' size={4} fontWeight={600}>Delivery</Heading>
          <div
            role='region'
            aria-labelledby={`${id}-delivery`}
            tabIndex={0}
            style={{ minWidth: 0, overflowX: 'auto', border: '1px solid', borderColor: errors.requests ? 'var(--color-error)' : 'var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}
          >
            <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
              <TableHead>
                <TableRow>
                  <TableHeading scope='col' dataAlign='start' style={{ fontSize: 'var(--font-size-2)' }}>Event</TableHeading>
                  {channels.map((channel) => <TableHeading key={channel.key} scope='col' dataAlign='center' style={{ width: 1, whiteSpace: 'nowrap', fontSize: 'var(--font-size-2)' }}>{channel.label}</TableHeading>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((row) => (
                  <TableRow key={row.key}>
                    <TableHeading scope='row' dataAlign='start' style={{ fontWeight: 400 }}>
                      <span style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                        <Text size={3} fontWeight={500}>{row.label}</Text>
                        <Text size={2} className='nt-description'>{row.description}</Text>
                      </span>
                    </TableHeading>
                    {channels.map((channel, index) => {
                      const available = !row.only || row.only.includes(channel.key);

                      return (
                        <TableData key={channel.key} dataAlign='center'>
                          {!available && <Text size={2} aria-label='Not available' style={{ color: 'var(--label-quaternary)' }}>—</Text>}
                          {available && (
                            <Checkbox style={{ display: 'inline-flex' }}>
                              <CheckboxInput
                                data-field={row.key === 'requests' && index === 0 ? 'requests' : undefined}
                                aria-label={`${row.label} by ${channel.label.toLowerCase()}`}
                                aria-invalid={row.key === 'requests' && errors.requests !== undefined}
                                aria-describedby={row.key === 'requests' && errors.requests ? `${id}-requests-error` : undefined}
                                checked={preferences[row.key][channel.key]}
                                onChange={() => toggleChannel(row.key, channel.key)}
                              />
                              <CheckboxIndicator>
                                <CheckboxCheckedIcon />
                              </CheckboxIndicator>
                            </Checkbox>
                          )}
                        </TableData>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {errors.requests && <HelperText id={`${id}-requests-error`} error>{errors.requests}</HelperText>}
        </section>

        <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-12)' }}>
          <div style={{ ...field, maxWidth: 360 }}>
            <Label htmlFor={`${id}-pause`}>Pause notifications</Label>
            <Select
              value={pause}
              onChangeValue={(value) => {
                setPause(value ?? 'off');
                edit();
              }}
            >
              <SelectCombobox id={`${id}-pause`} aria-describedby={`${id}-pause-hint`}>
                <SelectValue />
                <SelectIcon />
              </SelectCombobox>
              <SelectListbox>
                {pauses.map((option) => <SelectOption key={option.value} value={option.value}>{option.label}</SelectOption>)}
              </SelectListbox>
            </Select>
            <HelperText id={`${id}-pause-hint`}>
              {pause === 'off' ? 'Pausing stops email and push. The bell keeps collecting everything.' : `Email and push are paused ${pauses.find((option) => option.value === pause)?.label.toLowerCase()}.`}
            </HelperText>
          </div>

          <Separator />

          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                <Label htmlFor={`${id}-quiet`}>Quiet hours</Label>
                <Text id={`${id}-quiet-description`} size={2} style={{ color: 'var(--label-secondary)' }}>Hold push notifications every night and deliver them in the morning.</Text>
              </div>
              <Switch style={{ flexShrink: 0 }}>
                <SwitchInput
                  id={`${id}-quiet`}
                  checked={quietHours}
                  aria-describedby={`${id}-quiet-description`}
                  onChange={(event) => {
                    setQuietHours(event.currentTarget.checked);
                    setErrors({ ...errors, from: undefined, to: undefined });
                    edit();
                  }}
                />
                <SwitchIndicator />
              </Switch>
            </div>
            {quietHours && (
              <fieldset style={{ display: 'grid', gap: 'var(--spacing-3)', margin: 0, padding: 0, border: 0, minWidth: 0 }}>
                <legend style={{ padding: 0 }}><VisuallyHidden>Quiet hours range</VisuallyHidden></legend>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-8)' }}>
                  <div style={{ ...field, flex: '0 1 160px' }}>
                    <Label htmlFor={`${id}-from`}>From</Label>
                    <TimeField
                      value={quietFrom}
                      error={errors.from !== undefined}
                      onChangeValue={(value) => {
                        setQuietFrom(value);
                        setErrors({ ...errors, from: undefined, to: undefined });
                        edit();
                      }}
                    >
                      <TimeFieldInput id={`${id}-from`} data-field='from' placeholder='hh:mm' aria-invalid={errors.from !== undefined} aria-describedby={describe('from')} />
                    </TimeField>
                    {errors.from && <HelperText id={`${id}-from-error`} error>{errors.from}</HelperText>}
                  </div>
                  <div style={{ ...field, flex: '0 1 160px' }}>
                    <Label htmlFor={`${id}-to`}>To</Label>
                    <TimeField
                      value={quietTo}
                      error={errors.to !== undefined}
                      onChangeValue={(value) => {
                        setQuietTo(value);
                        setErrors({ ...errors, to: undefined });
                        edit();
                      }}
                    >
                      <TimeFieldInput id={`${id}-to`} data-field='to' placeholder='hh:mm' aria-invalid={errors.to !== undefined} aria-describedby={describe('to')} />
                    </TimeField>
                    {errors.to && <HelperText id={`${id}-to-error`} error>{errors.to}</HelperText>}
                  </div>
                </div>
                <HelperText id={`${id}-quiet-hint`}>Times are in Berlin (CET). A range past midnight ends the next morning.</HelperText>
              </fieldset>
            )}
          </div>
        </Card>

        <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          <VisuallyHidden asChild>
            <div role='status'>{saved ? 'Preferences saved' : ''}</div>
          </VisuallyHidden>
          {saved && (
              <Alert variant='success'>
                <AlertIcon />
                <AlertMain>
                  <AlertTitle>Preferences saved</AlertTitle>
                  <AlertContent>{pause === 'off' ? 'New notifications follow these settings right away.' : 'Saved. Email and push stay paused until the pause ends.'}</AlertContent>
                </AlertMain>
              </Alert>
            )}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
            <Button
              size='xs'
              type='button'
              {...ghost}
              onClick={() => {
                setPreferences(initialPreferences);
                setPause('off');
                setQuietHours(true);
                setQuietFrom('22:00');
                setQuietTo('07:00');
                setErrors({});
                edit();
              }}
            >
              Reset to defaults
            </Button>
            <Button size='xs' type='submit'>Save preferences</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
