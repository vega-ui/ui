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
