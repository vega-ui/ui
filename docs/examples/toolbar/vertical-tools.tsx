import { useState } from 'react';
import { Button, Icon, Separator, Text, ToggleGroup, ToggleGroupToggle, Toolbar, ToolbarItem } from '@vega-ui/react';
import { EraserIcon, HandIcon, MousePointer2Icon, PencilIcon, ZoomInIcon, ZoomOutIcon } from '@vega-ui/icons';

const tools = [
  { value: 'select', label: 'Select', icon: <MousePointer2Icon /> },
  { value: 'hand', label: 'Hand', icon: <HandIcon /> },
  { value: 'pencil', label: 'Pencil', icon: <PencilIcon /> },
  { value: 'eraser', label: 'Eraser', icon: <EraserIcon /> },
];

export default function VerticalTools() {
  const [tool, setTool] = useState('pencil');
  const [zoom, setZoom] = useState(100);
  const toolLabel = tools.find((item) => item.value === tool)?.label ?? '';

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 480 }}>
      <Toolbar
        aria-label='Drawing tools'
        orientation='vertical'
        style={{
          padding: 'var(--spacing-3)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
          background: 'var(--surface-primary)',
        }}
      >
        <ToggleGroup aria-label='Tool' size='sm' value={tool} onChangeValue={setTool} style={{ flexDirection: 'column' }}>
          {tools.map((item) => (
            <ToggleGroupToggle key={item.value} value={item.value} square aria-label={item.label}><Icon>{item.icon}</Icon></ToggleGroupToggle>
          ))}
        </ToggleGroup>
        <Separator orientation='horizontal' />
        <ToolbarItem asChild>
          <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Zoom in' onClick={() => setZoom(Math.min(zoom + 25, 200))}>
            <Icon><ZoomInIcon /></Icon>
          </Button>
        </ToolbarItem>
        <ToolbarItem asChild>
          <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Zoom out' onClick={() => setZoom(Math.max(zoom - 25, 50))}>
            <Icon><ZoomOutIcon /></Icon>
          </Button>
        </ToolbarItem>
      </Toolbar>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          flex: 1,
          minWidth: 0,
          borderRadius: 'var(--radius-5)',
          border: '1px dashed var(--separator-opaque)',
          backgroundImage: 'radial-gradient(var(--separator-opaque) 1px, transparent 1px)',
          backgroundSize: 'var(--spacing-10) var(--spacing-10)',
        }}
      >
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {toolLabel} · {zoom}%
        </Text>
      </div>
    </div>
  );
}
