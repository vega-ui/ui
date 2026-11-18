import { useState, type MouseEvent } from 'react';
import { Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator } from '@vega-ui/react';

const levels = [50, 75, 100, 125, 150, 200];

export default function ZoomKeepOpen() {
  const [zoom, setZoom] = useState(100);
  const position = levels.indexOf(zoom);

  const zoomBy = (event: MouseEvent, offset: number) => {
    event.preventDefault();
    setZoom(levels[position + offset]);
  };

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost' style={{ minWidth: 112, fontVariantNumeric: 'tabular-nums' }}>Zoom {zoom}%</Button>
      </MenuTrigger>
      <MenuContent aria-label='Zoom'>
        <MenuItem disabled={position === levels.length - 1} onClick={(event) => zoomBy(event, 1)}>Zoom in</MenuItem>
        <MenuItem disabled={position === 0} onClick={(event) => zoomBy(event, -1)}>Zoom out</MenuItem>
        <Separator />
        <MenuItem onClick={() => setZoom(100)}>Reset to 100%</MenuItem>
      </MenuContent>
    </Menu>
  );
}
