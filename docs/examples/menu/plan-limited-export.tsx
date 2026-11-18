import { Badge, Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator } from '@vega-ui/react';

export default function PlanLimitedExport() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Export</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>PDF document</MenuItem>
        <MenuItem>Word document</MenuItem>
        <MenuItem>Markdown</MenuItem>
        <Separator />
        <MenuItem disabled>
          Publish to web
          <Badge size='xs' variant='info' appearance='ghost' style={{ marginInlineStart: 'auto' }}>Business plan</Badge>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
