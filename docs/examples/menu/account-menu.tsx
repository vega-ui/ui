import { useState } from 'react';
import { Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';

export default function AccountMenu() {
  const [signedOut, setSignedOut] = useState(false);

  if (signedOut) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>You are signed out.</Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setSignedOut(false)}>Sign in</Button>
      </div>
    );
  }

  return (
    <Menu placement='bottom-end'>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Maria Chen</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild><a href='#profile'>Profile</a></MenuItem>
        <MenuItem asChild><a href='#billing'>Billing</a></MenuItem>
        <MenuItem asChild><a href='#shortcuts'>Keyboard shortcuts</a></MenuItem>
        <Separator />
        <MenuItem onClick={() => setSignedOut(true)}>Sign out</MenuItem>
      </MenuContent>
    </Menu>
  );
}
