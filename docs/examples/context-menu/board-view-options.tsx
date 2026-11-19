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
