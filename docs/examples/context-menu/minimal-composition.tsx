import { ContextMenu, ContextMenuTrigger, MenuContent, MenuItem, Separator, Text } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={{
          display: 'grid',
          placeItems: 'center',
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: 360,
          height: 160,
          padding: 'var(--spacing-8)',
          border: '1px dashed var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Right click or long press here</Text>
      </ContextMenuTrigger>
      <MenuContent aria-label='Edit'>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem disabled>Paste</MenuItem>
        <Separator />
        <MenuItem>Select all</MenuItem>
      </MenuContent>
    </ContextMenu>
  );
}
