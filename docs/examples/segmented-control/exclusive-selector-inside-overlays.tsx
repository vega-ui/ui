import { CSSProperties, FormEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const densities = [
  { value: 'compact', label: 'Compact' },
  { value: 'default', label: 'Default' },
  { value: 'comfortable', label: 'Comfortable' },
];

export default function ExclusiveSelectorInsideOverlays() {
  const [density, setDensity] = useState('default');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setDensity(String(data.get('density')));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={3}>Row density: <strong>{density}</strong></Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Display settings</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby='display-settings-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='display-settings-title' as='h2' size={4} fontWeight={600}>Display settings</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form method='dialog' onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label id='density-label'>Row density</Label>
              <SegmentedControl name='density' defaultValue={density} role='radiogroup' aria-labelledby='density-label'>
                {densities.map((item) => (
                  <SegmentedControlItem key={item.value} value={item.value}>
                    <SegmentedControlItemInput />
                    {item.label}
                  </SegmentedControlItem>
                ))}
                <SegmentedControlIndicator />
              </SegmentedControl>
            </div>
            <Button type='submit'>Apply</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
