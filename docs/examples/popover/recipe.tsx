import { useId, type CSSProperties, type ReactNode } from 'react';
import {
  Button,
  Heading,
  Icon,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Text,
  type PopoverProps,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

interface MyPopoverProps extends Omit<PopoverProps, 'role'> {
  trigger: ReactNode
  title: ReactNode
  closeLabel: string
}

export function MyPopover({ trigger, title, closeLabel, children, ...props }: MyPopoverProps) {
  const titleId = useId();

  return (
    <Popover role='dialog' {...props}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent aria-labelledby={titleId}>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h3' size={5} fontWeight={600}>{title}</Heading>
            <PopoverClose asChild>
              <Button
                square
                aria-label={closeLabel}
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </PopoverClose>
          </div>
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function Recipe() {
  return (
    <MyPopover
      trigger={<Button variant='secondary' appearance='ghost'>Storage · 82% used</Button>}
      title='16.4 GB of 20 GB used'
      closeLabel='Close'
    >
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Videos take 11.2 GB. Old exports are removed after 90 days.</Text>
      <Button size='xs' style={{ justifySelf: 'end' }}>Upgrade storage</Button>
    </MyPopover>
  );
}
