import { useEffect, useId, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Link,
  Meter,
  MeterTrack,
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
  TextField,
  TextFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronRight,
  Copy,
  Download,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Folder,
  FolderInput,
  FolderPlus,
  LayoutGrid,
  List,
  Pencil,
  Share2,
  Trash2,
  Upload,
  XIcon,
} from '@vega-ui/icons';
import './file-manager.css';

type Kind = 'folder' | 'doc' | 'sheet' | 'image' | 'pdf' | 'video' | 'archive';
type SortKey = 'name' | 'modified' | 'size';

interface Item {
  id: string
  name: string
  kind: Kind
  parent: string
  owner: string
  modified: number
  size: number
}

const ROOT = 'root';
const ME = 'elena';
const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;
const QUOTA = 15 * GB;
const BACKUPS = 8.6 * GB;
const NOW = Date.parse('2026-11-04T10:30:00Z');

const people: Record<string, { name: string, initials: string }> = {
  elena: { name: 'Elena Moreau', initials: 'EM' },
  omar: { name: 'Omar Haddad', initials: 'OH' },
  lena: { name: 'Lena Fischer', initials: 'LF' },
};

const kinds: Record<Kind, { label: string, icon: ReactNode, color: string }> = {
  folder: { label: 'Folder', icon: <Folder />, color: 'var(--color-primary-500)' },
  doc: { label: 'Document', icon: <FileText />, color: 'var(--color-sapphirine-accent-500)' },
  sheet: { label: 'Spreadsheet', icon: <FileSpreadsheet />, color: 'var(--color-green-accent-500)' },
  image: { label: 'Image', icon: <FileImage />, color: 'var(--color-amber-accent-500)' },
  pdf: { label: 'PDF', icon: <FileText />, color: 'var(--color-red-accent-500)' },
  video: { label: 'Video', icon: <FileVideo />, color: 'var(--color-purple-accent-500)' },
  archive: { label: 'Archive', icon: <FileArchive />, color: 'var(--label-secondary)' },
};

const extensions: Record<string, Kind> = {
  doc: 'doc', docx: 'doc', txt: 'doc', md: 'doc',
  xls: 'sheet', xlsx: 'sheet', csv: 'sheet',
  png: 'image', jpg: 'image', jpeg: 'image', gif: 'image', svg: 'image', webp: 'image',
  pdf: 'pdf',
  mp4: 'video', mov: 'video', webm: 'video',
  zip: 'archive', rar: 'archive', gz: 'archive',
};

const at = (date: string) => Date.parse(`${date}Z`);

const initialItems: Item[] = [
  { id: 'design', name: 'Design', kind: 'folder', parent: ROOT, owner: 'elena', modified: at('2026-11-03T15:20'), size: 0 },
  { id: 'marketing', name: 'Marketing', kind: 'folder', parent: ROOT, owner: 'omar', modified: at('2026-10-28T11:05'), size: 0 },
  { id: 'finance', name: 'Finance', kind: 'folder', parent: ROOT, owner: 'omar', modified: at('2026-10-12T09:40'), size: 0 },
  { id: 'roadmap', name: 'Q4 roadmap.pdf', kind: 'pdf', parent: ROOT, owner: 'elena', modified: at('2026-11-04T09:12'), size: 3.2 * MB },
  { id: 'offsite', name: 'Team offsite.jpg', kind: 'image', parent: ROOT, owner: 'lena', modified: at('2026-10-30T17:48'), size: 5.8 * MB },
  { id: 'notes', name: 'Interview notes.docx', kind: 'doc', parent: ROOT, owner: 'elena', modified: at('2026-11-02T14:02'), size: 312 * KB },
  { id: 'pricing', name: 'Pricing model.xlsx', kind: 'sheet', parent: ROOT, owner: 'omar', modified: at('2026-10-21T08:30'), size: 680 * KB },
  { id: 'brand', name: 'Brand assets', kind: 'folder', parent: 'design', owner: 'omar', modified: at('2026-10-19T10:00'), size: 0 },
  { id: 'flows', name: 'Checkout v3 flows.pdf', kind: 'pdf', parent: 'design', owner: 'lena', modified: at('2026-11-03T15:20'), size: 12.6 * MB },
  { id: 'session', name: 'Usability session 1.mp4', kind: 'video', parent: 'design', owner: 'lena', modified: at('2026-11-01T13:15'), size: 418 * MB },
  { id: 'empty', name: 'Empty states.png', kind: 'image', parent: 'design', owner: 'elena', modified: at('2026-10-29T16:40'), size: 2.1 * MB },
  { id: 'logo', name: 'logo-primary.svg', kind: 'image', parent: 'brand', owner: 'omar', modified: at('2026-10-19T10:00'), size: 48 * KB },
  { id: 'guidelines', name: 'Brand guidelines.pdf', kind: 'pdf', parent: 'brand', owner: 'omar', modified: at('2026-10-18T12:25'), size: 8.4 * MB },
  { id: 'launch', name: 'Launch plan.docx', kind: 'doc', parent: 'marketing', owner: 'omar', modified: at('2026-10-28T11:05'), size: 840 * KB },
  { id: 'campaign', name: 'Campaign assets.zip', kind: 'archive', parent: 'marketing', owner: 'lena', modified: at('2026-10-24T09:50'), size: 156 * MB },
  { id: 'budget', name: 'Q4 budget.xlsx', kind: 'sheet', parent: 'finance', owner: 'omar', modified: at('2026-10-12T09:40'), size: 1.2 * MB },
  { id: 'invoices', name: 'Invoices 2026.zip', kind: 'archive', parent: 'finance', owner: 'omar', modified: at('2026-10-02T18:10'), size: 24 * MB },
];

const dayFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

const field = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;
const dialogHeader = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' } as const;
const actions = { display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' } as const;
const ghost = { variant: 'secondary', appearance: 'ghost' } as const;
const quiet = { variant: 'secondary', appearance: 'transparent' } as const;
const nowrap = { whiteSpace: 'nowrap' } as const;
const tabular = { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' } as const;

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

const formatSize = (bytes: number) => {
  if (bytes < MB) return `${Math.max(1, Math.round(bytes / KB))} KB`;
  if (bytes < GB) return `${numberFormat.format(bytes / MB)} MB`;

  return `${numberFormat.format(bytes / GB)} GB`;
};

const formatModified = (time: number) => {
  if (dayFormat.format(time) === dayFormat.format(NOW)) return `Today, ${timeFormat.format(time)}`;

  return dayFormat.format(time);
};

const kindOf = (name: string): Kind => extensions[name.split('.').pop()?.toLowerCase() ?? ''] ?? 'doc';

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

export default function FileManager() {
  const id = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pendingFocus = useRef(false);
  const nextId = useRef(0);
  const [items, setItems] = useState(initialItems);
  const [folder, setFolder] = useState(ROOT);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [sort, setSort] = useState<{ key: SortKey, direction: 'ascending' | 'descending' }>({ key: 'name', direction: 'ascending' });
  const [selected, setSelected] = useState<string[]>([]);
  const [naming, setNaming] = useState<{ mode: 'create' | 'rename', item?: Item } | null>(null);
  const [nameError, setNameError] = useState('');
  const [moveOpen, setMoveOpen] = useState(false);
  const [destination, setDestination] = useState(ROOT);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [linkShared, setLinkShared] = useState<Record<string, boolean>>({ roadmap: true });
  const [copied, setCopied] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!pendingFocus.current) return;

    pendingFocus.current = false;
    headingRef.current?.focus();
  });

  const sizeOf = (item: Item): number => {
    if (item.kind !== 'folder') return item.size;

    return items.filter((child) => child.parent === item.id).reduce((total, child) => total + sizeOf(child), 0);
  };

  const pathTo = (target: string): Item[] => {
    const item = items.find((entry) => entry.id === target);
    if (!item) return [];

    return [...pathTo(item.parent), item];
  };

  const descendants = (target: string): string[] => items
    .filter((item) => item.parent === target)
    .flatMap((item) => [item.id, ...descendants(item.id)]);

  const path = pathTo(folder);
  const title = path.at(-1)?.name ?? 'My files';
  const used = BACKUPS + items.reduce((total, item) => total + item.size, 0);

  const compare = (a: Item, b: Item) => {
    if (a.kind === 'folder' && b.kind !== 'folder') return -1;
    if (a.kind !== 'folder' && b.kind === 'folder') return 1;

    let result = a.name.localeCompare(b.name, 'en', { numeric: true });
    if (sort.key === 'modified') result = a.modified - b.modified;
    if (sort.key === 'size') result = sizeOf(a) - sizeOf(b);

    return sort.direction === 'ascending' ? result : -result;
  };

  const visible = items.filter((item) => item.parent === folder).sort(compare);
  const visibleIds = visible.map((item) => item.id);
  const chosen = selected.filter((item) => visibleIds.includes(item));
  const allSelected = visible.length > 0 && chosen.length === visible.length;
  const someSelected = chosen.length > 0 && !allSelected;
  const chosenItems = visible.filter((item) => chosen.includes(item.id));
  const blocked = [...chosen, ...chosen.flatMap(descendants), folder];
  const folders = [
    { id: ROOT, label: 'My files' },
    ...items
      .filter((item) => item.kind === 'folder')
      .map((item) => ({ id: item.id, label: pathTo(item.id).map((entry) => entry.name).join(' / ') })),
  ].filter((entry) => !blocked.includes(entry.id));

  const breakdown = (['doc', 'sheet', 'pdf', 'image', 'video', 'archive'] as Kind[])
    .map((kind) => ({ kind, size: items.filter((item) => item.kind === kind).reduce((total, item) => total + item.size, 0) }))
    .filter((entry) => entry.size > 0);

  const openFolder = (target: string) => {
    setFolder(target);
    setSelected([]);
    pendingFocus.current = true;
  };

  const toggle = (target: string) => {
    if (chosen.includes(target)) {
      setSelected(chosen.filter((item) => item !== target));
      return;
    }

    setSelected([...chosen, target]);
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }

    setSelected(visibleIds);
  };

  const sortBy = (key: SortKey) => {
    if (sort.key === key) {
      setSort({ key, direction: sort.direction === 'ascending' ? 'descending' : 'ascending' });
      return;
    }

    setSort({ key, direction: key === 'name' ? 'ascending' : 'descending' });
  };

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = [...(event.currentTarget.files ?? [])];
    event.currentTarget.value = '';
    if (files.length === 0) return;

    const added = files.map((file): Item => ({
      id: `upload-${nextId.current++}`,
      name: file.name,
      kind: kindOf(file.name),
      parent: folder,
      owner: ME,
      modified: NOW + nextId.current * 1000,
      size: file.size,
    }));

    setItems((current) => [...current, ...added]);
    setNotice(files.length === 1 ? `${files[0].name} uploaded.` : `${files.length} files uploaded.`);
  };

  const openNaming = (mode: 'create' | 'rename', item?: Item) => {
    setNameError('');
    setNaming({ mode, item });
  };

  const submitName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!naming) return;

    const form = event.currentTarget;
    const name = String(new FormData(form).get('name')).trim();
    const taken = items.some((item) => item.parent === folder && item.id !== naming.item?.id && item.name.toLowerCase() === name.toLowerCase());
    let error = '';

    if (name === '') error = 'Enter a name.';
    if (name.includes('/')) error = 'Names can’t contain a slash (/).';
    if (error === '' && taken) error = `There’s already an item called “${name}” here.`;

    setNameError(error);

    if (error !== '') {
      const input = form.elements.namedItem('name');
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    if (naming.mode === 'rename' && naming.item) {
      const target = naming.item;
      setItems((current) => current.map((item) => item.id === target.id ? { ...item, name, kind: item.kind === 'folder' ? 'folder' : kindOf(name), modified: NOW } : item));
      setNotice(`Renamed to ${name}.`);
    }

    if (naming.mode === 'create') {
      setItems((current) => [...current, { id: `folder-${nextId.current++}`, name, kind: 'folder', parent: folder, owner: ME, modified: NOW, size: 0 }]);
      setNotice(`Folder ${name} created.`);
    }

    setNaming(null);
  };

  const openMove = () => {
    setDestination(folders[0]?.id ?? ROOT);
    setMoveOpen(true);
  };

  const moveSelected = () => {
    const label = folders.find((entry) => entry.id === destination)?.label ?? 'My files';

    setItems((current) => current.map((item) => chosen.includes(item.id) ? { ...item, parent: destination } : item));
    setSelected([]);
    setNotice(`${plural(chosen.length, 'item')} moved to ${label}.`);
  };

  const deleteSelected = () => {
    const removed = [...chosen, ...chosen.flatMap(descendants)];

    setItems((current) => current.filter((item) => !removed.includes(item.id)));
    setSelected([]);
    setNotice(`${plural(chosen.length, 'item')} moved to Trash.`);
  };

  const focusHeading = () => {
    if (chosen.length > 0) return;

    headingRef.current?.focus();
  };

  const download = () => {
    setNotice(chosen.length === 1 ? `Downloading ${chosenItems[0].name}.` : `Preparing a zip of ${plural(chosen.length, 'item')}.`);
  };

  const copyLink = (item: Item) => {
    navigator.clipboard?.writeText(`https://files.northwind.example/f/${item.id}`).catch(() => {});
    setCopied(item.id);
  };

  const sortIcon = (key: SortKey) => {
    if (sort.key !== key) return <ArrowUpDown />;

    return sort.direction === 'ascending' ? <ArrowUp /> : <ArrowDown />;
  };

  const sortHeading = (key: SortKey, label: string, align: 'start' | 'end', className?: string) => (
    <TableHeading scope='col' dataAlign={align} className={className} aria-sort={sort.key === key ? sort.direction : undefined}>
      <Button size='xs' type='button' {...quiet} className='fm-sort' data-active={sort.key === key} onClick={() => sortBy(key)}>
        {label}
        <Icon size='xs' aria-hidden='true' className='fm-sort-icon'>{sortIcon(key)}</Icon>
      </Button>
    </TableHeading>
  );

  const selectBox = (item: Item) => (
    <Checkbox size='sm'>
      <CheckboxInput aria-label={`Select ${item.name}`} checked={chosen.includes(item.id)} onChange={() => toggle(item.id)} />
      <CheckboxIndicator>
        <CheckboxCheckedIcon />
      </CheckboxIndicator>
    </Checkbox>
  );

  const typeIcon = (item: Item, size: 'sm' | 'lg') => (
    <Icon size={size} aria-hidden='true' style={{ flexShrink: 0, color: kinds[item.kind].color }}>{kinds[item.kind].icon}</Icon>
  );

  const itemName = (item: Item) => {
    if (item.kind !== 'folder') return <Text size={3} fontWeight={500} className='fm-name'>{item.name}</Text>;

    return (
      <Link
        href={`?folder=${item.id}`}
        className='fm-name'
        style={{ fontWeight: 500 }}
        onClick={(event) => {
          event.preventDefault();
          openFolder(item.id);
        }}
      >
        {item.name}
      </Link>
    );
  };

  const owner = (item: Item) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0 }}>
        <AvatarFallback>{people[item.owner].initials}</AvatarFallback>
      </Avatar>
      <Text size={2} style={nowrap}>{item.owner === ME ? 'You' : people[item.owner].name}</Text>
    </span>
  );

  const itemActions = (item: Item) => (
    <span style={{ display: 'inline-flex', gap: 'var(--spacing-1)' }}>
      <Popover role='dialog' placement='bottom-end' onChangeOpen={(open) => open && setCopied('')}>
        <PopoverTrigger asChild>
          <IconButton size='xs' type='button' {...quiet} aria-label={`Share ${item.name}`}>
            <Icon size='sm'><Share2 /></Icon>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent aria-labelledby={`${id}-${item.id}-share`} style={{ width: 'min(340px, calc(100vw - 32px))', padding: 'var(--spacing-8)', boxSizing: 'border-box', textAlign: 'start' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-${item.id}-share`} as='h2' size={3} fontWeight={600} style={{ overflowWrap: 'anywhere' }}>{`Share “${item.name}”`}</Heading>
            <ul aria-label='People with access' style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none' }}>
              {Object.keys(people).map((person) => (
                <li key={person} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-5)' }}>
                  <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0 }}>
                    <AvatarFallback>{people[person].initials}</AvatarFallback>
                  </Avatar>
                  <Text size={3} style={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>{person === ME ? `${people[person].name} (you)` : people[person].name}</Text>
                  <Text size={2} style={{ ...nowrap, color: 'var(--label-secondary)' }}>
                    {person === item.owner ? 'Owner' : person === 'lena' ? 'Can view' : 'Can edit'}
                  </Text>
                </li>
              ))}
            </ul>
            <Separator />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                <Label htmlFor={`${id}-${item.id}-link`}>Anyone with the link</Label>
                <Text id={`${id}-${item.id}-link-hint`} size={2} style={{ color: 'var(--label-secondary)' }}>
                  {linkShared[item.id] ? 'Anyone with the link can view.' : 'Only people above can open it.'}
                </Text>
              </div>
              <Switch style={{ flexShrink: 0 }}>
                <SwitchInput
                  id={`${id}-${item.id}-link`}
                  checked={linkShared[item.id] ?? false}
                  aria-describedby={`${id}-${item.id}-link-hint`}
                  onChange={(event) => setLinkShared({ ...linkShared, [item.id]: event.currentTarget.checked })}
                />
                <SwitchIndicator />
              </Switch>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-6)' }}>
              <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{copied === item.id ? 'Link copied' : ''}</Text>
              <Button size='xs' type='button' {...ghost} style={{ gap: 'var(--spacing-2)' }} onClick={() => copyLink(item)}>
                <Icon size='xs' aria-hidden='true'><Copy /></Icon>
                Copy link
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <IconButton size='xs' type='button' {...quiet} aria-label={`Rename ${item.name}`} onClick={() => openNaming('rename', item)}>
        <Icon size='sm'><Pencil /></Icon>
      </IconButton>
    </span>
  );

  const empty = (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-3)', padding: 'var(--spacing-24) var(--spacing-8)', textAlign: 'center' }}>
      <Icon size='lg' aria-hidden='true' style={{ color: 'var(--label-tertiary)' }}><Folder /></Icon>
      <Text size={3} fontWeight={500}>This folder is empty</Text>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Upload files or create a folder to get started.</Text>
    </div>
  );

  return (
    <div className='fm-root' style={{ width: '100%', maxWidth: 1120, marginInline: 'auto' }}>
      <div className='fm-layout'>
        <section className='fm-main' aria-labelledby={`${id}-title`}>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <nav aria-label='Breadcrumb'>
              <ol className='fm-crumbs'>
                {[{ id: ROOT, name: 'My files' }, ...path].map((entry, index, all) => (
                  <li key={entry.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', minWidth: 0 }}>
                    {index > 0 && <Icon size='xs' aria-hidden='true' className='fm-mirror' style={{ flexShrink: 0, color: 'var(--label-tertiary)' }}><ChevronRight /></Icon>}
                    {index === all.length - 1
                      ? <Text size={2} aria-current='page' style={{ ...nowrap, color: 'var(--label-secondary)' }}>{entry.name}</Text>
                      : (
                          <Link
                            href={`?folder=${entry.id}`}
                            style={{ ...nowrap, fontSize: 'var(--font-size-2)' }}
                            onClick={(event) => {
                              event.preventDefault();
                              openFolder(entry.id);
                            }}
                          >
                            {entry.name}
                          </Link>
                        )}
                  </li>
                ))}
              </ol>
            </nav>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6) var(--spacing-8)' }}>
              <Heading ref={headingRef} tabIndex={-1} id={`${id}-title`} as='h1' size={6} fontWeight={700} style={{ outline: 'none', overflowWrap: 'anywhere' }}>{title}</Heading>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                <Button size='xs' type='button' {...ghost} style={{ gap: 'var(--spacing-2)' }} onClick={() => openNaming('create')}>
                  <Icon size='xs' aria-hidden='true'><FolderPlus /></Icon>
                  New folder
                </Button>
                <Button size='xs' asChild style={{ gap: 'var(--spacing-2)' }}>
                  <label className='fm-upload'>
                    <Icon size='xs' aria-hidden='true'><Upload /></Icon>
                    Upload
                    <input type='file' multiple className='fm-file-input' onChange={upload} />
                  </label>
                </Button>
                <SegmentedControl size='xs' name={`${id}-view`} role='radiogroup' aria-label='View' value={view} onChange={(event) => setView(event.currentTarget.value === 'grid' ? 'grid' : 'list')}>
                  <SegmentedControlItem value='list'>
                    <SegmentedControlItemInput aria-label='List view' />
                    <Icon size='xs'><List /></Icon>
                  </SegmentedControlItem>
                  <SegmentedControlItem value='grid'>
                    <SegmentedControlItemInput aria-label='Grid view' />
                    <Icon size='xs'><LayoutGrid /></Icon>
                  </SegmentedControlItem>
                  <SegmentedControlIndicator />
                </SegmentedControl>
              </div>
            </div>
          </div>

          <div className='fm-bar' data-active={chosen.length > 0}>
            {chosen.length === 0 && (
              <Text size={2} style={{ ...tabular, color: 'var(--label-secondary)' }}>
                {`${plural(visible.length, 'item')} · ${formatSize(visible.reduce((total, item) => total + sizeOf(item), 0))}`}
              </Text>
            )}
            {chosen.length > 0 && (
              <>
                <IconButton size='xs' type='button' {...quiet} aria-label='Clear selection' onClick={() => setSelected([])}>
                  <Icon size='sm'><XIcon /></Icon>
                </IconButton>
                <Text size={2} fontWeight={600} style={tabular}>{`${chosen.length} selected`}</Text>
                <div role='toolbar' aria-label='Selected items' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)', marginInlineStart: 'auto' }}>
                  <Button size='xs' type='button' {...quiet} style={{ gap: 'var(--spacing-2)' }} onClick={download}>
                    <Icon size='xs' aria-hidden='true'><Download /></Icon>
                    Download
                  </Button>
                  <Button size='xs' type='button' {...quiet} style={{ gap: 'var(--spacing-2)' }} disabled={folders.length === 0} onClick={openMove}>
                    <Icon size='xs' aria-hidden='true'><FolderInput /></Icon>
                    Move
                  </Button>
                  <Button size='xs' type='button' {...quiet} className='fm-danger' style={{ gap: 'var(--spacing-2)' }} onClick={() => setDeleteOpen(true)}>
                    <Icon size='xs' aria-hidden='true'><Trash2 /></Icon>
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>

          {view === 'list' && (
            <div
              role='region'
              aria-label={`Files in ${title}`}
              tabIndex={0}
              style={{ minWidth: 0, overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}
            >
              <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
                <TableHead>
                  <TableRow>
                    <TableHeading scope='col' dataAlign='start' style={{ width: 32 }}>
                      <Checkbox size='sm'>
                        <CheckboxInput aria-label='Select all items' checked={allSelected} indeterminate={someSelected} disabled={visible.length === 0} onChange={toggleAll} />
                        <CheckboxIndicator>
                          <CheckboxCheckedIcon />
                          <CheckboxIndeterminateIcon />
                        </CheckboxIndicator>
                      </Checkbox>
                    </TableHeading>
                    {sortHeading('name', 'Name', 'start')}
                    <TableHeading scope='col' dataAlign='start' className='fm-owner'>Owner</TableHeading>
                    {sortHeading('modified', 'Modified', 'start', 'fm-modified')}
                    {sortHeading('size', 'Size', 'end', 'fm-size')}
                    <TableHeading scope='col' dataAlign='end'><VisuallyHidden>Actions</VisuallyHidden></TableHeading>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visible.map((item) => (
                    <TableRow key={item.id} data-selected={chosen.includes(item.id)} className='fm-row'>
                      <TableData dataAlign='start'>{selectBox(item)}</TableData>
                      <TableData dataAlign='start' style={{ width: '100%', maxWidth: 0 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-5)', minWidth: 0 }}>
                          {typeIcon(item, 'sm')}
                          <span style={{ display: 'grid', minWidth: 0 }}>
                            {itemName(item)}
                            <Text size={2} className='fm-meta' style={{ ...tabular, color: 'var(--label-secondary)' }}>{`${formatSize(sizeOf(item))} · ${formatModified(item.modified)}`}</Text>
                          </span>
                        </span>
                      </TableData>
                      <TableData dataAlign='start' className='fm-owner'>{owner(item)}</TableData>
                      <TableData dataAlign='start' className='fm-modified' style={{ ...tabular, color: 'var(--label-secondary)' }}>{formatModified(item.modified)}</TableData>
                      <TableData dataAlign='end' className='fm-size' style={{ ...tabular, color: 'var(--label-secondary)' }}>{formatSize(sizeOf(item))}</TableData>
                      <TableData dataAlign='end'>{itemActions(item)}</TableData>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {visible.length === 0 && empty}
            </div>
          )}

          {view === 'grid' && visible.length === 0 && <Card>{empty}</Card>}
          {view === 'grid' && visible.length > 0 && (
            <ul aria-label={`Files in ${title}`} className='fm-grid'>
              {visible.map((item) => (
                <li key={item.id} className='fm-tile' data-selected={chosen.includes(item.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
                    {selectBox(item)}
                    {itemActions(item)}
                  </div>
                  <span className='fm-preview' style={{ color: kinds[item.kind].color }}>{typeIcon(item, 'lg')}</span>
                  <span style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                    {itemName(item)}
                    <Text size={2} style={{ ...tabular, color: 'var(--label-secondary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {`${formatSize(sizeOf(item))} · ${formatModified(item.modified)}`}
                    </Text>
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Text size={2} role='status' style={{ color: 'var(--label-secondary)', minBlockSize: 'var(--line-height-2)' }}>{notice}</Text>
        </section>

        <aside aria-labelledby={`${id}-storage`} className='fm-aside'>
          <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              <Heading id={`${id}-storage`} as='h2' size={3} fontWeight={600}>Storage</Heading>
              <Meter value={used} max={QUOTA} high={QUOTA * 0.9} valueText={`${formatSize(used)} of ${formatSize(QUOTA)} used`} aria-labelledby={`${id}-storage`} fullWidth>
                <MeterTrack />
              </Meter>
              <Text size={2} style={{ ...tabular, color: 'var(--label-secondary)' }}>{`${formatSize(used)} of ${formatSize(QUOTA)} used`}</Text>
            </div>
            <ul style={{ display: 'grid', gap: 'var(--spacing-5)', margin: 0, padding: 0, listStyle: 'none' }}>
              {breakdown.map((entry) => (
                <li key={entry.kind} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: kinds[entry.kind].color }}>{kinds[entry.kind].icon}</Icon>
                  <Text size={2} style={{ flex: 1 }}>{kinds[entry.kind].label === 'PDF' ? 'PDFs' : `${kinds[entry.kind].label}s`}</Text>
                  <Text size={2} style={{ ...tabular, color: 'var(--label-secondary)' }}>{formatSize(entry.size)}</Text>
                </li>
              ))}
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-tertiary)' }}><FileArchive /></Icon>
                <Text size={2} style={{ flex: 1 }}>Device backups</Text>
                <Text size={2} style={{ ...tabular, color: 'var(--label-secondary)' }}>{formatSize(BACKUPS)}</Text>
              </li>
            </ul>
          </Card>
        </aside>
      </div>

      <Dialog open={naming !== null} onChangeOpen={(open) => !open && setNaming(null)}>
        <DialogContent aria-labelledby={`${id}-name-title`} style={{ width: 'min(420px, 100%)', boxSizing: 'border-box' }}>
          <div style={dialogHeader}>
            <Heading id={`${id}-name-title`} as='h2' size={4} fontWeight={600}>{naming?.mode === 'rename' ? 'Rename' : 'New folder'}</Heading>
            <DialogClose asChild>
              <IconButton size='xs' aria-label='Close' {...ghost} style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          {naming && (
            <form noValidate onSubmit={submitName} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-10)' }}>
              <div style={field}>
                <Label htmlFor={`${id}-name`}>Name</Label>
                <TextField error={nameError !== ''}>
                  <TextFieldInput
                    id={`${id}-name`}
                    name='name'
                    autoComplete='off'
                    autoFocus
                    defaultValue={naming.item?.name ?? 'Untitled folder'}
                    aria-invalid={nameError !== ''}
                    aria-describedby={nameError === '' ? undefined : `${id}-name-error`}
                    onFocus={(event) => {
                      const dot = event.currentTarget.value.lastIndexOf('.');
                      event.currentTarget.setSelectionRange(0, dot > 0 && naming.item?.kind !== 'folder' ? dot : event.currentTarget.value.length);
                    }}
                    onChange={() => setNameError('')}
                  />
                </TextField>
                {nameError !== '' && <HelperText id={`${id}-name-error`} error>{nameError}</HelperText>}
              </div>
              <div style={actions}>
                <DialogClose asChild>
                  <Button size='xs' type='button' {...ghost}>Cancel</Button>
                </DialogClose>
                <Button size='xs' type='submit'>{naming.mode === 'rename' ? 'Rename' : 'Create folder'}</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={moveOpen} onChangeOpen={setMoveOpen}>
        <DialogContent onClose={focusHeading} aria-labelledby={`${id}-move-title`} style={{ width: 'min(420px, 100%)', boxSizing: 'border-box' }}>
          <div style={dialogHeader}>
            <Heading id={`${id}-move-title`} as='h2' size={4} fontWeight={600}>{`Move ${plural(chosen.length, 'item')}`}</Heading>
            <DialogClose asChild>
              <IconButton size='xs' aria-label='Close' {...ghost} style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form method='dialog' onSubmit={moveSelected} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-10)' }}>
            <div style={field}>
              <Label htmlFor={`${id}-destination`}>Destination</Label>
              <Select value={destination} onChangeValue={(value) => setDestination(value ?? ROOT)}>
                <SelectCombobox id={`${id}-destination`}>
                  <SelectValue />
                  <SelectIcon />
                </SelectCombobox>
                <SelectListbox>
                  {folders.map((entry) => <SelectOption key={entry.id} value={entry.id}>{entry.label}</SelectOption>)}
                </SelectListbox>
              </Select>
            </div>
            <div style={actions}>
              <DialogClose asChild>
                <Button size='xs' type='button' {...ghost}>Cancel</Button>
              </DialogClose>
              <Button size='xs' type='submit'>Move here</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onChangeOpen={setDeleteOpen}>
        <DialogContent onClose={focusHeading} aria-labelledby={`${id}-delete-title`} aria-describedby={`${id}-delete-description`} style={{ width: 'min(420px, 100%)', boxSizing: 'border-box' }}>
          <div style={dialogHeader}>
            <Heading id={`${id}-delete-title`} as='h2' size={4} fontWeight={600} style={{ overflowWrap: 'anywhere' }}>
              {chosenItems.length === 1 ? `Delete “${chosenItems[0].name}”?` : `Delete ${plural(chosen.length, 'item')}?`}
            </Heading>
            <DialogClose asChild>
              <IconButton size='xs' aria-label='Close' {...ghost} style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <Text id={`${id}-delete-description`} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
            {chosenItems.some((item) => item.kind === 'folder')
              ? 'Folders go to Trash with everything inside. You can restore them for 30 days.'
              : 'Items go to Trash. You can restore them for 30 days.'}
          </Text>
          <form method='dialog' onSubmit={deleteSelected} style={{ ...actions, marginBlockStart: 'var(--spacing-12)' }}>
            <DialogClose asChild>
              <Button size='xs' type='button' {...ghost}>Cancel</Button>
            </DialogClose>
            <Button size='xs' type='submit' style={destructive}>Delete</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
