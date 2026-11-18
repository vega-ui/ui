import { Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Edit</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Undo</MenuItem>
        <MenuItem disabled>Redo</MenuItem>
        <Separator />
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </MenuContent>
    </Menu>
  );
}
