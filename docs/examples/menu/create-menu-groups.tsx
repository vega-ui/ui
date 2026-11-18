import { useId, type CSSProperties } from 'react';
import { Button, Menu, MenuContent, MenuGroup, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

export default function CreateMenuGroups() {
  const documentsId = useId();
  const workspaceId = useId();

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm'>Create</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup aria-labelledby={documentsId}>
          <Text id={documentsId} size={2} fontWeight={500} style={groupHeading}>Documents</Text>
          <MenuItem>Document</MenuItem>
          <MenuItem>Spreadsheet</MenuItem>
          <MenuItem>Presentation</MenuItem>
        </MenuGroup>
        <Separator />
        <MenuGroup aria-labelledby={workspaceId}>
          <Text id={workspaceId} size={2} fontWeight={500} style={groupHeading}>Workspace</Text>
          <MenuItem>Project</MenuItem>
          <MenuItem>Team</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
