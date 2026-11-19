# ContextMenu: паттерны

## Быстрый путь к действиям строки

Когда использовать:

- У строк списка, например файлов или писем, есть действия, до которых знающие правый щелчок быстрее доберутся у указателя.

Заметки о композиции:

- Оберните каждую строку в свой `ContextMenu`; внутри `<li>` сделайте областью `<div>`, потому что `MenuContent` рендерится рядом с ней.
- Положите те же действия в [Menu](../menu/) за `Button` с `square` «⋯» в строке, с `aria-label`, который называет объект.
- Назовите `MenuContent` по объекту через `aria-label`, а разрушительное действие ставьте последним, после `Separator`.

Компромиссы:

- Быстро для пользователей мыши и касаний, которые этого ждут, но невидимо: без видимой кнопки действия теряются для всех остальных.

<!-- example: context-menu/file-list.tsx -->
```tsx
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
```
<!-- /example -->

## Настройки вида холста

Когда использовать:

- У доски, холста или карты есть настройки вида, например сетка или масштаб, которые меняют прямо во время работы.

Заметки о композиции:

- Сделайте областью обёртку холста, используйте `MenuCheckboxItem` для переключателей и `MenuRadioGroup`, подписанную заголовком, для выбора одного варианта.
- Храните значения в родителе и показывайте те же пункты в `Menu` на панели инструментов, потому что на самом холсте нет элемента, который получает фокус с клавиатуры.
- Показывайте текущие настройки вне меню.

Компромиссы:

- Избавляет от похода к панели инструментов во время работы на холсте, но его находят только те, кто пробует правый щелчок: основным путём остаётся меню на панели.

<!-- example: context-menu/board-view-options.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  ContextMenu,
  ContextMenuTrigger,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';

const zooms = ['50', '100', '150'];

const notes = [
  { id: 'research', text: 'Interview five admins', x: 24, y: 24, color: 'var(--color-amber-500)' },
  { id: 'flows', text: 'Map the invite flow', x: 184, y: 56, color: 'var(--color-blue-500)' },
  { id: 'copy', text: 'Rewrite empty states', x: 72, y: 136, color: 'var(--color-green-500)' },
];

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

interface ViewState {
  showGrid: boolean
  snap: boolean
  zoom: string
  setShowGrid: (value: boolean) => void
  setSnap: (value: boolean) => void
  setZoom: (value: string) => void
}

function ViewItems({ showGrid, snap, zoom, setShowGrid, setSnap, setZoom }: ViewState) {
  const zoomHeadingId = useId();

  return (
    <>
      <MenuCheckboxItem checked={showGrid} onChangeChecked={setShowGrid}>
        <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
        Show grid
      </MenuCheckboxItem>
      <MenuCheckboxItem checked={snap} onChangeChecked={setSnap}>
        <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
        Snap to grid
      </MenuCheckboxItem>
      <Separator />
      <MenuRadioGroup aria-labelledby={zoomHeadingId} value={zoom} onChangeValue={setZoom}>
        <Text id={zoomHeadingId} size={2} fontWeight={500} style={groupHeading}>Zoom</Text>
        {zooms.map((value) => (
          <MenuRadioItem key={value} value={value}>
            <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
            {value}%
          </MenuRadioItem>
        ))}
      </MenuRadioGroup>
    </>
  );
}

export default function BoardViewOptions() {
  const [showGrid, setShowGrid] = useState(true);
  const [snap, setSnap] = useState(false);
  const [zoom, setZoom] = useState('100');
  const view = { showGrid, snap, zoom, setShowGrid, setSnap, setZoom };
  const scale = Number(zoom) / 100;
  const cell = 16 * scale;
  const summary = [showGrid ? 'Grid shown' : 'Grid hidden', snap ? 'snapping on' : 'snapping off', `${zoom}%`].join(' · ');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', boxSizing: 'border-box', width: '100%', maxWidth: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
        <Menu placement='bottom-end' size='sm'>
          <MenuTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>View</Button>
          </MenuTrigger>
          <MenuContent>
            <ViewItems {...view} />
          </MenuContent>
        </Menu>
      </div>
      <ContextMenu size='sm'>
        <ContextMenuTrigger
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: 240,
            borderRadius: 'var(--radius-5)',
            border: '1px solid var(--separator-opaque)',
            backgroundColor: 'var(--surface-primary)',
            backgroundImage: showGrid ? 'radial-gradient(circle, var(--label-quaternary) 1px, transparent 1.5px)' : 'none',
            backgroundSize: `${cell}px ${cell}px`,
            backgroundPosition: `${-cell / 2}px ${-cell / 2}px`,
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zoom: scale }}>
            {notes.map((note) => (
              <div
                key={note.id}
                style={{
                  position: 'absolute',
                  insetInlineStart: snap ? Math.round(note.x / 16) * 16 : note.x,
                  insetBlockStart: snap ? Math.round(note.y / 16) * 16 : note.y,
                  width: 128,
                  padding: 'var(--spacing-5)',
                  borderRadius: 'var(--radius-3)',
                  borderInlineStart: `3px solid ${note.color}`,
                  background: 'var(--surface-secondary)',
                  boxShadow: 'var(--surface-shadow)',
                  transition: 'inset-inline-start var(--transition-state-delay), inset-block-start var(--transition-state-delay)',
                }}
              >
                <Text size={2} fontWeight={500}>{note.text}</Text>
              </div>
            ))}
          </div>
        </ContextMenuTrigger>
        <MenuContent aria-label='Board'>
          <ViewItems {...view} />
        </MenuContent>
      </ContextMenu>
    </div>
  );
}
```
<!-- /example -->

## Правый щелчок выбирает

Когда использовать:

- Элементы можно выбирать, а кнопки на панели работают с выбранным, как фотографии в альбоме или файлы в сетке.

Заметки о композиции:

- Выбирайте элемент в `onChangeOpen`, когда открывается его меню, чтобы меню и панель работали с одним и тем же элементом.
- Сделайте элемент `<button>` через `asChild`, чтобы до него доходила клавиатура, а Shift+F10 открывал его меню.

Компромиссы:

- Так ведут себя настольные файловые менеджеры, но выбор меняется от правого щелчка, а этого может не ждать тот, кто хотел только заглянуть в меню.

<!-- example: context-menu/photo-selection.tsx -->
```tsx
import { useState } from 'react';
import { Button, ContextMenu, ContextMenuTrigger, MenuContent, MenuItem, Separator, Text } from '@vega-ui/react';

const photos = [
  { id: 'lisbon', name: 'Lisbon.jpg', colors: 'var(--color-amber-500), var(--color-red-500)' },
  { id: 'fjord', name: 'Fjord.jpg', colors: 'var(--color-blue-500), var(--color-green-500)' },
  { id: 'dunes', name: 'Dunes.jpg', colors: 'var(--color-orange-500), var(--color-pink-500)' },
  { id: 'harbor', name: 'Harbor.jpg', colors: 'var(--color-purple-500), var(--color-blue-500)' },
];

export default function PhotoSelection() {
  const [selected, setSelected] = useState('lisbon');
  const [cover, setCover] = useState('fjord');
  const [status, setStatus] = useState('Right click a photo, or select it and use the buttons.');
  const current = photos.find((photo) => photo.id === selected) ?? photos[0];

  const changeOpen = (id: string, open: boolean) => {
    if (open) setSelected(id);
  };

  const download = (name: string) => setStatus(`Downloading ${name}`);
  const copyLink = (name: string) => setStatus(`Link to ${name} copied`);
  const makeCover = (id: string, name: string) => {
    setCover(id);
    setStatus(`${name} is the album cover`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', flexWrap: 'wrap' }}>
        <Text size={3} fontWeight={500}>{current.name}</Text>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={() => download(current.name)}>Download</Button>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={() => copyLink(current.name)}>Copy link</Button>
          <Button size='sm' variant='secondary' appearance='ghost' disabled={cover === current.id} onClick={() => makeCover(current.id, current.name)}>Set as cover</Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 'var(--spacing-4)' }}>
        {photos.map((photo) => {
          const isSelected = photo.id === selected;

          return (
            <ContextMenu key={photo.id} size='sm' onChangeOpen={(open) => changeOpen(photo.id, open)}>
              <ContextMenuTrigger asChild>
                <button
                  type='button'
                  aria-pressed={isSelected}
                  onClick={() => setSelected(photo.id)}
                  style={{
                    display: 'grid',
                    alignContent: 'end',
                    aspectRatio: '1',
                    minWidth: 0,
                    padding: 'var(--spacing-3)',
                    border: 0,
                    borderRadius: 'var(--radius-4)',
                    background: `linear-gradient(to top, color-mix(in oklch, var(--color-black) 55%, transparent), transparent 65%), linear-gradient(135deg, ${photo.colors})`,
                    boxShadow: isSelected ? '0 0 0 2px var(--surface-primary), 0 0 0 4px var(--color-primary-500)' : 'none',
                    color: 'var(--color-white)',
                    font: 'inherit',
                    textAlign: 'start',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={1} fontWeight={500} style={{ color: 'inherit', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {photo.name}
                  </Text>
                  {cover === photo.id && <Text size={1} style={{ color: 'inherit', opacity: 0.8 }}>Cover</Text>}
                </button>
              </ContextMenuTrigger>
              <MenuContent aria-label={photo.name}>
                <MenuItem onClick={() => download(photo.name)}>Download</MenuItem>
                <MenuItem onClick={() => copyLink(photo.name)}>Copy link</MenuItem>
                <Separator />
                <MenuItem disabled={cover === photo.id} onClick={() => makeCover(photo.id, photo.name)}>Set as cover</MenuItem>
              </MenuContent>
            </ContextMenu>
          );
        })}
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{status}</Text>
    </div>
  );
}
```
<!-- /example -->
