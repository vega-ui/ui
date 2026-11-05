import { Button, Icon } from '@vega-ui/react';
import { PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button type='button' onClick={() => setCount(count + 1)}>
        <Icon size='sm'><PlusIcon /></Icon>
        New project
      </Button>
      <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Projects: {count}</span>
    </div>
  );
}
