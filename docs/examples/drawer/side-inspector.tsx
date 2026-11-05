import { useId, type CSSProperties } from 'react';
import {
  Badge,
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

const details = [
  { term: 'Customer', value: 'Kestrel Robotics' },
  { term: 'Placed', value: 'Nov 2, 2026, 14:08' },
  { term: 'Items', value: '3 × Sensor kit, 1 × Charging dock' },
  { term: 'Total', value: '$1,284.00' },
  { term: 'Ship to', value: '41 Harbour Road, Bristol BS1 5TY' },
];

export default function SideInspector() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
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
        <div style={{ marginBlockStart: 'var(--spacing-4)' }}>
          <Badge variant='warning' size='sm'>Awaiting payment</Badge>
        </div>
        <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-12) 0 0' }}>
          {details.map((detail) => (
            <div key={detail.term} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{detail.term}</Text></dt>
              <dd style={{ margin: 0 }}><Text size={3}>{detail.value}</Text></dd>
            </div>
          ))}
        </dl>
      </DrawerContent>
    </Drawer>
  );
}
