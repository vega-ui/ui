import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  Icon,
  IconButton,
  Option,
  Text,
  TextField,
  TextFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import {
  Bell,
  Check,
  ChevronLeft,
  CircleDot,
  Clock,
  FileText,
  FolderKanban,
  House,
  Keyboard,
  Link2,
  Monitor,
  Moon,
  Palette,
  Plus,
  Search,
  Settings,
  Sun,
  UserPlus,
  XIcon,
} from '@vega-ui/icons';
import './command-palette.css';

type PageId = 'home' | 'projects' | 'issues' | 'docs' | 'settings';
type Theme = 'light' | 'dark' | 'system';
type Group = 'Recent' | 'Navigation' | 'Actions' | 'Settings' | 'Theme';

interface Command {
  id: string
  group: Group
  label: string
  description: string
  icon: ReactNode
  keywords?: string
  shortcut?: string[]
  page?: PageId
  theme?: Theme
  opens?: 'theme'
  message?: { title: string, text: string }
}

interface Match {
  command: Command
  indices: number[]
  score: number
}

const pages: { id: PageId, label: string, key: string, icon: ReactNode, title: string, description: string, rows: { title: string, meta: string }[] }[] = [
  {
    id: 'home',
    key: 'H',
    label: 'Home',
    icon: <House />,
    title: 'Good afternoon, Dana',
    description: 'Here’s what changed since yesterday.',
    rows: [
      { title: 'Billing v2 moved to In review', meta: 'Projects · 12 min ago' },
      { title: 'Lea commented on ACME-131', meta: 'Issues · 1 h ago' },
      { title: 'Release checklist was updated', meta: 'Docs · Yesterday' },
    ],
  },
  {
    id: 'projects',
    key: 'P',
    label: 'Projects',
    icon: <FolderKanban />,
    title: 'Projects',
    description: '4 active projects in Acme.',
    rows: [
      { title: 'Billing v2', meta: 'In review · 18 of 24 tasks' },
      { title: 'Mobile onboarding', meta: 'In progress · 9 of 30 tasks' },
      { title: 'Search relevance', meta: 'Planned · starts Nov 16' },
    ],
  },
  {
    id: 'issues',
    key: 'I',
    label: 'Issues',
    icon: <CircleDot />,
    title: 'Issues',
    description: '23 open issues assigned to your team.',
    rows: [
      { title: 'ACME-131 · Invoice PDF misses VAT number', meta: 'High · Lea Novak' },
      { title: 'ACME-128 · Slow search on large workspaces', meta: 'Medium · Tom Okafor' },
      { title: 'ACME-122 · Typo in welcome email', meta: 'Low · Unassigned' },
    ],
  },
  {
    id: 'docs',
    key: 'D',
    label: 'Docs',
    icon: <FileText />,
    title: 'Docs',
    description: 'Team handbook, specs and release notes.',
    rows: [
      { title: 'Release checklist', meta: 'Edited yesterday by Dana' },
      { title: 'Billing v2 spec', meta: 'Edited 3 days ago by Lea' },
      { title: 'On-call handbook', meta: 'Edited last week by Tom' },
    ],
  },
  {
    id: 'settings',
    key: 'S',
    label: 'Settings',
    icon: <Settings />,
    title: 'Settings',
    description: 'Workspace, members and notifications.',
    rows: [
      { title: 'Workspace', meta: 'Name, URL and logo' },
      { title: 'Members', meta: '8 people, 2 pending invites' },
      { title: 'Notifications', meta: 'Email and push' },
    ],
  },
];

const navigation: Command[] = pages.map((page) => ({
  id: `go-${page.id}`,
  group: 'Navigation',
  label: `Go to ${page.label}`,
  description: page.description,
  icon: page.icon,
  shortcut: ['G', page.key],
  page: page.id,
}));

const actions: Command[] = [
  { id: 'new-issue', group: 'Actions', label: 'Create issue', description: 'Add an issue to the current project', icon: <Plus />, keywords: 'new bug task', shortcut: ['C'], message: { title: 'Issue created', text: 'ACME-142 was added to Billing v2.' } },
  { id: 'invite', group: 'Actions', label: 'Invite people', description: 'Send invitations by email', icon: <UserPlus />, keywords: 'member team add', message: { title: 'Invite link ready', text: 'Anyone with the link can join Acme for 7 days.' } },
  { id: 'copy-link', group: 'Actions', label: 'Copy page link', description: 'Copy a link to this page', icon: <Link2 />, keywords: 'url share', shortcut: ['⌘', '⇧', 'C'], message: { title: 'Link copied', text: 'acme.app/workspace is on your clipboard.' } },
];

const settings: Command[] = [
  { id: 'theme', group: 'Settings', label: 'Change theme…', description: 'Light, dark or match your system', icon: <Palette />, keywords: 'appearance dark light mode', opens: 'theme' },
  { id: 'notifications', group: 'Settings', label: 'Notification settings', description: 'Choose what you’re notified about', icon: <Bell />, keywords: 'email push alerts', page: 'settings' },
  { id: 'shortcuts', group: 'Settings', label: 'Keyboard shortcuts', description: 'See every shortcut', icon: <Keyboard />, keywords: 'keys hotkeys', shortcut: ['?'], message: { title: 'Keyboard shortcuts', text: 'Press ⌘K to search, G then a letter to jump, C to create an issue.' } },
];

const themes: Command[] = [
  { id: 'theme-light', group: 'Theme', label: 'Light', description: 'Always use the light theme', icon: <Sun />, theme: 'light' },
  { id: 'theme-dark', group: 'Theme', label: 'Dark', description: 'Always use the dark theme', icon: <Moon />, theme: 'dark' },
  { id: 'theme-system', group: 'Theme', label: 'System', description: 'Follow your device settings', icon: <Monitor />, theme: 'system' },
];

const recentIds = ['go-issues', 'new-issue', 'theme'];

const everything = [...navigation, ...actions, ...settings];

const recent: Command[] = recentIds
  .map((commandId) => everything.find((command) => command.id === commandId))
  .filter((command) => command !== undefined)
  .map((command) => ({ ...command, id: `recent-${command.id}`, group: 'Recent', icon: <Clock /> }));

const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;
const secondary = { color: 'var(--label-secondary)' } as const;

const matchLabel = (label: string, query: string) => {
  const indices: number[] = [];
  const text = label.toLowerCase();
  let from = 0;

  for (const char of query) {
    const index = text.indexOf(char, from);

    if (index === -1) return null;

    indices.push(index);
    from = index + 1;
  }

  const gaps = indices.reduce((sum, index, position) => (position === 0 ? index : sum + index - indices[position - 1] - 1), 0);

  return { indices, score: gaps };
};

const search = (commands: Command[], query: string): Match[] => {
  const term = query.trim().toLowerCase().replace(/\s+/g, ' ');

  if (term === '') return commands.map((command) => ({ command, indices: [], score: 0 }));

  const matches: Match[] = [];

  for (const command of commands) {
    const label = matchLabel(command.label, term);

    if (label) {
      matches.push({ command, indices: label.indices, score: label.score });
      continue;
    }

    if (`${command.description} ${command.keywords ?? ''}`.toLowerCase().includes(term)) {
      matches.push({ command, indices: [], score: 100 });
    }
  }

  return matches.sort((a, b) => a.score - b.score);
};

const Highlight = ({ text, indices }: { text: string, indices: number[] }) => {
  if (indices.length === 0) return text;

  return [...text].map((char, index) => (indices.includes(index) ? <mark key={index} className='paletteMark'>{char}</mark> : char));
};

const Kbd = ({ keys, isMac }: { keys: string[], isMac: boolean }) => (
  <span className='paletteKeys' aria-hidden='true'>
    {keys.map((key) => (
      <kbd key={key} className='paletteKbd'>{key === '⌘' && !isMac ? 'Ctrl' : key}</kbd>
    ))}
  </span>
);

export default function CommandPalette() {
  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isMac, setIsMac] = useState(true);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [nested, setNested] = useState(false);
  const [active, setActive] = useState(0);
  const [page, setPage] = useState<PageId>('home');
  const [theme, setTheme] = useState<Theme>('system');
  const [notice, setNotice] = useState<{ title: string, text: string } | null>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      if (!(event.target instanceof Node)) return;

      const inside = rootRef.current?.contains(event.target) || dialogRef.current?.contains(event.target);
      if (!inside) return;

      event.preventDefault();
      event.stopPropagation();
      setQuery('');
      setNested(false);
      setActive(0);
      setOpen((value) => !value);
    };

    window.addEventListener('keydown', onKeyDown, true);

    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, open, query, nested]);

  const groups: Group[] = nested ? ['Theme'] : ['Recent', 'Navigation', 'Actions', 'Settings'];
  const source = nested ? themes : [...(query.trim() === '' ? recent : []), ...everything];
  const matches = search(source, query);
  const ordered = groups.flatMap((group) => matches.filter((match) => match.command.group === group));
  const current = pages.find((item) => item.id === page) ?? pages[0];
  const activeMatch = ordered[Math.min(active, ordered.length - 1)];
  const shortcut = isMac ? '⌘K' : 'Ctrl K';

  const changeOpen = (next: boolean) => {
    setOpen(next);
    setQuery('');
    setNested(false);
    setActive(0);
  };

  const changeQuery = (value: string) => {
    setQuery(value);
    setActive(0);
  };

  const run = (command: Command) => {
    if (command.opens === 'theme') {
      setNested(true);
      setQuery('');
      setActive(themes.findIndex((item) => item.theme === theme));
      return;
    }

    changeOpen(false);

    if (command.theme) {
      setTheme(command.theme);
      setNotice({ title: 'Theme updated', text: `Acme now uses the ${command.label.toLowerCase()} theme.` });
      return;
    }

    if (command.page) {
      setPage(command.page);
      setNotice(null);
      return;
    }

    if (command.message) setNotice(command.message);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && nested && query === '') {
      event.preventDefault();
      setNested(false);
      setActive(0);
      return;
    }

    if (ordered.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((active + 1) % ordered.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((active - 1 + ordered.length) % ordered.length);
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setActive(event.key === 'Home' ? 0 : ordered.length - 1);
      return;
    }

    if (event.key === 'Enter' && activeMatch) {
      event.preventDefault();
      run(activeMatch.command);
    }
  };

  return (
    <div ref={rootRef} className='palette' tabIndex={-1}>
      <header className='paletteTopBar'>
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minWidth: 0 }}>
          <span aria-hidden='true' className='paletteLogo'>A</span>
          <Text size={3} fontWeight={600} className='paletteBrand'>Acme</Text>
        </span>
        <button type='button' className='paletteTrigger' aria-keyshortcuts='Meta+K Control+K' onClick={() => changeOpen(true)}>
          <Icon size='xs' aria-hidden='true'><Search /></Icon>
          <span className='paletteTriggerLabel'>Search or jump to…</span>
          <kbd className='paletteKbd' aria-hidden='true'>{shortcut}</kbd>
        </button>
        <Avatar size='sm' role='img' aria-label='Dana Whitfield'>
          <AvatarFallback>DW</AvatarFallback>
        </Avatar>
      </header>

      <div className='paletteBody'>
        <nav aria-label='Workspace' className='paletteSidebar'>
          <ul style={{ display: 'grid', gap: 'var(--spacing-1)', margin: 0, padding: 0, listStyle: 'none' }}>
            {pages.map((item) => (
              <li key={item.id}>
                <button
                  type='button'
                  className='paletteNavItem'
                  aria-current={item.id === page ? 'page' : undefined}
                  onClick={() => {
                    setPage(item.id);
                    setNotice(null);
                  }}
                >
                  <Icon size='sm' aria-hidden='true'>{item.icon}</Icon>
                  <span className='paletteNavLabel'>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby={`${id}-page`} className='paletteContent'>
          <div role='status'>
            {notice && (
              <Alert variant='success' className='paletteNotice'>
                <AlertIcon />
                <AlertMain>
                  <AlertTitle>{notice.title}</AlertTitle>
                  <AlertContent>{notice.text}</AlertContent>
                </AlertMain>
                <IconButton size='xs' aria-label='Dismiss' variant='secondary' appearance='ghost' style={{ ...closeButton, alignSelf: 'flex-start' }} onClick={() => setNotice(null)}>
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </Alert>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--spacing-4) var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-2)', minWidth: 0 }}>
              <Heading id={`${id}-page`} as='h1' size={6} fontWeight={700}>{current.title}</Heading>
              <Text size={3} style={secondary}>{current.description}</Text>
            </div>
            <Badge size='sm' variant='info' appearance='outline'>{`Theme: ${theme[0].toUpperCase()}${theme.slice(1)}`}</Badge>
          </div>
          <ul className='paletteRows'>
            {current.rows.map((row) => (
              <li key={row.title} className='paletteRow'>
                <Text size={3} fontWeight={500} style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{row.title}</Text>
                <Text size={2} style={secondary}>{row.meta}</Text>
              </li>
            ))}
          </ul>
          <Text size={2} style={{ color: 'var(--label-tertiary)' }}>
            {`Press ${shortcut} anywhere in this app to search pages, run actions or change settings.`}
          </Text>
        </section>
      </div>

      <Dialog open={open} onChangeOpen={changeOpen}>
        <DialogContent ref={dialogRef} aria-label='Command palette' className='paletteDialog'>
          <div className='paletteSearch'>
            {nested && (
              <IconButton size='xs' aria-label='Back to all commands' variant='secondary' appearance='ghost' onClick={() => setNested(false)}>
                <Icon size='xs' className='paletteBack'><ChevronLeft /></Icon>
              </IconButton>
            )}
            {nested && <Badge size='sm' variant='info' appearance='outline' style={{ flexShrink: 0 }}>Theme</Badge>}
            <TextField size='sm' className='paletteField'>
              {!nested && <Icon size='xs' aria-hidden='true' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)', color: 'var(--label-secondary)' }}><Search /></Icon>}
              <TextFieldInput
                role='combobox'
                autoComplete='off'
                spellCheck={false}
                autoFocus
                aria-label={nested ? 'Choose a theme' : 'Search commands'}
                aria-expanded='true'
                aria-controls={listId}
                aria-autocomplete='list'
                aria-activedescendant={activeMatch ? `${listId}-${activeMatch.command.id}` : undefined}
                aria-describedby={`${id}-hint`}
                placeholder={nested ? 'Choose a theme…' : 'Type a command or search…'}
                value={query}
                onChange={(event) => changeQuery(event.currentTarget.value)}
                onKeyDown={onInputKeyDown}
              />
            </TextField>
            <DialogClose asChild>
              <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>

          <div ref={listRef} role='listbox' id={listId} aria-label={nested ? 'Themes' : 'Commands'} className='paletteList'>
            {groups.map((group) => {
              const items = ordered.filter((match) => match.command.group === group);

              if (items.length === 0) return null;

              return (
                <div key={group} role='group' aria-labelledby={`${id}-${group}`} className='paletteGroup'>
                  <Text id={`${id}-${group}`} size={1} fontWeight={600} className='paletteGroupLabel'>{group}</Text>
                  {items.map((match) => {
                    const index = ordered.indexOf(match);
                    const { command } = match;
                    const selected = command.theme !== undefined && command.theme === theme;

                    return (
                      <Option
                        key={command.id}
                        id={`${listId}-${command.id}`}
                        size='sm'
                        active={index === active}
                        className='paletteOption'
                        style={{ '--option-height': 'var(--spacing-24)' } as CSSProperties}
                        onMouseDown={(event) => event.preventDefault()}
                        onPointerMove={() => setActive(index)}
                        onClick={() => run(command)}
                      >
                        <Icon size='sm' aria-hidden='true' className='paletteOptionIcon'>{command.icon}</Icon>
                        <span style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                          <Text size={3} className='paletteOptionLabel'><Highlight text={command.label} indices={match.indices} /></Text>
                          <Text size={1} className='paletteOptionDescription'>{command.description}</Text>
                        </span>
                        {selected && (
                          <>
                            <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--color-primary-500)' }}><Check /></Icon>
                            <VisuallyHidden>, current</VisuallyHidden>
                          </>
                        )}
                        {command.shortcut && <Kbd keys={command.shortcut} isMac={isMac} />}
                      </Option>
                    );
                  })}
                </div>
              );
            })}
            {ordered.length === 0 && (
              <div role='status' className='paletteEmpty'>
                <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{`No results for “${query.trim()}”`}</Text>
                <Text size={2} style={secondary}>Try a page name like “issues”, or an action like “invite”.</Text>
              </div>
            )}
          </div>

          <div id={`${id}-hint`} className='paletteFooter'>
            <span><kbd className='paletteKbd'>↑</kbd><kbd className='paletteKbd'>↓</kbd> to move</span>
            <span><kbd className='paletteKbd'>↵</kbd> to run</span>
            {nested
              ? <span><kbd className='paletteKbd'>⌫</kbd> to go back</span>
              : <span><kbd className='paletteKbd'>esc</kbd> to close</span>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
