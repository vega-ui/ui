import { Button, Icon } from '@vega-ui/react';
import { BellIcon, BellOffIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function PressedToggle() {
  const [watching, setWatching] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button
        type='button'
        variant={watching ? 'primary' : 'secondary'}
        appearance='ghost'
        aria-pressed={watching}
        onClick={() => setWatching(!watching)}
      >
        <Icon size='sm'>{watching ? <BellIcon /> : <BellOffIcon />}</Icon>
        Watch repository
      </Button>
      <span style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>
        {watching ? 'You get notified about every release' : 'Notifications are off'}
      </span>
    </div>
  );
}
