import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  Button,
  Icon,
  Menu,
  MenuContent,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';
import {
  ArchiveIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  FileTextIcon,
  FolderIcon,
  FolderInputIcon,
  InboxIcon,
  LinkIcon,
  MailIcon,
  MessageCircleIcon,
  PencilIcon,
  Share2Icon,
  TagIcon,
  Trash2Icon,
} from '@vega-ui/icons';

const labels = [
  { value: 'none', name: 'No label', color: 'transparent' },
  { value: 'review', name: 'In review', color: 'var(--color-amber-500)' },
  { value: 'approved', name: 'Approved', color: 'var(--color-green-500)' },
  { value: 'blocked', name: 'Blocked', color: 'var(--color-red-500)' },
];

const projects = ['Design', 'Finance', 'Marketing'];

const muted: CSSProperties = { color: 'var(--label-secondary)' };

const dot = (color: string): CSSProperties => ({
  flexShrink: 0,
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: color,
  boxShadow: color === 'transparent' ? 'inset 0 0 0 1px var(--label-tertiary)' : undefined,
});

function Lead({ children }: { children: ReactNode }) {
  return <Icon size='sm' style={muted}>{children}</Icon>;
}

function Chevron() {
  return <Icon size='xs' style={{ ...muted, marginInlineStart: 'auto' }}><ChevronRightIcon /></Icon>;
}

export default function FileSubmenus() {
  const [folder, setFolder] = useState('Finance');
  const [label, setLabel] = useState('review');
  const [status, setStatus] = useState('Edited 2 hours ago');
  const current = labels.find((item) => item.value === label) ?? labels[0];

  const moveTo = (target: string) => {
    setFolder(target);
    setStatus(`Moved to ${target}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 420,
        padding: 'var(--spacing-6) var(--spacing-6) var(--spacing-6) var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <Icon size='lg' style={muted}><FileTextIcon /></Icon>
      <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Text size={3} fontWeight={500}>Q3 report.pdf</Text>
          {label !== 'none' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <span aria-hidden style={dot(current.color)} />
              <Text size={1} style={muted}>{current.name}</Text>
            </span>
          )}
        </div>
        <Text size={2} role='status' style={{ ...muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{folder} · {status}</Text>
      </div>
      <Menu placement='bottom-end' size='sm'>
        <MenuTrigger asChild>
          <Button square size='sm' aria-label='Actions for Q3 report.pdf' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
            <Icon><EllipsisIcon /></Icon>
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => setStatus('Opened in a new tab')}><Lead><ExternalLinkIcon /></Lead>Open</MenuItem>
          <MenuItem onClick={() => setStatus('Renamed just now')}><Lead><PencilIcon /></Lead>Rename</MenuItem>
          <MenuItem onClick={() => setStatus('Copy saved')}><Lead><CopyIcon /></Lead>Duplicate</MenuItem>
          <Separator />
          <MenuSubmenu>
            <MenuSubmenuTrigger><Lead><FolderInputIcon /></Lead>Move to<Chevron /></MenuSubmenuTrigger>
            <MenuContent>
              <MenuItem disabled={folder === 'Inbox'} onClick={() => moveTo('Inbox')}><Lead><InboxIcon /></Lead>Inbox</MenuItem>
              <MenuSubmenu>
                <MenuSubmenuTrigger><Lead><FolderIcon /></Lead>Projects<Chevron /></MenuSubmenuTrigger>
                <MenuContent>
                  {projects.map((project) => (
                    <MenuItem key={project} disabled={folder === project} onClick={() => moveTo(project)}>
                      <Lead><FolderIcon /></Lead>{project}
                    </MenuItem>
                  ))}
                </MenuContent>
              </MenuSubmenu>
              <MenuItem disabled={folder === 'Archive'} onClick={() => moveTo('Archive')}><Lead><ArchiveIcon /></Lead>Archive</MenuItem>
            </MenuContent>
          </MenuSubmenu>
          <MenuSubmenu>
            <MenuSubmenuTrigger><Lead><Share2Icon /></Lead>Share<Chevron /></MenuSubmenuTrigger>
            <MenuContent>
              <MenuItem onClick={() => setStatus('Link copied')}><Lead><LinkIcon /></Lead>Copy link</MenuItem>
              <MenuItem onClick={() => setStatus('Sent by email')}><Lead><MailIcon /></Lead>Email</MenuItem>
              <MenuItem onClick={() => setStatus('Sent in Messages')}><Lead><MessageCircleIcon /></Lead>Messages</MenuItem>
            </MenuContent>
          </MenuSubmenu>
          <MenuSubmenu>
            <MenuSubmenuTrigger><Lead><TagIcon /></Lead>Label<Chevron /></MenuSubmenuTrigger>
            <MenuContent>
              <MenuRadioGroup aria-label='Label' value={label} onChangeValue={setLabel}>
                {labels.map((item) => (
                  <MenuRadioItem key={item.value} value={item.value}>
                    <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
                    <span aria-hidden style={dot(item.color)} />
                    {item.name}
                  </MenuRadioItem>
                ))}
              </MenuRadioGroup>
            </MenuContent>
          </MenuSubmenu>
          <Separator />
          <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => setStatus('Moved to trash')}>
            <Icon size='sm'><Trash2Icon /></Icon>Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
