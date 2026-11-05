import { useState } from 'react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const labels = ['Bug', 'Feature', 'Design', 'Docs'];

export default function NestedPopover() {
  const [label, setLabel] = useState('Bug');
  const [labelOpen, setLabelOpen] = useState(false);

  const choose = (next: string) => {
    setLabel(next);
    setLabelOpen(false);
  };

  return (
    <Popover role='dialog' placement='bottom-start'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Filters · {label}</Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Filters'>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Text size={3}>Label</Text>
          <Popover placement='right-start' open={labelOpen} onChangeOpen={setLabelOpen}>
            <PopoverTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>{label}</Button>
            </PopoverTrigger>
            <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
              <div role='group' aria-label='Labels' style={{ display: 'grid', minWidth: 120 }}>
                {labels.map((item) => (
                  <Button
                    key={item}
                    size='sm'
                    variant='secondary'
                    appearance={item === label ? 'ghost' : 'transparent'}
                    aria-pressed={item === label}
                    style={{ justifyContent: 'flex-start' }}
                    onClick={() => choose(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </PopoverContent>
    </Popover>
  );
}
