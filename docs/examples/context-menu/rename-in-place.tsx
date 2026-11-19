import { useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type ReactNode } from 'react';
import {
  Button,
  ContextMenu,
  ContextMenuTrigger,
  Icon,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Separator,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { CopyIcon, EllipsisIcon, FileArchiveIcon, FileTextIcon, PencilIcon } from '@vega-ui/icons';

interface FileEntry {
  id: number
  name: string
  edited: string
}

const initialFiles: FileEntry[] = [
  { id: 1, name: 'Q3 report.pdf', edited: '2 h ago' },
  { id: 2, name: 'Budget 2027.xlsx', edited: 'Yesterday' },
  { id: 3, name: 'Kickoff notes.txt', edited: '12 Nov' },
];

const muted: CSSProperties = { color: 'var(--label-secondary)' };

const baseLength = (name: string) => {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? dot : name.length;
};

function Lead({ children }: { children: ReactNode }) {
  return <Icon size='sm' style={muted}>{children}</Icon>;
}

interface FileActionsProps {
  onRename: () => void
  onDuplicate: () => void
  onCompress: () => void
}

function FileActions({ onRename, onDuplicate, onCompress }: FileActionsProps) {
  return (
    <>
      <MenuItem onClick={onRename}><Lead><PencilIcon /></Lead>Rename</MenuItem>
      <Separator />
      <MenuItem onClick={onDuplicate}><Lead><CopyIcon /></Lead>Duplicate</MenuItem>
      <MenuItem onClick={onCompress}><Lead><FileArchiveIcon /></Lead>Compress</MenuItem>
    </>
  );
}

interface FileRowProps {
  file: FileEntry
  onRename: (name: string) => void
  onAdd: (name: string) => void
}

function FileRow({ file, onRename, onAdd }: FileRowProps) {
  const [editing, setEditing] = useState(false);
  const cancelled = useRef(false);
  const moreRef = useRef<HTMLButtonElement>(null);
  const actions = {
    onRename: () => setEditing(true),
    onDuplicate: () => onAdd(`${file.name.slice(0, baseLength(file.name))} copy${file.name.slice(baseLength(file.name))}`),
    onCompress: () => onAdd(`${file.name}.zip`),
  };

  const selectBase = (event: FocusEvent<HTMLInputElement>) => {
    cancelled.current = false;
    event.currentTarget.setSelectionRange(0, baseLength(event.currentTarget.value));
  };

  const finish = (event: FocusEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value.trim();
    setEditing(false);
    if (!cancelled.current && name !== '' && name !== file.name) onRename(name);
  };

  const leaveOnKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' && event.key !== 'Escape') return;
    event.preventDefault();
    cancelled.current = event.key === 'Escape';
    moreRef.current?.focus();
  };

  return (
    <ContextMenu size='sm'>
      <ContextMenuTrigger
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-4)',
          padding: 'var(--spacing-3) var(--spacing-3) var(--spacing-3) var(--spacing-6)',
          borderRadius: 'var(--radius-4)',
          background: 'var(--surface-primary)',
          border: '1px solid var(--separator-opaque)',
        }}
      >
        <Icon size='md' style={muted}>{file.name.endsWith('.zip') ? <FileArchiveIcon /> : <FileTextIcon />}</Icon>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, height: 'var(--spacing-16)' }}>
          {editing ? (
            <TextField size='xs' style={{ width: '100%' }}>
              <TextFieldInput aria-label='File name' defaultValue={file.name} autoFocus onFocus={selectBase} onBlur={finish} onKeyDown={leaveOnKey} />
            </TextField>
          ) : (
            <Text size={2} style={{ paddingInline: 'var(--spacing-8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {file.name}
            </Text>
          )}
        </div>
        <Text size={2} style={{ ...muted, flexShrink: 0 }}>{file.edited}</Text>
        <Menu placement='bottom-end' size='sm'>
          <MenuTrigger asChild>
            <Button square ref={moreRef} size='xs' aria-label={`Actions for ${file.name}`} variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
              <Icon><EllipsisIcon /></Icon>
            </Button>
          </MenuTrigger>
          <MenuContent>
            <FileActions {...actions} />
          </MenuContent>
        </Menu>
      </ContextMenuTrigger>
      <MenuContent aria-label={file.name}>
        <FileActions {...actions} />
      </MenuContent>
    </ContextMenu>
  );
}

export default function RenameInPlace() {
  const [files, setFiles] = useState(initialFiles);

  const rename = (id: number, name: string) =>
    setFiles((current) => current.map((file) => (file.id === id ? { ...file, name, edited: 'Just now' } : file)));

  const addAfter = (id: number, name: string) =>
    setFiles((current) => {
      const index = current.findIndex((file) => file.id === id);
      const added = { id: Math.max(...current.map((file) => file.id)) + 1, name, edited: 'Just now' };
      return [...current.slice(0, index + 1), added, ...current.slice(index + 1)];
    });

  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-1)', boxSizing: 'border-box', width: '100%', maxWidth: 440, margin: 0, padding: 0, listStyle: 'none' }}>
      {files.map((file) => (
        <li key={file.id}>
          <FileRow file={file} onRename={(name) => rename(file.id, name)} onAdd={(name) => addAfter(file.id, name)} />
        </li>
      ))}
    </ul>
  );
}
