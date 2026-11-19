import { useId, type CSSProperties, type ReactNode } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  Text,
  type DrawerProps,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

interface MyDrawerProps extends DrawerProps {
  trigger: ReactNode
  title: ReactNode
  closeLabel: string
}

export function MyDrawer({ trigger, title, closeLabel, children, ...props }: MyDrawerProps) {
  const titleId = useId();

  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>{title}</Heading>
          <DrawerClose asChild>
            <Button
              square
              aria-label={closeLabel}
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DrawerClose>
        </div>
        {children}
      </DrawerContent>
    </Drawer>
  );
}

const details = [
  { term: 'Customer', value: 'Kestrel Robotics' },
  { term: 'Placed', value: 'Nov 2, 2026, 14:08' },
  { term: 'Total', value: '$1,284.00' },
];

export default function Recipe() {
  return (
    <MyDrawer
      trigger={<Button variant='secondary' appearance='ghost'>Order #10482</Button>}
      title='Order #10482'
      closeLabel='Close'
    >
      <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-12) 0 0' }}>
        {details.map((detail) => (
          <div key={detail.term} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{detail.term}</Text></dt>
            <dd style={{ margin: 0 }}><Text size={3}>{detail.value}</Text></dd>
          </div>
        ))}
      </dl>
    </MyDrawer>
  );
}
