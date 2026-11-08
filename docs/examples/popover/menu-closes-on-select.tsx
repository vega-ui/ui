import { useState } from 'react';
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const actions = ['Duplicate', 'Move to folder', 'Download as PDF', 'Archive'];

export default function MenuClosesOnSelect() {
  const [last, setLast] = useState('');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Popover placement='bottom-start'>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Brand guidelines.fig</Button>
        </PopoverTrigger>
        <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
          <div role='group' aria-label='File actions' style={{ display: 'grid', minWidth: 200 }}>
            {actions.map((action) => (
              <PopoverClose key={action} asChild>
                <Button
                  variant='secondary'
                  appearance='transparent'
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => setLast(action)}
                >
                  {action}
                </Button>
              </PopoverClose>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Text size={2} style={{ minHeight: '1lh', color: 'var(--label-secondary)' }}>{last ? `Last action: ${last}` : ''}</Text>
    </div>
  );
}
