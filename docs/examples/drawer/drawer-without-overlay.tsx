import { useId, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const metrics = [
  { label: 'Source', value: 'Warehouse · orders_daily' },
  { label: 'Refresh', value: 'Every 15 minutes' },
  { label: 'Last updated', value: '14:45 UTC' },
  { label: 'Owner', value: 'Data team' },
];

export default function DrawerWithoutOverlay() {
  const titleId = useId();

  return (
    <Drawer position='end-start'>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Inspect revenue widget</Button>
      </DrawerTrigger>
      <DrawerContent shadowed overlay={false} blurred={false} aria-labelledby={titleId} style={{ width: 320 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Revenue widget</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-8) 0 0' }}>
          {metrics.map((metric) => (
            <div key={metric.label} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{metric.label}</Text></dt>
              <dd style={{ margin: 0 }}><Text size={3}>{metric.value}</Text></dd>
            </div>
          ))}
        </dl>
      </DrawerContent>
    </Drawer>
  );
}
