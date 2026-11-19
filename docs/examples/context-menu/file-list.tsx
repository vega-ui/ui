import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  Button,
  ContextMenu,
  ContextMenuTrigger,
  Icon,
  Menu,
  MenuContent,
  MenuItem,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';
import {
  ChevronRightIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  LinkIcon,
  MailIcon,
  PencilIcon,
  PresentationIcon,
  Share2Icon,
  Trash2Icon,
} from '@vega-ui/icons';

const files = [
  { id: 'report', name: 'Q3 report.pdf', meta: 'Edited 2 hours ago', icon: <FileTextIcon /> },
  { id: 'budget', name: 'Budget 2027.xlsx', meta: 'Edited yesterday', icon: <FileSpreadsheetIcon /> },
  { id: 'deck', name: 'Kickoff deck.key', meta: 'Edited 12 Nov', icon: <PresentationIcon /> },
];

const muted: CSSProperties = { color: 'var(--label-secondary)' };

function Lead({ children }: { children: ReactNode }) {
  return <Icon size='sm' style={muted}>{children}</Icon>;
}

function FileActions({ onAction }: { onAction: (status: string) => void }) {
  return (
    <>
      <MenuItem onClick={() => onAction('Opened in a new tab')}><Lead><ExternalLinkIcon /></Lead>Open</MenuItem>
      <MenuItem onClick={() => onAction('Renamed just now')}><Lead><PencilIcon /></Lead>Rename</MenuItem>
      <MenuItem onClick={() => onAction('Copy saved')}><Lead><CopyIcon /></Lead>Duplicate</MenuItem>
      <MenuSubmenu>
        <MenuSubmenuTrigger>
          <Lead><Share2Icon /></Lead>
          Share
          <Icon size='xs' style={{ ...muted, marginInlineStart: 'auto' }}><ChevronRightIcon /></Icon>
        </MenuSubmenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => onAction('Link copied')}><Lead><LinkIcon /></Lead>Copy link</MenuItem>
          <MenuItem onClick={() => onAction('Sent by email')}><Lead><MailIcon /></Lead>Email</MenuItem>
        </MenuContent>
      </MenuSubmenu>
      <Separator />
      <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => onAction('Moved to trash')}>
        <Icon size='sm'><Trash2Icon /></Icon>Delete
      </MenuItem>
    </>
  );
}

export default function FileList() {
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-1)', boxSizing: 'border-box', width: '100%', maxWidth: 440, margin: 0, padding: 0, listStyle: 'none' }}>
      {files.map((file) => {
        const report = (status: string) => setStatuses((current) => ({ ...current, [file.id]: status }));

        return (
          <li key={file.id}>
            <ContextMenu size='sm'>
              <ContextMenuTrigger
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-6)',
                  padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
                  borderRadius: 'var(--radius-4)',
                  background: 'var(--surface-primary)',
                  border: '1px solid var(--separator-opaque)',
                }}
              >
                <Icon size='lg' style={muted}>{file.icon}</Icon>
                <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                  <Text size={3} fontWeight={500}>{file.name}</Text>
                  <Text size={2} role='status' style={{ ...muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {statuses[file.id] ?? file.meta}
                  </Text>
                </div>
                <Menu placement='bottom-end' size='sm'>
                  <MenuTrigger asChild>
                    <Button square size='sm' aria-label={`Actions for ${file.name}`} variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
                      <Icon><EllipsisIcon /></Icon>
                    </Button>
                  </MenuTrigger>
                  <MenuContent>
                    <FileActions onAction={report} />
                  </MenuContent>
                </Menu>
              </ContextMenuTrigger>
              <MenuContent aria-label={file.name}>
                <FileActions onAction={report} />
              </MenuContent>
            </ContextMenu>
          </li>
        );
      })}
    </ul>
  );
}
