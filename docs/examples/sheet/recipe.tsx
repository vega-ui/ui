import { useId, type CSSProperties, type ReactNode } from 'react';
import {
  Button,
  Heading,
  Icon,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
  type SheetProps,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

interface MySheetProps extends SheetProps {
  trigger: ReactNode
  title: ReactNode
  closeLabel: string
  handleLabel: string
}

export function MySheet({ trigger, title, closeLabel, handleLabel, children, ...props }: MySheetProps) {
  const titleId = useId();

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent aria-labelledby={titleId}>
        <SheetHandle aria-label={handleLabel} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>{title}</Heading>
          <SheetClose asChild>
            <Button
              square
              aria-label={closeLabel}
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </SheetClose>
        </div>
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default function Recipe() {
  return (
    <MySheet
      trigger={<Button>Book a table</Button>}
      title='Table for two'
      closeLabel='Close'
      handleLabel='Resize sheet'
    >
      <Text size={3} style={{ color: 'var(--label-secondary)' }}>Blue Harbor Cafe · Tonight at 19:30</Text>
      <form method='dialog' style={{ display: 'grid', marginBlockStart: 'var(--spacing-6)' }}>
        <Button type='submit' value='book'>Confirm booking</Button>
      </form>
    </MySheet>
  );
}
