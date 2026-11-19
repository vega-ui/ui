import { useState } from 'react';
import { Button, Icon, Text } from '@vega-ui/react';
import { EllipsisIcon, PencilIcon, Share2Icon } from '@vega-ui/icons';

export default function SquareHeaderActions() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%', maxWidth: 400 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text size={4} fontWeight={600} style={{ flex: 1, minWidth: 0 }}>Brand guidelines</Text>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='Rename document' onClick={() => setLastAction('Rename')}>
          <Icon><PencilIcon /></Icon>
        </Button>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='Share document' onClick={() => setLastAction('Share')}>
          <Icon><Share2Icon /></Icon>
        </Button>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='More actions' onClick={() => setLastAction('More')}>
          <Icon><EllipsisIcon /></Icon>
        </Button>
      </header>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Updated 2 hours ago' : `Clicked: ${lastAction}`}
      </Text>
    </div>
  );
}
